export class Product {

    id = null;
    name = null;
    rank = null;
    salesDct = null;
    salesValues = null;
    sales = null;
    levels = null;
    chartData = null;
    salesTrend = null;

    constructor(data: any) {
        // store raw data
        this.id = data.id;
        this.name = data.name;
        this.rank = data.rank;
        this.salesDct = data.sales;
        this.salesValues = [];

        // compute aggregates
        var sum = 0,
            sum2 = 0,
            count = 0,
            min = null,
            max = null;
        for (var quarter in this.salesDct) {
            var sales = this.salesDct[quarter];
            sum += sales;
            sum2 += sales * sales;
            count++;
            min = min ? Math.min(min, sales) : sales;
            max = max ? Math.max(max, sales) : sales;
            this.salesValues.push(sales);
        }
        var avg = count > 0 ? sum / count : 0;
        this.sales = {

            // summary stats
            total: Math.round(sum),
            avg: Math.round(avg),
            stdev: Math.round(count > 0 ? Math.sqrt(sum2 / count - avg * avg) : 0),
            min: Math.round(min),
            max: Math.round(max),

            // this/prev quarter
            qThis: Math.round(this.getSales(Product.getQuarter(true))),
            qPrev: Math.round(this.getSales(Product.getQuarter(false)))
        };

        // target levels
        this.levels = {
            target: avg * 1.05,
            good: avg * 1.2,
            satisfactory: avg * .85,
            poor: avg - this.sales.stdev,
            critical: avg - this.sales.stdev * 0.2
        };

        // store data for charting (sales per quarter, trend)
        this.chartData = [];
        this.salesTrend = this._linReg(this.salesValues);
        var i = 0;
        for (var quarter in this.salesDct) {
            sales = this.salesDct[quarter];
            if (sales) {
                var reg = this.salesTrend.a + this.salesTrend.b * i++;
                this.chartData.push({ quarter: quarter, sales: sales, reg: reg });
            }
        };
    }
    // gets the sales for a quarter, or zero if none
    getSales(quarter:string):number {
        var value = this.salesDct[quarter];
        return value ? value : 0;
    }

    // get the current or previous quarter IDs in the format yyyy-Qq
    static getQuarter(current:boolean):string {
        var today = new Date();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var qtr = Math.floor(((mm - 1) / 3) + 1);
        if (current) {
            return yyyy.toString() + '-Q' + qtr.toString();
        } else {
            return qtr == 1
                ? (yyyy - 1).toString() + '-Q4'
                : yyyy.toString() + '-Q' + (qtr - 1).toString();
        }
    }

    // calculate linear regression for a series of Y values
    private _linReg(values:any):any {
        var n = 0, sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
        for (var i = 0; i < values.length; i++) {
            var x = i;
            var y = values[i];
            n++;
            sx += x;
            sy += y;
            sxx += x * x;
            syy += y * y;
            sxy += x * y;
        }
        var b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
        var a = sy / n - sx / n * b;
        var r2 = (n * sxy - sx * sy) * (n * sxy - sx * sy) / ((n * sxx - sx * sx) * (n * syy - sy * sy));

        // return regression result
        return { a: a, b: b, r2: r2 };
    }
}



