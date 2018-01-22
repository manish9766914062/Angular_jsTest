using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Xml.Linq;

namespace StockInfo // << NOTE: this must match the full class name in the ashx file!
{
    /// <summary>
    /// StockInfo returns the following information:
    /// 
    /// Company Names:
    /// If the request contains a 'name' parameter, StockInfo returns the name 
    /// of the company for the symbol that was passed in.
    /// 
    /// Stock Prices:
    /// If the request contains a 'prices' parameter, StockInfo returns
    /// a tab/cr-delimited string with dates and stock prices in each line.
    /// 
    /// Company Search:
    /// If the request contains a 'search' parameter, StockInfo returns
    /// a tab/cr-delimited string with company symbols and names that match
    /// the given request parameter.
    /// </summary>
    public class StockInfo : IHttpHandler
    {
        static Dictionary<string, string> _names = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        static Dictionary<string, string> _prices = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        static Dictionary<string, string> _events = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        // constructor
        static StockInfo()
        {
            // load company names (once)
            if (_names.Count == 0)
            {
                var path = HttpContext.Current.Server.MapPath("resources/symbolNames.txt");
                using (var sr = new StreamReader(path))
                {
                    for (var line = sr.ReadLine(); line != null; line = sr.ReadLine())
                    {
                        var parts = line.Split('\t');
                        if (parts.Length >= 2)
                        {
                            var key = parts[0].Trim();
                            var value = parts[1].Trim();
                            if (key.Length > 0 && value.Length > 0)
                            {
                                _names[key] = value;
                            }
                        }
                    }
                }
            }
        }

        // process the requests
        public void ProcessRequest(HttpContext context)
        {
            var content = string.Empty;
            try
            {
                // get company name
                var symbol = context.Request["name"];
                if (!string.IsNullOrEmpty(symbol))
                {
                    content = GetCompanyName(symbol);
                }

                // get company prices
                symbol = context.Request["prices"];
                if (!string.IsNullOrEmpty(symbol))
                {
                    content = GetPrices(symbol);
                }

                // get company events
                var eventsSymbol = context.Request["events"];
                if (!string.IsNullOrEmpty(eventsSymbol))
                {
                    content = GetEvents(eventsSymbol);
                }

                // search for companies
                var query = context.Request["search"];
                if (!string.IsNullOrEmpty(query))
                {
                    int max = 10;
                    int.TryParse(context.Request["max"], out max);
                    content = SearchCompanies(query, max);
                }
            }
            catch(Exception e) { }

            // done, return the result
            context.Response.Write(content);
        }

        // this handler can be re-used
        public bool IsReusable
        {
            get { return true; }
        }

        // ** implementation

        // get the name of a company from a stock ticker symbol
        string GetCompanyName(string symbol)
        {
            // look up company name
            string name = string.Empty;
            _names.TryGetValue(symbol, out name);
            return name;
        }

