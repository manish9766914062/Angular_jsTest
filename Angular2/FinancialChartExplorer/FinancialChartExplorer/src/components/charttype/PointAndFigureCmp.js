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
var wjcCore = require("wijmo/wijmo");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_finance_1 = require("wijmo/wijmo.angular2.chart.finance");
var wijmo_angular2_chart_interaction_1 = require("wijmo/wijmo.angular2.chart.interaction");
var DataSvc_1 = require("./../../services/DataSvc");
var TooltipSvc_1 = require("./../../services/TooltipSvc");
//Point&Figure sample component
var PointAndFigureCmp = /** @class */ (function () {
    function PointAndFigureCmp(dataSvc, tooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.title = 'Point & Figure';
        this.options = {
            pointAndFigure: {
                boxSize: 1,
                reversal: 3,
                scaling: 'Traditional',
                fields: 'Close',
                period: 20
            }
        };
        this.style = {
            stroke: 'black'
        };
        this.altStyle = {
            stroke: 'red'
        };
    }
    PointAndFigureCmp.prototype.selectedSymbolChanged = function () {
        this.setDataSource();
    };
    PointAndFigureCmp.prototype.chartRendered = function () {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = '{x:d}<br/>{y}';
        }
    };
    PointAndFigureCmp.prototype.optionChanged = function () {
        if (this.chart) {
            this.chart.invalidate();
        }
    };
    PointAndFigureCmp.prototype.inputNumberChanged = function (input) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        if (this.chart) {
            this.chart.invalidate();
        }
    };
    PointAndFigureCmp.prototype.scalingChanged = function (menu) {
        this.boxSize.isDisabled = menu.selectedValue != 'Fixed';
        this.period.isDisabled = menu.selectedValue != 'Dynamic';
        this.optionChanged();
    };
    PointAndFigureCmp.prototype.setDataSource = function () {
        var _this = this;
        var symbol = this.selectedSymbol;
        this.dataSvc.getData(symbol).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (!wjcCore.isDate(data[i].date)) {
                    data[i].date = wjcCore.Globalize.parseDate(data[i].date, 'MM/dd/yy');
                }
            }
            _this.data = data;
        });
    };
    __decorate([
        core_1.ViewChild('chart')
    ], PointAndFigureCmp.prototype, "chart", void 0);
    __decorate([
        core_1.ViewChild('boxSize')
    ], PointAndFigureCmp.prototype, "boxSize", void 0);
    __decorate([
        core_1.ViewChild('reversal')
    ], PointAndFigureCmp.prototype, "reversal", void 0);
    __decorate([
        core_1.ViewChild('period')
    ], PointAndFigureCmp.prototype, "period", void 0);
    PointAndFigureCmp = __decorate([
        core_1.Component({
            selector: 'pointAndFigure-cmp',
            templateUrl: 'src/components/charttype/PointAndFigureCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(TooltipSvc_1.TooltipSvc))
    ], PointAndFigureCmp);
    return PointAndFigureCmp;
}());
exports.PointAndFigureCmp = PointAndFigureCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: PointAndFigureCmp }
]);
var PointAndFigureModule = /** @class */ (function () {
    function PointAndFigureModule() {
    }
    PointAndFigureModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_finance_1.WjChartFinanceModule, wijmo_angular2_chart_interaction_1.WjChartInteractionModule],
            declarations: [PointAndFigureCmp],
        })
    ], PointAndFigureModule);
    return PointAndFigureModule;
}());
exports.PointAndFigureModule = PointAndFigureModule;
//# sourceMappingURL=PointAndFigureCmp.js.map