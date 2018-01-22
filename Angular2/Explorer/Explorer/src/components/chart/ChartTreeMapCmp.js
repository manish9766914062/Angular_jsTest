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
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_hierarchical_1 = require("wijmo/wijmo.angular2.chart.hierarchical");
var DataSvc_1 = require("../../services/DataSvc");
// Chart TreeMap component
var ChartTreeMapCmp = /** @class */ (function () {
    function ChartTreeMapCmp(dataSvc) {
        this.maxDepth = 2;
        this.palettes = [null, [{
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
                    titleColor: '#51007d',
                    maxColor: 'rgba(81,0,125,0.7)',
                    minColor: 'rgba(209,170,230,0.7)'
                }, {
                    titleColor: '#7d7400',
                    maxColor: 'rgba(125,116,0,0.7)',
                    minColor: 'rgba(230,226,168,0.7)'
                }], ['#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7']];
        this.chartPalette = null;
        this.palette = 'Default';
        this.TreeMapType = wjcChartHierarchical.TreeMapType;
        this.type = wjcChartHierarchical.TreeMapType.Squarified;
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getTreeMapData();
    }
    ChartTreeMapCmp.prototype.paletteChanged = function (sender) {
        this.chartPalette = this.palettes[sender.selectedIndex];
    };
    ;
    ChartTreeMapCmp = __decorate([
        core_1.Component({
            selector: 'chart-tree-map-cmp',
            templateUrl: 'src/components/chart/chartTreeMapCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ChartTreeMapCmp);
    return ChartTreeMapCmp;
}());
exports.ChartTreeMapCmp = ChartTreeMapCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ChartTreeMapCmp }
]);
var ChartTreeMapModule = /** @class */ (function () {
    function ChartTreeMapModule() {
    }
    ChartTreeMapModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_hierarchical_1.WjChartHierarchicalModule],
            declarations: [ChartTreeMapCmp],
        })
    ], ChartTreeMapModule);
    return ChartTreeMapModule;
}());
exports.ChartTreeMapModule = ChartTreeMapModule;
//# sourceMappingURL=ChartTreeMapCmp.js.map