        // get closing prices for a given stock between 1/1/2008 and today
        // (using Yahoo finance service)
        string GetPrices(string symbol)
        {
            // try getting from cache
            string content;
            if (_prices.TryGetValue(symbol, out content))
            {
                return content;
            }

            // not in cache, get now
            var fmt = "https://www.quandl.com/api/v3/datasets/WIKI/{0}.csv?auth_token={1}&start_date={2}&end_date={3}";
            // 0: stock symbol
            // auth_token 1: token
            // start_date 2: date yyyy-MM-dd
            // auth_token 3: date yyyy-MM-dd
            var t = DateTime.Today;
            var token = "HBswErZHGPYKPt-m5wrs";
            var url = string.Format(fmt, symbol, token, "2008-01-01", t.ToString("yyyy-MM-dd"));
            if (symbol == "^IXIC") {
                //NASDAQ COMP
                fmt = "https://www.quandl.com/api/v3/datasets/13110742/data.csv?auth_token={0}&start_date={1}&end_date={2}";
                url = string.Format(fmt, token, "2008-01-01", t.ToString("yyyy-MM-dd"));
            }

            // get content
            var sb = new StringBuilder();
            var wc = new WebClient();
     
            using (var sr = new StreamReader(wc.OpenRead(url)))
            {
                // skip headers
                sr.ReadLine();

                // skip first line (same date as the next!)
                sr.ReadLine();

                // read each line
                for (var line = sr.ReadLine(); line != null; line = sr.ReadLine())
                {
                    // append date (field 0) and adjusted close price (field 6)
                    var items = line.Split(',');

                    string format = @"{0}\t{1:#.##}\o{2:#.##}\h{3:#.##}\l{4:#.##}\c{5:#.##}\r";
                    if (symbol == "^IXIC")
                    {
                        //NASDAQ COMP
                        sb.AppendFormat(format,
                        items[0], ParseValue(items[5]), ParseValue(items[2]), ParseValue(items[3])
                        , ParseValue(items[1]), ParseValue(items[1]));
                    }
                    else
                    {
                        double value;
                        var parseResult = double.TryParse(items[6], out value);

                        // quick fix
                        // culture dependent decimal part separator
                        if (!parseResult)
                            value = double.Parse(items[6].Replace('.', ','));
                        sb.AppendFormat(format,
                        items[0], ParseValue(items[5]), ParseValue(items[1]), ParseValue(items[2])
                        , ParseValue(items[3]), ParseValue(items[4]));
                    }
                }
            }

            // save result in cache
            content = sb.ToString().Trim();
            _prices[symbol] = content;

            // done
            Debug.WriteLine("returning {0} bytes", content.Length);
            return content;
        }


        string GetEvents(string symbol)
        {
            // try getting from cache
            string content;
            if (_events.TryGetValue(symbol, out content))
            {
                return content;
            }

            // not in cache, get now
            var fmt = "http://articlefeeds.nasdaq.com/nasdaq/symbols?symbol={0}";
            var url = string.Format(fmt, symbol);

            // get content
            var sb = new StringBuilder();
            var wc = new WebClient();

            using (var sr = new StreamReader(wc.OpenRead(url)))
            {
                XDocument doc = XDocument.Parse(sr.ReadToEnd().Trim());
                sb.Append("[");
                foreach (XElement c in doc.Descendants("item"))
                {
                    string format = "{{\"title\":\"{0}\",\"date\":\"{1}\"}},";
                    sb.AppendFormat(format,
                        (string)c.Element("title"), (string)c.Element("pubDate")
                        );                    
                }
                sb.Remove(sb.Length -1, 1);
                sb.Append("]");

            }
           
            content = sb.ToString().Trim();
            _events[symbol] = content;
            // done
            Debug.WriteLine("returning {0} bytes", content.Length);
            return content;
        }

        private double ParseValue(string value)
        {
            double result;
            var parseResult = double.TryParse(value, out result);

            // quick fix
            // culture dependent decimal part separator
            if (!parseResult)
                result = double.Parse(value.Replace('.', ','));
            return result;
        }

        // search for companies based on a query string composed of space-separated terms
        string SearchCompanies(string query, int max)
        {
            var sb = new StringBuilder();
            var matches = 0;
            var terms = query.Split(' ');
            foreach (var kv in _names)
            {
                var match = true;
                for (var i = 0; i < terms.Length && match; i++)
                {
                    if (kv.Key.IndexOf(terms[i], StringComparison.OrdinalIgnoreCase) < 0 &&
                        kv.Value.IndexOf(terms[i], StringComparison.OrdinalIgnoreCase) < 0)
                    {
                        match = false;
                    }
                }
                if (match)
                {
                    sb.AppendFormat("{0}\t{1}\r", kv.Key, kv.Value);
                    matches++;
                    if (matches >= max)
                    {
                        break;
                    }
                }
            }

            // done
            //Debug.WriteLine("queried for \"" + query + "\", got " + matches.ToString() + " matches.");
            return sb.ToString().TrimEnd('\r');
        }
    }
}