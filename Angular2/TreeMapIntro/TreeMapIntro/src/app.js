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
var wjcChartHierarchical = require("wijmo/wijmo.chart.hierarchical");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_chart_hierarchical_1 = require("wijmo/wijmo.angular2.chart.hierarchical");
var AppTab_1 = require("./components/AppTab");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        // A local reference to the TreeMapType Enum, that allows to use the enum members in the 
        // template markup.
        this.TreeMapType = wjcChartHierarchical.TreeMapType;
        this.treeMapType = wjcChartHierarchical.TreeMapType.Squarified;
        this.maxDepth = 2;
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getData();
        this.groupData = this.dataSvc.getGroupCVData();
        this.maxDepthData = this.dataSvc.getMaxDepthData();
        this.bindingName = ['category', 'subCategory'];
        this.palette1 = [{
                titleColor: '#00277d',
                maxColor: 'rgba(0,39,125,0.7)',
                minColor: 'rgba(168,187,230,0.7)'
            }, {
                titleColor: '#7d1f00',
                maxColor: 'rgba(125,21,0,0.7)',
                minColor: 'rgba(230,183,168,0.7)'
            }, {
                titleColor: '#007d27',
                maxColor: 'rgba(0,125,39,0.7)',
                minColor: 'rgba(168,230,188,0.7)'
            }, {
                titleColor: '#7d003c',
                maxColor: 'rgba(125,0,60,0.7)',
                minColor: 'rgba(230,168,198,0.7)'
            }, {
                titleColor: '#7d4300',
                maxColor: 'rgba(125,67,0,0.7)',
                minColor: 'rgba(230,201,168,0.7)'
            }, {
                titleColor: '#51007d',
                maxColor: 'rgba(81,0,125,0.7)',
                minColor: 'rgba(209,170,230,0.7)'
            }, {
                titleColor: '#7d7400',
                maxColor: 'rgba(125,116,0,0.7)',
                minColor: 'rgba(230,226,168,0.7)'
            }, {
                titleColor: '#970000',
                maxColor: 'rgba(151,0,0,0.7)',
                minColor: 'rgba(230,169,169,0.7)'
            }];
        this.palette2 = ['#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_hierarchical_1.WjChartHierarchicalModule, platform_browser_1.BrowserModule, forms_1.FormsModule, AppTab_1.TabsModule],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map