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
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_multirow_1 = require("wijmo/wijmo.angular2.grid.multirow");
var OrderBaseCmp_1 = require("./OrderBaseCmp");
var DataSvc_1 = require("../services/DataSvc");
var ExportSvc_1 = require("../services/ExportSvc");
//EventAnnotations sample component
var SalesSlipCmp = /** @class */ (function (_super) {
    __extends(SalesSlipCmp, _super);
    function SalesSlipCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.exportFileName = 'SalesSlip';
        _this.data = new wjcCore.CollectionView(dataSvc.getSalesSlip(20));
        _this.data.pageSize = 5;
        return _this;
    }
    SalesSlipCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        var multiRow = this.multiRow;
        if (multiRow) {
            var cv = multiRow.collectionView;
            this.pageIndex = cv.pageIndex;
            this.pageCount = cv.pageCount;
            cv.pageChanged.addHandler(function () {
                _this.pageIndex = cv.pageIndex;
            });
            cv.collectionChanged.addHandler(function (sender, e) {
                var unitPrice, profitUnitPrice, quantity;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    unitPrice = +e.item.unitPrice;
                    profitUnitPrice = +e.item.profitUnitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(quantity)) {
                        if (!isNaN(unitPrice)) {
                            e.item.salesAmount = unitPrice * quantity;
                        }
                        if (!isNaN(profitUnitPrice)) {
                            e.item.totalProfit = profitUnitPrice * quantity;
                        }
                        if (!isNaN(unitPrice) && !isNaN(profitUnitPrice)) {
                            e.item.profitRate = e.item.totalProfit / e.item.salesAmount;
                        }
                    }
                }
            });
            this.getLayoutDef();
        }
    };
    // Generate the layout definition for the MultiRow control.
    SalesSlipCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields, warehouseDataMap = this.dataSvc.buildDataMap(fields.warehouses.split(','));
        return [
            {
                cells: [
                    { binding: 'id', header: fields.salesSlipFields.id, width: 60 }
                ]
            },
            {
                colspan: 5,
                cells: [
                    { binding: 'productId', header: fields.salesSlipFields.productId, width: 80 },
                    { binding: 'productName', header: fields.salesSlipFields.productName, colspan: 3 },
                    { binding: 'marker', header: fields.salesSlipFields.marker, align: 'center' },
                    { binding: 'quantity', header: fields.salesSlipFields.quantity, width: 80, align: 'right' },
                    { binding: 'unit', header: fields.salesSlipFields.unit },
                    { binding: 'unitPrice', header: fields.salesSlipFields.unitPrice, format: 'c2', colspan: 2 },
                    { binding: 'salesAmount', header: fields.salesSlipFields.salesAmount, format: 'c2', isReadOnly: true },
                    { binding: 'profitUnitPrice', header: fields.salesSlipFields.profitUnitPrice, format: 'c2', colspan: 2 },
                    { binding: 'totalProfit', header: fields.salesSlipFields.totalProfit, format: 'c2', colspan: 2, isReadOnly: true, cssClass: 'profit-cell' },
                    { binding: 'profitRate', header: fields.salesSlipFields.profitRate, format: 'p2', isReadOnly: true, cssClass: 'profit-cell' }
                ]
            }
        ];
    };
    SalesSlipCmp = __decorate([
        core_1.Component({
            selector: 'sale-slip-cmp',
            templateUrl: 'src/components/salesSlipCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], SalesSlipCmp);
    return SalesSlipCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.SalesSlipCmp = SalesSlipCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: SalesSlipCmp }
]);
var SalesSlipModule = /** @class */ (function () {
    function SalesSlipModule() {
    }
    SalesSlipModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_multirow_1.WjGridMultirowModule],
            declarations: [SalesSlipCmp],
        })
    ], SalesSlipModule);
    return SalesSlipModule;
}());
exports.SalesSlipModule = SalesSlipModule;
//# sourceMappingURL=SalesSlipCmp.js.map