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
var wjcGrid = require("wijmo/wijmo.grid");
var wjcGridXlsx = require("wijmo/wijmo.grid.xlsx");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_multirow_1 = require("wijmo/wijmo.angular2.grid.multirow");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var OrderBaseCmp_1 = require("./OrderBaseCmp");
var DataSvc_1 = require("../services/DataSvc");
var ExportSvc_1 = require("../services/ExportSvc");
//EventAnnotations sample component
var PurchaseSlipCmp = /** @class */ (function (_super) {
    __extends(PurchaseSlipCmp, _super);
    function PurchaseSlipCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.exportFileName = 'PurchaseSlip';
        _this.data = dataSvc.getPurchaseSlip();
        return _this;
    }
    PurchaseSlipCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        var multiRow = this.multiRow, footer = this.footer;
        if (multiRow) {
            var cv = multiRow.collectionView;
            cv.collectionChanged.addHandler(function (sender, e) {
                var quantity, unitCost;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    quantity = +e.item.quantity;
                    unitCost = +e.item.unitCost;
                    if (!isNaN(quantity) && !isNaN(unitCost)) {
                        e.item.cost = quantity * unitCost;
                        e.item.price = e.item.cost * 1.35;
                        _this.updateSummary(cv);
                    }
                }
            });
            multiRow.scrollPositionChanged.addHandler(function () {
                if (footer && footer.scrollPosition.x !== multiRow.scrollPosition.x) {
                    footer.scrollPosition = new wjcCore.Point(multiRow.scrollPosition.x, 0);
                }
            });
            multiRow._root.style.overflowX = 'hidden';
            this.getLayoutDef();
        }
        if (footer && multiRow) {
            this.getSummaryFields();
            footer.scrollPositionChanged.addHandler(function () {
                if (multiRow && multiRow.scrollPosition.x !== footer.scrollPosition.x) {
                    multiRow.scrollPosition = new wjcCore.Point(footer.scrollPosition.x, multiRow.scrollPosition.y);
                }
            });
        }
    };
    Object.defineProperty(PurchaseSlipCmp.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (value) {
            if (this._fields != value) {
                var multiRow = this.multiRow, footer = this.footer;
                this._fields = value;
                if (multiRow) {
                    this.getLayoutDef();
                }
                if (footer && footer.rows.length > 0 && footer.columns.length > 0 && multiRow) {
                    footer.setCellData(0, 3, this.fields.summary);
                    footer.setCellData(0, 6, this.fields.amountSummary);
                    this.updateSummary(multiRow.collectionView);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    PurchaseSlipCmp.prototype.exportToExcel = function () {
        var mainWorkbook = wjcGridXlsx.FlexGridXlsxConverter.save(this.multiRow), footerWOrkbook = wjcGridXlsx.FlexGridXlsxConverter.save(this.footer);
        mainWorkbook.sheets[0].rows.push(footerWOrkbook.sheets[0].rows[0]);
        mainWorkbook.save('PurchaseSlip.xlsx');
    };
    PurchaseSlipCmp.prototype.exportToPDF = function () {
        var isJapanese = this.exportSvc.culture === 'ja';
        try {
            this.mergeFooter();
            this.exportSvc.exportPdf(this.multiRow, 'PurchaseSlip.pdf', isJapanese, null);
        }
        finally {
            this.multiRow.rows.pop();
        }
    };
    PurchaseSlipCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields, caseDataMap = this.dataSvc.buildDataMap(fields.cases.split(','));
        return [
            {
                cells: [
                    { binding: 'productName', header: fields.purchaseSlipFields.productName, align: 'center', width: 200 }
                ]
            },
            {
                cells: [
                    { binding: 'productId', header: fields.purchaseSlipFields.productId, width: 90 }
                ]
            },
            {
                cells: [
                    { binding: 'color', header: fields.purchaseSlipFields.color, align: 'center' },
                    { binding: 'packageUnit', header: fields.purchaseSlipFields.packageUnit, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'size', header: fields.purchaseSlipFields.size, width: 80 },
                    { binding: 'case', header: fields.purchaseSlipFields.case, dataMap: caseDataMap, width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: fields.purchaseSlipFields.quantity, width: 65 }
                ]
            },
            {
                cells: [
                    { binding: 'deal', header: fields.purchaseSlipFields.deal, width: 60 },
                    { binding: 'id', header: fields.purchaseSlipFields.id, width: 60 }
                ]
            },
            {
                cells: [
                    { binding: 'unitCost', header: fields.purchaseSlipFields.unitCost, width: 130, format: 'c2' }
                ]
            },
            {
                cells: [
                    { binding: 'cost', header: fields.purchaseSlipFields.cost, width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'price', header: fields.purchaseSlipFields.price, width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: fields.purchaseSlipFields.remarks, align: 'center' }
                ]
            }
        ];
    };
    PurchaseSlipCmp.prototype.getSummaryFields = function () {
        var _this = this;
        var footer = this.footer, multiRow = this.multiRow, cv = multiRow.collectionView, fields = this.fields;
        if (fields) {
            footer.columnLayout = multiRow.columnLayout;
            for (var i = 0; i < footer.columns.length; i++) {
                footer.columns[i].isReadOnly = true;
                footer.columns[i].cssClass = 'summary-footer';
                if (i === 3 || i === 6) {
                    footer.columns[i].cssClass += ' summary-footer-title';
                }
            }
            footer.columns[4].align = 'right';
            footer.rows.push(new wjcGrid.Row());
            footer.columnHeaders.rows.clear();
            footer.setCellData(0, 3, fields.summary);
            footer.setCellData(0, 6, fields.amountSummary);
            this.updateSummary(cv);
        }
        else {
            clearTimeout(this.getSummaryFieldsTimer);
            this.getSummaryFieldsTimer = null;
            this.getSummaryFieldsTimer = setTimeout(function () {
                _this.getSummaryFields();
            }, 100);
        }
    };
    // Update the summary info for the MultiRow control.
    PurchaseSlipCmp.prototype.updateSummary = function (cv) {
        var footer = this.footer, qtySum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'quantity'), costSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'cost'), priceSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'price');
        footer.setCellData(0, 4, qtySum);
        footer.setCellData(0, 7, wjcCore.Globalize.format(costSum, 'c2'));
        footer.setCellData(0, 8, wjcCore.Globalize.format(priceSum, 'c2'));
    };
    // Merge the footer to the multiRow control for exporting pdf.
    PurchaseSlipCmp.prototype.mergeFooter = function () {
        var multiRow = this.multiRow, footer = this.footer, rowCnt = multiRow.rows.length, newRow = new wjcGrid.GroupRow();
        //newRow.recordIndex = 0;
        multiRow.rows.push(newRow);
        multiRow.setCellData(rowCnt, 3, footer.getCellData(0, 3, false));
        multiRow.setCellData(rowCnt, 4, footer.getCellData(0, 4, false));
        multiRow.setCellData(rowCnt, 6, footer.getCellData(0, 6, false), false);
        multiRow.setCellData(rowCnt, 7, footer.getCellData(0, 7, false));
        multiRow.setCellData(rowCnt, 8, footer.getCellData(0, 8, false));
    };
    __decorate([
        core_1.ViewChild('footer')
    ], PurchaseSlipCmp.prototype, "footer", void 0);
    PurchaseSlipCmp = __decorate([
        core_1.Component({
            selector: 'purchase-slip-cmp',
            templateUrl: 'src/components/purchaseSlipCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], PurchaseSlipCmp);
    return PurchaseSlipCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.PurchaseSlipCmp = PurchaseSlipCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: PurchaseSlipCmp }
]);
var PurchaseSlipModule = /** @class */ (function () {
    function PurchaseSlipModule() {
    }
    PurchaseSlipModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_multirow_1.WjGridMultirowModule, wijmo_angular2_grid_1.WjGridModule],
            declarations: [PurchaseSlipCmp],
        })
    ], PurchaseSlipModule);
    return PurchaseSlipModule;
}());
exports.PurchaseSlipModule = PurchaseSlipModule;
//# sourceMappingURL=PurchaseSlipCmp.js.map