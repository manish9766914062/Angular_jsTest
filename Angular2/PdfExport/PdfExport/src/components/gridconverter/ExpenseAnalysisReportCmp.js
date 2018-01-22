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
var wjcGridPdf = require("wijmo/wijmo.grid.pdf");
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcChart = require("wijmo/wijmo.chart");
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var ExpenseAnalysisReportCmp = /** @class */ (function () {
    function ExpenseAnalysisReportCmp(dataSvc) {
        this.employee = dataSvc.getEmployees()[0];
        this.totals = dataSvc.calculateTotals(this.employee.Expenses);
    }
    ExpenseAnalysisReportCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            header: {
                declarative: {
                    text: 'Expense Analysis Report',
                    font: new wjcPdf.PdfFont('times', 12),
                    brush: '#bfc1c2'
                }
            },
            lineGap: 2,
            pageSettings: {
                margins: {
                    left: 36,
                    right: 36,
                    top: 36,
                    bottom: 36
                }
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'FlexGrid.pdf');
            }
        });
        this._drawEmployee(doc, this.employee, function () { return doc.end(); });
    };
    ExpenseAnalysisReportCmp.prototype._drawEmployee = function (doc, employee, done) {
        var expenses = employee.Expenses.sort(function (a, b) { return a.Date.getTime() - b.Date.getTime(); }), minDate = expenses[0].Date, maxDate = expenses[expenses.length - 1].Date, bold = new wjcPdf.PdfFont('times', 10, 'normal', 'bold');
        doc.moveDown(2);
        doc.drawText('Name: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(employee.Name);
        doc.drawText('From: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(minDate, wjcCore.DataType.String, 'd'));
        doc.drawText('To: ', undefined, undefined, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(maxDate, wjcCore.DataType.String, 'd'));
        doc.moveDown(2);
        var y = doc.y;
        doc.drawText('Expense details:', 0, y);
        doc.drawText('Total expenses by category:', doc.width * 0.5 + 20, y);
        y = doc.y;
        wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, doc.width * 0.5, null, {
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    font: { weight: 'bold' },
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
        this.flexPie.saveImageToDataUrl(wjcChart.ImageFormat.Png, function (url) {
            doc.drawImage(url, doc.width * 0.5 + 20, y, { width: doc.width * 0.5 - 20 });
            done();
        });
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], ExpenseAnalysisReportCmp.prototype, "flexGrid", void 0);
    __decorate([
        core_1.ViewChild('flexPie')
    ], ExpenseAnalysisReportCmp.prototype, "flexPie", void 0);
    ExpenseAnalysisReportCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-expense-analysis-report-cmp',
            templateUrl: 'src/components/gridconverter/expenseAnalysisReportCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ExpenseAnalysisReportCmp);
    return ExpenseAnalysisReportCmp;
}());
exports.ExpenseAnalysisReportCmp = ExpenseAnalysisReportCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ExpenseAnalysisReportCmp }
]);
var ExpenseAnalysisReportModule = /** @class */ (function () {
    function ExpenseAnalysisReportModule() {
    }
    ExpenseAnalysisReportModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_chart_1.WjChartModule],
            declarations: [ExpenseAnalysisReportCmp]
        })
    ], ExpenseAnalysisReportModule);
    return ExpenseAnalysisReportModule;
}());
exports.ExpenseAnalysisReportModule = ExpenseAnalysisReportModule;
//# sourceMappingURL=ExpenseAnalysisReportCmp.js.map