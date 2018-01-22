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
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        var _this = this;
        // nation data
        this.yrMin = 1800;
        this.yrMax = 2009;
        this.animLength = 15000; // 15s for the full animation
        this.animating = 0;
        this._year = this.yrMin;
        this.data = new wjcCore.CollectionView(null, {
            sortDescriptions: [
                new wjcCore.SortDescription('yearPopulation', false) // small countries above big ones
            ],
            filter: function (item) {
                return item.population.length > 1 &&
                    item.income.length > 1 &&
                    item.lifeExpectancy.length > 1;
            }
        });
        // https://bost.ocks.org/mike/nations/nations.json
        wjcCore.httpRequest('nations.json', {
            success: function (xhr) {
                _this.data.sourceCollection = JSON.parse(xhr.response);
                _this.data.currentItem = null; // start with no selection
                _this.toggleAnimation(); // start animation when data is loaded
            }
        });
    }
    Object.defineProperty(AppCmp.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            this._year = value;
            this._updateData();
        },
        enumerable: true,
        configurable: true
    });
    AppCmp.prototype.ngAfterViewInit = function () {
        if (this.lineGauge) {
            this.lineGauge.face.thickness = 0.08;
        }
    };
    AppCmp.prototype.toggleAnimation = function () {
        var _this = this;
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        }
        else {
            var min = (this.year < this.yrMax - 10) ? this.year : this.yrMin, max = this.yrMax, duration = this.animLength * (max - min) / (this.yrMax - this.yrMin);
            this.animating = wjcCore.animate(function (pct) {
                _this.year = Math.round(min + (max - min) * pct);
                //this.$apply();
                if (pct == 1) {
                    _this.animating = null;
                    //this.$apply();
                }
            }, duration);
        }
    };
    AppCmp.prototype.stopAnimation = function () {
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        }
    };
    AppCmp.prototype.chartItemFormatter = function (engine, hitTestInfo, defaultFormat) {
        if (hitTestInfo.chartElement == wjcChart.ChartElement.SeriesSymbol) {
            var fill = 'black', stroke = 'black';
            switch (hitTestInfo.item.region) {
                case 'Sub-Saharan Africa':
                    fill = '#1F77B4';
                    break;
                case 'South Asia':
                    fill = '#FF7F0E';
                    break;
                case 'Middle East & North Africa':
                    fill = '#2CA02C';
                    break;
                case 'America':
                    fill = '#D62728';
                    break;
                case 'Europe & Central Asia':
                    fill = '#9467BD';
                    break;
                case 'East Asia & Pacific':
                    fill = '#8C564B';
                    break;
            }
            engine.fill = fill;
            engine.stroke = stroke;
            engine.strokeWidth = 1;
            defaultFormat();
        }
    };
    AppCmp.prototype._updateData = function () {
        var year = this.year;
        var items = this.data.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.yearIncome = this._interpolate(item.income, year);
            item.yearLifeExpectancy = this._interpolate(item.lifeExpectancy, year);
            var pop = this._interpolate(item.population, year);
            if (pop > 1000000)
                pop = Math.round(pop / 1000000) * 1000000;
            item.yearPopulation = pop;
        }
        this.data.refresh();
    };
    AppCmp.prototype._interpolate = function (arr, year) {
        // binary search
        var min = 0, max = arr.length - 1, cur, item;
        while (min <= max) {
            cur = (min + max) >>> 1,
                item = arr[cur];
            if (item[0] > year) {
                max = cur - 1;
            }
            else if (item[0] < year) {
                min = cur + 1;
            }
            else {
                return item[1]; // found year, no need to interpolate
            }
        }
        // before the first/after the last
        if (min == 0)
            return arr[min][1];
        if (min == arr.length)
            return arr[max][1];
        // in range: interpolate
        var pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
        return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
    };
    __decorate([
        core_1.ViewChild('lineGauge')
    ], AppCmp.prototype, "lineGauge", void 0);
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
            imports: [wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_gauge_1.WjGaugeModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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