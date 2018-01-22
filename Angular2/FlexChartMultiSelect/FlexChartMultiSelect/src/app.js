"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var ChartMultiSelectSvc_1 = require("./services/ChartMultiSelectSvc");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(cmsv) {
        this.items = [];
        this.chartType = 'Column';
        this.data = this._createData(100, 900);
        this.cmsv = cmsv;
    }
    AppCmp.prototype.chartRendered = function () {
        var chart = this.flexChart; // internal
        if (!chart) {
            return;
        }
        this.cmsv.initChartMultiSelect(chart, this.items);
    };
    // select all values/elements under 500
    AppCmp.prototype.selectValuesUnder500 = function () {
        this.cmsv.selectValuesUnder500();
    };
    // clear selection for button click
    AppCmp.prototype.clear = function () {
        this.cmsv.clearSelection();
        // update length for view
        this.items.length = 0;
    };
    AppCmp.prototype._createData = function (rows, cols) {
        var countries = ['Brazil', 'Canada', 'France', 'Germany', 'USA'], item = null, data = [];
        for (var i = 0; i < countries.length; i++) {
            item = {
                country: countries[i],
                sales: Math.random() * 1000,
                downloads: Math.random() * 1000
            };
            data.push(item);
        }
        return data;
    };
    __decorate([
        core_1.ViewChild('flexChart')
    ], AppCmp.prototype, "flexChart", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(ChartMultiSelectSvc_1.ChartMultiSelectSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [ChartMultiSelectSvc_1.ChartMultiSelectSvc],
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