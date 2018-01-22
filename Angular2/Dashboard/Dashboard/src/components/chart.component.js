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
var core_1 = require("@angular/core");
var DataSvc_1 = require("../services/DataSvc");
var ChartCmp = /** @class */ (function () {
    function ChartCmp(dataSvc) {
        var _this = this;
        this.chartData = [];
        this.chartType = 'Column';
        this.qThis = dataSvc.qThis;
        this.chartData = dataSvc.chartData;
        if (this.chartData.length === 0) {
            dataSvc.loadingSucceed = function () {
                _this.chartData = dataSvc.chartData;
            };
        }
    }
    // set current chart type
    ChartCmp.prototype.setChartType = function (chartType) {
        this.chartType = chartType;
    };
    ChartCmp = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: './src/components/chart.component.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ChartCmp);
    return ChartCmp;
}());
exports.ChartCmp = ChartCmp;
//# sourceMappingURL=chart.component.js.map