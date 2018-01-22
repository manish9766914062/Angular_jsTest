
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';
declare var $;

// Angular
import { Component, ViewChild } from '@angular/core';
import { Portfolio } from './portfolio';

'use strict';

// The application root component.
@Component({
    selector: '',
    templateUrl: ''
})
export abstract class AppBaseCmp {

    portfolio: Portfolio;
    @ViewChild('chart') chart: wjcChart.FlexChart;
    cache = {};
    searchCompany: Function;
    constructor() {
        // create portfolio
        this.portfolio = new Portfolio();
        this.portfolio.view.currentChanged.addHandler(this._currentChanged, this);
        this.searchCompany = this._searchCompany.bind(this);
    }

    getAmountColor(amount: number): string {
        return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
    }

    // update chart selection to match portfolio selection
    private _currentChanged() {
        var p = this.portfolio,
            chart = this.chart;
        if (chart && p) {
            var symbol = p.view.currentItem ? p.view.currentItem.symbol : null,
                selSeries = null;
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
    }

    // selection changed event handler for FlexChart
    selectionChanged(sender, args) {
        var chart = sender,
            symbol = chart.selection ? chart.selection.name : null,
            selSeries = null,
            p = this.portfolio;
        for (var i = 0; i < p.view.items.length; i++) {
            if (p.view.items[i].symbol == symbol) {
                p.view.moveCurrentToPosition(i);
                break;
            }
        }
    };

   private _searchCompany(query, max, callback) {

        // try getting the result from the cache
        var result = this.cache[query],
            protocol = "https";
        if (result) {
            callback(result);
            return;
        }

        // IE9 fix
        if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
            $.support.cors = true;
            protocol = "http";
        }

        // not in cache, search Quandl's "Wiki EOD Stock Prices"
        $.get(protocol + '://www.quandl.com/api/v2/datasets.json',
            {
                auth_token: "rX6NsszGKZp32RUbA7SR",
                query: query.trim(),
                page: 1,
                per_page: 20,
                source_code: 'WIKI'
            }).done((result)=>{
                // parse result
                var lines = result.docs,
                    matches = [];
                //console.log('got result with ' + lines.length + ' matches.');
                for (var i = 0; i < lines.length; i++) {
                    var item = lines[i];
                    var symbol = item.code,
                        name = item.name.substring(0, item.name.indexOf('(')),
                        symbolName = '<b>' + symbol + '</b>: ' + name;
                    matches.push({ symbol: symbol, name: name, symbolName: symbolName });
                }

                // store result in cache
                this.cache[query] = matches;

                // and return the result
                callback(matches);
            }).fail((error)=> {
                console.log('error: ' + error.responseText);
                this.cache[query] = null; // << no point in trying this query again
                callback(null);
            });
    }
}


