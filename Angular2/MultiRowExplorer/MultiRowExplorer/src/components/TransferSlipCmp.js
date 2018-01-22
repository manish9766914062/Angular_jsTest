"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var wjcGridXlsx = require("wijmo/wijmo.grid.xlsx");
var wjcXlsx = require("wijmo/wijmo.xlsx");
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcGridPdf = require("wijmo/wijmo.grid.pdf");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_multirow_1 = require("wijmo/wijmo.angular2.grid.multirow");
var OrderBaseCmp_1 = require("./OrderBaseCmp");
var DataSvc_1 = require("../services/DataSvc");
var ExportSvc_1 = require("../services/ExportSvc");
//EventAnnotations sample component
var TransferSlipCmp = /** @class */ (function (_super) {
    __extends(TransferSlipCmp, _super);
    function TransferSlipCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.data = dataSvc.generateSlipData(50);
        _this.items = new wjcCore.CollectionView(_this.data.items);
        _this.items.pageSize = 5;
        return _this;
    }
    TransferSlipCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        var multiRow = this.multiRow;
        if (multiRow) {
            var cv = multiRow.collectionView;
            multiRow.rowHeaders.columns.clear();
            this.updateSummary(cv);
            this.pageIndex = cv.pageIndex;
            this.pageCount = cv.pageCount;
            multiRow.cellEditEnded.addHandler(function () {
                _this.updateSummary(cv);
            });
            cv.pageChanged.addHandler(function () {
                _this.updateSummary(cv);
                _this.pageIndex = cv.pageIndex;
            });
            cv.collectionChanged.addHandler(function (sender, e) {
                var debtorAmt, creditorAmt;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    debtorAmt = +e.item.debtorAmt;
                    creditorAmt = +e.item.creditorAmt;
                    if (!isNaN(debtorAmt)) {
                        e.item.debtorTax = e.item.debtorAmt * 0.09;
                    }
                    if (!isNaN(creditorAmt)) {
                        e.item.creditorTax = e.item.creditorAmt * 0.09;
                    }
                }
            });
            this.getLayoutDef();
        }
    };
    Object.defineProperty(TransferSlipCmp.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (value) {
            if (this._fields != value) {
                this._fields = value;
                if (this.multiRow) {
                    this.getLayoutDef();
                    this.updateSummary(this.multiRow.collectionView);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TransferSlipCmp.prototype.moveToFirstPage = function () {
        this.items.moveToFirstPage();
    };
    TransferSlipCmp.prototype.moveToLastPage = function () {
        this.items.moveToLastPage();
    };
    TransferSlipCmp.prototype.moveToPreviousPage = function () {
        this.items.moveToPreviousPage();
    };
    TransferSlipCmp.prototype.moveToNextPage = function () {
        this.items.moveToNextPage();
    };
    TransferSlipCmp.prototype.exportToExcel = function () {
        var fields = this.fields;
        var workbook = wjcGridXlsx.FlexGridXlsxConverter.save(this.multiRow);
        var workbookRow = new wjcXlsx.WorkbookRow();
        var workbookFill = new wjcXlsx.WorkbookFill();
        workbookFill.color = '#8080FF';
        var workbookFont = new wjcXlsx.WorkbookFont();
        workbookFont.bold = true;
        var workbookStyle = new wjcXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.font = workbookFont;
        workbookStyle.hAlign = wjcXlsx.HAlign.Center;
        var workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.date;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.data.date;
        var dateCellStyle = new wjcXlsx.WorkbookStyle();
        dateCellStyle.format = 'MM/dd/yyyy';
        workbookCell.style = dateCellStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.slipNo;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.data.slipNo;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.settlementTitle;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.data.settlement;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.splice(0, 0, workbookRow);
        workbook.sheets[0].frozenPane.rows = 3;
        workbookRow = new wjcXlsx.WorkbookRow();
        workbookFill = new wjcXlsx.WorkbookFill();
        workbookFill.color = '#99B4D1';
        workbookStyle = new wjcXlsx.WorkbookStyle();
        workbookStyle.fill = workbookFill;
        workbookStyle.hAlign = wjcXlsx.HAlign.Center;
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.debtorSumTitle;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.debtorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.creditorSumTitle;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.creditorSum;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = fields.debtorCreditorBalanceTitle;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbookCell = new wjcXlsx.WorkbookCell();
        workbookCell.value = this.balance;
        workbookCell.style = workbookStyle;
        workbookRow.cells.push(workbookCell);
        workbook.sheets[0].rows.push(workbookRow);
        workbook.save('TransferSlip.xlsx');
    };
    TransferSlipCmp.prototype.exportToPDF = function () {
        var fields = this.fields, doc = new wjcPdf.PdfDocument({
            header: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]'
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]'
                }
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'TransferSlip.pdf');
            }
        }), settings = {
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        }, font, drawTextSetting, thinPen = new wjcPdf.PdfPen('#000000', 0.5);
        // Set Japanese font for Japanese culture.
        if (this.exportSvc.culture === 'ja') {
            doc.registerFont({
                source: 'resources/fonts/ipaexg00201/ipaexg.ttf',
                name: 'ipaexg',
                style: 'normal',
                weight: 'normal',
                sansSerif: true
            });
            font = new wjcPdf.PdfFont('ipaexg');
            settings.styles.cellStyle.font = font;
            drawTextSetting = {
                font: font
            };
        }
        // Draw header of the transfer slip.
        doc.paths
            .rect(0.5, 0.5, 50, 21)
            .fill('#8080FF')
            .moveTo(0, 0).lineTo(334, 0)
            .moveTo(334, 0).lineTo(334, 22)
            .moveTo(0, 22).lineTo(334, 22)
            .moveTo(0, 0).lineTo(0, 22).stroke(thinPen);
        doc.drawText(fields.date, 3.5, 5.5, drawTextSetting);
        doc.drawText(wjcCore.Globalize.format(this.data.date, 'd'), 53.5, 5.5, drawTextSetting);
        doc.paths
            .rect(130.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText(fields.slipNo, 133.5, 5.5, drawTextSetting);
        doc.drawText(this.data.slipNo, 183.5, 5.5, drawTextSetting);
        doc.paths
            .rect(230.5, 0.5, 50, 21)
            .fill('#8080FF');
        doc.drawText(fields.settlementTitle, 233.5, 5.5, drawTextSetting);
        doc.drawText(this.data.settlement, 283.5, 5.5, drawTextSetting);
        doc.moveDown();
        // Draw the body of the transfer slip.
        wjcGridPdf.FlexGridPdfConverter.draw(this.multiRow, doc, null, null, settings);
        // Draw the footer of the transfer slip.
        doc.paths
            .rect(0.5, 274.5, 380, 21)
            .fill('#99B4D1')
            .moveTo(0, 274).lineTo(381, 274)
            .moveTo(381, 274).lineTo(381, 296)
            .moveTo(0, 296).lineTo(381, 296)
            .moveTo(0, 274).lineTo(0, 296)
            .moveTo(60, 274).lineTo(60, 296)
            .moveTo(120, 274).lineTo(120, 296)
            .moveTo(180, 274).lineTo(180, 296)
            .moveTo(240, 274).lineTo(240, 296)
            .moveTo(320, 274).lineTo(320, 296).stroke(thinPen);
        doc.drawText(fields.debtorSumTitle, 3.5, 279.5, drawTextSetting);
        doc.drawText(this.debtorSum, 63.5, 279.5, drawTextSetting);
        doc.drawText(fields.creditorSumTitle, 123.5, 279.5, drawTextSetting);
        doc.drawText(this.creditorSum, 183.5, 279.5, drawTextSetting);
        doc.drawText(fields.debtorCreditorBalanceTitle, 243.5, 279.5, drawTextSetting);
        doc.drawText(this.balance, 323.5, 279.5, drawTextSetting);
        doc.end();
    };
    // Generate the layout definition for the MultiRow control.
    TransferSlipCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields, debtorAccDataMap = this.dataSvc.buildDataMap(fields.debtorAccounts.split(',')), debtorTypeDataMap = this.dataSvc.buildDataMap(fields.debtorTypes.split(',')), creditorAccDataMap = this.dataSvc.buildDataMap(fields.creditorAccounts.split(',')), creditorTypeDataMap = this.dataSvc.buildDataMap(fields.creditorTypes.split(','));
        return [
            {
                cells: [
                    { binding: 'debtorAcc', width: 125, header: fields.transferSlipFields.debtorAccount, dataMap: debtorAccDataMap, align: 'center' },
                    { binding: 'debtorType', width: 125, header: fields.transferSlipFields.debtorType, dataMap: debtorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorAmt', width: 125, format: 'c2', header: fields.transferSlipFields.debtorAmount, align: 'center' },
                    { binding: 'debtorTax', width: 125, format: 'c2', header: fields.transferSlipFields.debtorTax, align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAcc', width: 125, header: fields.transferSlipFields.creditorAccount, dataMap: creditorAccDataMap, align: 'center' },
                    { binding: 'creditorType', width: 125, header: fields.transferSlipFields.creditorType, dataMap: creditorTypeDataMap, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'creditorAmt', width: 125, format: 'c2', header: fields.transferSlipFields.creditorAmount, align: 'center' },
                    { binding: 'creditorTax', width: 125, format: 'c2', header: fields.transferSlipFields.creditorTax, align: 'center', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'brief', width: 210, header: fields.transferSlipFields.brief, align: 'center' },
                    { binding: 'note', width: 210, header: fields.transferSlipFields.note, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'debtorTaxCategrory', width: 230, header: fields.transferSlipFields.debtorTaxCategory, align: 'center' },
                    { binding: 'creditorTaxCategory', width: 230, header: fields.transferSlipFields.creditorTaxCategory, align: 'center' }
                ]
            }
        ];
    };
    // Update summary info for the footer of the multirow control.
    TransferSlipCmp.prototype.updateSummary = function (cv) {
        var debtorSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'debtorAmt'), creditorSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'creditorAmt');
        this.debtorSum = wjcCore.Globalize.format(debtorSum, 'c');
        this.creditorSum = wjcCore.Globalize.format(creditorSum, 'c');
        this.balance = wjcCore.Globalize.format(debtorSum - creditorSum, 'c');
    };
    TransferSlipCmp = __decorate([
        core_1.Component({
            selector: 'transfer-slip-cmp',
            templateUrl: 'src/components/transferSlipCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], TransferSlipCmp);
    return TransferSlipCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.TransferSlipCmp = TransferSlipCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: TransferSlipCmp }
]);
var TransferSlipModule = /** @class */ (function () {
    function TransferSlipModule() {
    }
    TransferSlipModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_multirow_1.WjGridMultirowModule],
            declarations: [TransferSlipCmp],
        })
    ], TransferSlipModule);
    return TransferSlipModule;
}());
exports.TransferSlipModule = TransferSlipModule;
//# sourceMappingURL=TransferSlipCmp.js.map