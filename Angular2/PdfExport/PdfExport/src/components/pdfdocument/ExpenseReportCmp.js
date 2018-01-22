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
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var ExpenseReportCmp = /** @class */ (function () {
    function ExpenseReportCmp(dataSvc) {
        this._colWidth = 80;
        this._rowHeight = 18;
        this._dataSvc = dataSvc;
    }
    ExpenseReportCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            header: {
                declarative: {
                    text: 'Expense Report\t&[Page]\\&[Pages]',
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
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        var employees = this._dataSvc.getEmployees();
        for (var i = 0; i < employees.length; i++) {
            this._drawEmployee(doc, employees[i]);
            if (i < employees.length - 1) {
                doc.addPage();
            }
        }
        doc.end();
    };
    ExpenseReportCmp.prototype._drawEmployee = function (doc, employee) {
        var _this = this;
        var expenses = employee.Expenses.sort(function (a, b) { return a.Date.getTime() - b.Date.getTime(); }), minDate = expenses[0].Date, maxDate = expenses[expenses.length - 1].Date, columns = [
            { header: 'Date', binding: 'Date', format: 'd' },
            { header: 'Description', binding: 'Description', format: 'c' },
            { header: 'Hotel', binding: 'Hotel', format: 'c' },
            { header: 'Transport', binding: 'Transport', format: 'c' },
            { header: 'Meal', binding: 'Meal', format: 'c' },
            { header: 'Fuel', binding: 'Fuel', format: 'c' },
            { header: 'Misc', binding: 'Misc', format: 'c' },
            { header: 'Total', binding: 'Total', format: 'c' }
        ], bold = new wjcPdf.PdfFont('times', 10, 'normal', 'bold');
        var grandTotal = this._summarizeColumn(expenses, 'Total'), totals = [
            'Total',
            '',
            this._summarizeColumn(expenses, 'Hotel'),
            this._summarizeColumn(expenses, 'Transport'),
            this._summarizeColumn(expenses, 'Meal'),
            this._summarizeColumn(expenses, 'Fuel'),
            this._summarizeColumn(expenses, 'Misc'),
            grandTotal
        ];
        // * draw captions *
        doc.drawText('Purpose: ', null, null, { font: bold, continued: true });
        doc.drawText(employee.Purpose);
        doc.drawText('From: ', 380, 0, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(minDate, wjcCore.DataType.String, 'd'));
        doc.drawText('To: ', 470, 0, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(maxDate, wjcCore.DataType.String, 'd'));
        doc.moveDown(2);
        var y = doc.y;
        doc.drawText('Name: ', 20, y, { font: bold, continued: true });
        doc.drawText(employee.Name);
        doc.drawText('Position: ', 190, y, { font: bold, continued: true });
        doc.drawText(employee.Position);
        doc.drawText('SSN: ', 360, y, { font: bold, continued: true });
        doc.drawText(employee.SSN);
        y = doc.y;
        doc.drawText('Department: ', 20, y, { font: bold, continued: true });
        doc.drawText(employee.Department);
        doc.drawText('Manager: ', 190, y, { font: bold, continued: true });
        doc.drawText(employee.Manager);
        doc.drawText('Employee ID: ', 360, y, { font: bold, continued: true });
        doc.drawText(employee.Id);
        doc.moveDown(2);
        // * draw table *
        doc.saveState();
        var scale = doc.width / (columns.length * this._colWidth), docY = doc.y;
        y = 0;
        if (scale > 1) {
            scale = 1;
        }
        doc.scale(scale, scale, new wjcCore.Point(0, docY));
        doc.translate(0, docY);
        // header
        this._renderRow(doc, y, columns, function (column) { return column.header; }, null, bold, '#fad9cd');
        y += this._rowHeight;
        // body
        expenses.forEach(function (item) {
            _this._renderRow(doc, y, columns, function (column) { return item[column.binding]; }, function (column) { return column.format; });
            y += _this._rowHeight;
        });
        // footer
        this._renderRow(doc, y, totals, null, 'c', bold, '#fad9cd');
        y += this._rowHeight;
        doc.y = docY + y * scale;
        doc.restoreState();
        doc.moveDown(2);
        // * draw captions *
        doc.drawText('Subtotal: ', 400, doc.y, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(grandTotal - employee.Advance, wjcCore.DataType.String, 'c'));
        doc.drawText('Cash Advance: ', 400, doc.y, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(employee.Advance, wjcCore.DataType.String, 'c'));
        doc.drawText('Total: ', 400, doc.y, { font: bold, continued: true });
        doc.drawText(wjcCore.changeType(grandTotal, wjcCore.DataType.String, 'c'));
        doc.moveDown(2);
        this._checkLineAvailable(doc);
        var thinPen = new wjcPdf.PdfPen('#000000', 0.5);
        y = doc.y;
        var sz = doc.drawText('Employee signature:', 0, y);
        doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
        sz = doc.drawText('Date:', 300, y);
        doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
        doc.moveDown();
        this._checkLineAvailable(doc);
        y = doc.y;
        var sz = doc.drawText('Approved by:', 0, y);
        doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
        sz = doc.drawText('Date:', 300, y);
        doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
    };
    ExpenseReportCmp.prototype._checkLineAvailable = function (doc) {
        if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
            doc.addPage();
        }
    };
    ExpenseReportCmp.prototype._renderRow = function (doc, y, values, getter, formatter, font, brush) {
        var _this = this;
        values.forEach(function (v, idx) {
            var x = idx * _this._colWidth;
            doc.paths
                .rect(x, y, _this._colWidth, _this._rowHeight)
                .fill(brush || '#f4b19b');
            var value = wjcCore.isFunction(getter)
                ? getter(v)
                : v || '';
            var format = wjcCore.isFunction(formatter)
                ? formatter(v)
                : formatter || '';
            if (value !== 'Total') {
                value = wjcCore.changeType(value, wjcCore.DataType.String, format);
            }
            doc.drawText(value, x + 3, y + 5, {
                font: font,
                height: _this._rowHeight,
                width: _this._colWidth
            });
        });
    };
    ExpenseReportCmp.prototype._summarizeColumn = function (data, name) {
        var sum = 0;
        data.forEach(function (item) {
            sum += item[name];
        });
        return sum;
    };
    ExpenseReportCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-expense-report-cmp',
            templateUrl: 'src/components/pdfdocument/expenseReportCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ExpenseReportCmp);
    return ExpenseReportCmp;
}());
exports.ExpenseReportCmp = ExpenseReportCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ExpenseReportCmp }
]);
var ExpenseReportModule = /** @class */ (function () {
    function ExpenseReportModule() {
    }
    ExpenseReportModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [ExpenseReportCmp]
        })
    ], ExpenseReportModule);
    return ExpenseReportModule;
}());
exports.ExpenseReportModule = ExpenseReportModule;
//# sourceMappingURL=ExpenseReportCmp.js.map