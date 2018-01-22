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
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var DataSvc_1 = require("./services/DataSvc");
var ColumnGroupProvider_1 = require("./ColumnGroupProvider");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        this.w3Data = dataSvc.w3Data;
        this.fundData = dataSvc.fundData;
        this.w3Columns = dataSvc.w3Columns;
        this.fundColumns = dataSvc.fundColumns;
    }
    AppCmp.prototype.initW3C = function (s) {
        // create FlexGridFilter *before* the ColumnGroupProvider
        // so the filter icons will center-align properly in merged header cells:
        //var f = new wijmo.grid.filter.FlexGridFilter(s);
        var g = new ColumnGroupProvider_1.ColumnGroupProvider(s, this.w3Columns);
        // select column groups on clicks (as opposed to sorting)
        g.selectOnClick = true;
        // set data source *after* creating the ColumnGroupProvider
        // to avoid automatic column generation:
        s.itemsSource = this.w3Data;
    };
    AppCmp.prototype.initFinancial = function (s) {
        //var f = new wijmo.grid.filter.FlexGridFilter(s);
        var g = new ColumnGroupProvider_1.ColumnGroupProvider(s, this.fundColumns);
        g.selectOnClick = true;
        s.itemsSource = this.fundData;
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc],
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