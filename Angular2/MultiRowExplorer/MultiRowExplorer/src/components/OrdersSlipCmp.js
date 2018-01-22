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
var OrdersSlipCmp = /** @class */ (function (_super) {
    __extends(OrdersSlipCmp, _super);
    function OrdersSlipCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.exportFileName = 'OrdersSlip';
        _this.data = dataSvc.generateOrdersSlipData();
        return _this;
    }
    OrdersSlipCmp.prototype.ngAfterViewInit = function () {
        if (this.multiRow) {
            var cv = this.multiRow.collectionView;
            cv.collectionChanged.addHandler(function (sender, e) {
                var unitPrice, quantity;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    unitPrice = +e.item.unitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(unitPrice) && !isNaN(quantity)) {
                        e.item.amount = unitPrice * quantity;
                    }
                }
            });
            this.getLayoutDef();
        }
    };
    OrdersSlipCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields;
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'productId', header: fields.ordersSlipFields.productId, width: 90 },
                    { binding: 'categoryId', header: fields.ordersSlipFields.categoryId, width: 90 },
                    { binding: 'categoryName', header: fields.ordersSlipFields.category, width: 90 },
                    { binding: 'productName', header: fields.ordersSlipFields.productName, colspan: 3 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: fields.ordersSlipFields.quantity, width: 140 },
                    { binding: 'packageUnit', header: fields.ordersSlipFields.packageUnit, width: 140 }
                ]
            },
            {
                cells: [
                    { binding: 'unitPrice', header: fields.ordersSlipFields.unitPrice, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'amount', header: fields.ordersSlipFields.amount, isReadOnly: true, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'shippingId', header: fields.ordersSlipFields.shippingId, width: 100 },
                    { binding: 'discontinued', header: fields.ordersSlipFields.discontinued, width: 100 }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: fields.ordersSlipFields.remarks, width: 280 },
                    { binding: 'description', header: fields.ordersSlipFields.description, width: 280 }
                ]
            }
        ];
    };
    OrdersSlipCmp = __decorate([
        core_1.Component({
            selector: 'orders-slip-cmp',
            templateUrl: 'src/components/ordersSlipCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], OrdersSlipCmp);
    return OrdersSlipCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.OrdersSlipCmp = OrdersSlipCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: OrdersSlipCmp }
]);
var OrdersSlipModule = /** @class */ (function () {
    function OrdersSlipModule() {
    }
    OrdersSlipModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_multirow_1.WjGridMultirowModule],
            declarations: [OrdersSlipCmp],
        })
    ], OrdersSlipModule);
    return OrdersSlipModule;
}());
exports.OrdersSlipModule = OrdersSlipModule;
//# sourceMappingURL=OrdersSlipCmp.js.map