"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var core_1 = require("@angular/core");
var portfolio_1 = require("./portfolio");
'use strict';
// The application root component.
var AppBaseCmp = /** @class */ (function () {
    function AppBaseCmp() {
        this.cache = {};
        // create portfolio
        this.portfolio = new portfolio_1.Portfolio();
        this.portfolio.view.currentChanged.addHandler(this._currentChanged, this);
        this.searchCompany = this._searchCompany.bind(this);
    }
    AppBaseCmp.prototype.getAmountColor = function (amount) {
        return amount < -0.01 ? '#9F3912' : amount > 0.01 ? '#217648' : '#b0b0b0';
    };
    // update chart selection to match portfolio selection
    AppBaseCmp.prototype._currentChanged = function () {
        var p = this.portfolio, chart = this.chart;
        if (chart && p) {
            var symbol = p.view.currentItem ? p.view.currentItem.symbol : null, selSeries = null;
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].name == symbol) {
                    selSeries = chart.series[i];
                    break;
                }
            }
            chart.selection = selSeries;
        }
    };
    // selection changed event handler for FlexChart
    AppBaseCmp.prototype.selectionChanged = function (sender, args) {
        var chart = sender, symbol = chart.selection ? chart.selection.name : null, selSeries = null, p = this.portfolio;
        for (var i = 0; i < p.view.items.length; i++) {
            if (p.view.items[i].symbol == symbol) {
                p.view.moveCurrentToPosition(i);
                break;
            }
        }
    };
    ;
    AppBaseCmp.prototype._searchCompany = function (query, max, callback) {
        var _this = this;
        // try getting the result from the cache
        var result = this.cache[query], protocol = "https";
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
        $.get(protocol + '://www.quandl.com/api/v2/datasets.json', {
            auth_token: "rX6NsszGKZp32RUbA7SR",
            query: query.trim(),
            page: 1,
            per_page: 20,
            source_code: 'WIKI'
        }).done(function (result) {
            // parse result
            var lines = result.docs, matches = [];
            //console.log('got result with ' + lines.length + ' matches.');
            for (var i = 0; i < lines.length; i++) {
                var item = lines[i];
                var symbol = item.code, name = item.name.substring(0, item.name.indexOf('(')), symbolName = '<b>' + symbol + '</b>: ' + name;
                matches.push({ symbol: symbol, name: name, symbolName: symbolName });
            }
            // store result in cache
            _this.cache[query] = matches;
            // and return the result
            callback(matches);
        }).fail(function (error) {
            console.log('error: ' + error.responseText);
            _this.cache[query] = null; // << no point in trying this query again
            callback(null);
        });
    };
    __decorate([
        core_1.ViewChild('chart')
    ], AppBaseCmp.prototype, "chart", void 0);
    AppBaseCmp = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: ''
        })
    ], AppBaseCmp);
    return AppBaseCmp;
}());
exports.AppBaseCmp = AppBaseCmp;
//# sourceMappingURL=appBase.js.map