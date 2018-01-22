'use strict';
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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_multirow_1 = require("wijmo/wijmo.angular2.grid.multirow");
var OrderBaseCmp_1 = require("./OrderBaseCmp");
var DataSvc_1 = require("../services/DataSvc");
var ExportSvc_1 = require("../services/ExportSvc");
//EventAnnotations sample component
var OrderDetailCmp = /** @class */ (function (_super) {
    __extends(OrderDetailCmp, _super);
    function OrderDetailCmp(dataSvc, exportSvc) {
        var _this = _super.call(this, dataSvc, exportSvc) || this;
        _this.exportFileName = 'OrderDetail';
        _this.data = dataSvc.getOrderDetail(5);
        _this.fields = dataSvc.fields;
        return _this;
    }
    OrderDetailCmp.prototype.exportToPDF = function () {
        var styles = {
            cellStyle: {
                backgroundColor: '#ffffff',
                borderColor: '#c6c6c6'
            },
            altCellStyle: {
                backgroundColor: '#C0FFC0'
            },
            headerCellStyle: {
                backgroundColor: '#eaeaea'
            }
        }, isJapanese = this.exportSvc.culture === 'ja';
        this.exportSvc.exportPdf(this.multiRow, 'OrderDetail.pdf', isJapanese, styles);
    };
    // Generate the layout definition for the MultiRow control.
    OrderDetailCmp.prototype.generateLayoutDef = function () {
        var fields = this.fields;
        return [
            {
                colspan: 6,
                cells: [
                    { binding: 'orderId', width: 90, header: fields.orderDetailFields.orderId },
                    { binding: 'partId', width: 80, header: fields.orderDetailFields.partId },
                    { binding: 'handlingId', width: 100, header: fields.orderDetailFields.handlingId },
                    { binding: 'processingStatus', width: 125, header: fields.orderDetailFields.processingStatus },
                    { binding: 'purchaseId', width: 100, header: fields.orderDetailFields.purchaseId },
                    { binding: 'completed', width: 100, header: fields.orderDetailFields.completed },
                    { binding: 'orderDate', width: 90, header: fields.orderDetailFields.orderDate },
                    { binding: 'partName', header: fields.orderDetailFields.partName, colspan: 5, align: 'center' },
                    { binding: 'company', header: fields.orderDetailFields.company, colspan: 3, align: 'center' },
                    { binding: 'person', header: fields.orderDetailFields.person, colspan: 2, align: 'center' },
                    { binding: 'accepted', width: 100, header: fields.orderDetailFields.accepted }
                ]
            },
            {
                cells: [
                    { binding: 'quantity1', width: 90, header: fields.orderDetailFields.quantity1 },
                    { binding: 'quantity2', width: 90, header: fields.orderDetailFields.quantity2 },
                    { binding: 'quantity3', width: 90, header: fields.orderDetailFields.quantity3 },
                ]
            },
            {
                cells: [
                    { binding: 'unit', width: 60, header: fields.orderDetailFields.unit },
                ]
            },
            {
                cells: [
                    { binding: 'deliveryDate', width: 120, header: fields.orderDetailFields.deliveryDate, format: 'yyyy/MM/dd' },
                    { binding: 'processingDate', width: 120, header: fields.orderDetailFields.processingDate, format: 'yyyy/MM/dd' },
                    { binding: 'shippingDate', width: 120, header: fields.orderDetailFields.shippingDate, format: 'yyyy/MM/dd' }
                ]
            },
            {
                cells: [
                    { binding: 'packingRequest', header: fields.orderDetailFields.packingRequest }
                ]
            }
        ];
    };
    OrderDetailCmp = __decorate([
        core_1.Component({
            selector: 'order-detail-cmp',
            templateUrl: 'src/components/orderDetailCmp.html',
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], OrderDetailCmp);
    return OrderDetailCmp;
}(OrderBaseCmp_1.OrderBaseCmp));
exports.OrderDetailCmp = OrderDetailCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: OrderDetailCmp }
]);
var OrderDetailModule = /** @class */ (function () {
    function OrderDetailModule() {
    }
    OrderDetailModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_multirow_1.WjGridMultirowModule],
            declarations: [OrderDetailCmp],
        })
    ], OrderDetailModule);
    return OrderDetailModule;
}());
exports.OrderDetailModule = OrderDetailModule;
//# sourceMappingURL=OrderDetailCmp.js.map