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
var OrderManagementCmp = /** @class */ (function (_super) {
    __extends(OrderManagementCmp, _super);
    function OrderManagementCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.exportFileName = 'OrderManagement';
        _this.pageIndex = -1;
        _this.pageCount = -1;
        _this.data = new wjcCore.CollectionView(dataSvc.getOrders(20));
        _this.data.pageSize = 5;
        return _this;
    }
    OrderManagementCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.multiRow) {
            var cv = this.multiRow.collectionView;
            this.pageIndex = cv.pageIndex;
            this.pageCount = cv.pageCount;
            cv.pageChanged.addHandler(function () {
                _this.pageIndex = cv.pageIndex;
            });
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
    // Generate the layout definition for the MultiRow control.
    OrderManagementCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields;
        var warehouseDataMap = this.dataSvc.buildDataMap(fields.warehouses.split(','));
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'orderId', header: fields.orderManagementFields.orderId, width: 80 },
                    { binding: 'productId', header: fields.orderManagementFields.productId, width: 80 },
                    { binding: 'productName', header: fields.orderManagementFields.productName, width: 180 },
                    { binding: 'specialNote', header: fields.orderManagementFields.specialNote, align: 'center', colspan: 3 }
                ]
            },
            {
                colspan: 3,
                cells: [
                    { binding: 'quantity', header: fields.orderManagementFields.quantity, width: 80 },
                    { binding: 'unitPrice', header: fields.orderManagementFields.unitPrice, width: 80, format: 'c2' },
                    { binding: 'amount', header: fields.orderManagementFields.amount, isReadOnly: true, width: 80, format: 'c2' },
                    { binding: 'shippingWarehouse', header: fields.orderManagementFields.shippingWarehouse, dataMap: warehouseDataMap, align: 'center', colspan: 2 },
                    { binding: 'onHold', header: fields.orderManagementFields.onHold },
                ]
            },
            {
                cells: [
                    { binding: 'orderDate', header: fields.orderManagementFields.orderDate, format: 'yyyy/MM/dd' },
                    { binding: 'deliveryDate', header: fields.orderManagementFields.deliveryDate, format: 'yyyy/MM/dd' }
                ]
            }
        ];
    };
    OrderManagementCmp = __decorate([
        core_1.Component({
            selector: 'order-management-cmp',
            templateUrl: 'src/components/orderManagementCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], OrderManagementCmp);
    return OrderManagementCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.OrderManagementCmp = OrderManagementCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: OrderManagementCmp }
]);
var OrderManagementModule = /** @class */ (function () {
    function OrderManagementModule() {
    }
    OrderManagementModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_multirow_1.WjGridMultirowModule],
            declarations: [OrderManagementCmp],
        })
    ], OrderManagementModule);
    return OrderManagementModule;
}());
exports.OrderManagementModule = OrderManagementModule;
//# sourceMappingURL=OrderManagementCmp.js.map