'use strict';
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
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require("@angular/http");
var wijmo_angular2_core_1 = require("wijmo/wijmo.angular2.core");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var bullets_component_1 = require("./components/bullets.component");
var chart_component_1 = require("./components/chart.component");
var product_component_1 = require("./components/product.component");
var sparkLines_component_1 = require("./components/sparkLines.component");
var Product_1 = require("./services/Product");
var DataSvc_1 = require("./services/DataSvc");
//// AppCmp  component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        var _this = this;
        this.qStart = new Date().getFullYear() + '-Q1';
        this.loading = true;
        this.error = null;
        this.dataSvc = dataSvc;
        this.qThis = dataSvc.qThis;
        wjcCore.httpRequest('GetData.ashx', {
            success: function (xhr) {
                _this.loading = false;
                var data = JSON.parse(xhr.response);
                _this.qStart = data.startYear + '-Q1';
                // get products, chart data
                for (var i = 0; i < data.products.length; i++) {
                    var p = new Product_1.Product(data.products[i]);
                    _this.dataSvc.products.push(p);
                }
                // update chart data (sales per product in this quarter)
                _this.dataSvc.chartData = [];
                for (var i = 1; i < _this.dataSvc.products.length; i++) {
                    var p2 = _this.dataSvc.products[i];
                    _this.dataSvc.chartData.push({ product: p2.name, sales: p2.sales.qThis });
                }
                if (_this.dataSvc.loadingSucceed) {
                    _this.dataSvc.loadingSucceed();
                }
            },
            error: function (xhr) {
                _this.error = 'Error downloading data from the server';
            }
        });
        dataSvc.loadingSucceed = function () {
            _this.qStart = dataSvc.qStart;
            _this.loading = false;
        };
    }
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
exports.routes = [
    { path: '', redirectTo: 'bullets', pathMatch: 'full' },
    { path: 'bullets', component: bullets_component_1.BulletsCmp },
    { path: 'chart', component: chart_component_1.ChartCmp },
    { path: 'product/:id', component: product_component_1.ProductCmp }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, wijmo_angular2_core_1.WjCoreModule, wijmo_angular2_gauge_1.WjGaugeModule, wijmo_angular2_chart_1.WjChartModule, exports.routing, http_1.HttpModule],
            declarations: [AppCmp, sparkLines_component_1.SparkLinesCmp, bullets_component_1.BulletsCmp, chart_component_1.ChartCmp, product_component_1.ProductCmp],
            providers: [DataSvc_1.DataSvc],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map