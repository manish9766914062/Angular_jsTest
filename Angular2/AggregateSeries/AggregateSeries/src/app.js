"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcChart = require("wijmo/wijmo.chart");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_core_1 = require("wijmo/wijmo.angular2.core");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_chart_interaction_1 = require("wijmo/wijmo.angular2.chart.interaction");
var AggregateSeries_1 = require("./AggregateSeries");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        var _this = this;
        this.chartType = 'LineSymbols';
        this.aggType = 'Avg';
        this.interval = 'WW';
        this.autoInterval = true;
        this._bindings = {
            Column: 'close',
            LineSymbols: 'close',
            Candlestick: 'high,low,open,close'
        };
        wjcCore.httpRequest('data/msft.json', {
            success: function (xhr) {
                var data = JSON.parse(xhr.response, function (key, value) {
                    if (key === 'date') {
                        value = new Date(value);
                    }
                    return value;
                });
                _this.data = data;
            }
        });
        this.customTooltip = this._customTooltip.bind(this);
    }
    AppCmp.prototype.ngAfterViewInit = function () {
        this.aggSeries = new AggregateSeries_1.AggregateSeries();
        var series = this.aggSeries;
        this.chart.beginUpdate();
        series.itemsSource = this.data;
        series.chartType = wjcChart.ChartType[this.chartType];
        series.binding = this._bindings[this.chartType];
        series.bindingX = 'date';
        series.groupAggregate = wjcCore.Aggregate[this.aggType];
        series.autoGroupIntervals = ["DD", "WW", "MM", "YYYY"];
        series.autoInterval = true;
        this.chart.series.push(series);
        this.chart.endUpdate();
    };
    // set aggregate type
    AppCmp.prototype.aggTypeChanged = function () {
        this.aggSeries.groupAggregate = wjcCore.Aggregate[this.aggType];
    };
    // set chart type
    AppCmp.prototype.chartTypeChanged = function () {
        this.chart.beginUpdate();
        this.chart.chartType = wjcChart.ChartType[this.chartType];
        this.chart.binding = this._bindings[this.chartType];
        this.aggSeries.chartType = wjcChart.ChartType[this.chartType];
        this.aggSeries.binding = this._bindings[this.chartType];
        this.chart.endUpdate();
    };
    // set interval   
    AppCmp.prototype.intervalChanged = function () {
        this.aggSeries.groupInterval = this.interval;
    };
    // set AutoInterval  
    AppCmp.prototype.setAutoInterval = function () {
        this.aggSeries.autoInterval = this.autoInterval;
    };
    AppCmp.prototype.rangeChanged = function (sender) {
        this.chart.beginUpdate();
        this.chart.axisX.min = sender.min;
        this.chart.axisX.max = sender.max;
        this.chart.endUpdate();
    };
    AppCmp.prototype._customTooltip = function (ht) {
        if (!ht) {
            return '';
        }
        else if (this.chartType === 'Candlestick' && ht.item && ht.x) {
            return '<b>Date:</b> ' + wjcCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                '<b>High:</b> ' + ht.item.high.toFixed(2) + '<br>' +
                '<b>Low:</b> ' + ht.item.low.toFixed(2) + '<br>' +
                '<b>Open:</b> ' + ht.item.open.toFixed(2) + '<br>' +
                '<b>Close:</b> ' + ht.item.close.toFixed(2);
        }
        else if (ht.x && ht.y) {
            return '<b>Date:</b> ' + wjcCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                '<b>Value:</b> ' + ht.y.toFixed(2);
        }
    };
    __decorate([
        core_1.ViewChild('chart')
    ], AppCmp.prototype, "chart", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        })
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_core_1.WjCoreModule, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_interaction_1.WjChartInteractionModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map