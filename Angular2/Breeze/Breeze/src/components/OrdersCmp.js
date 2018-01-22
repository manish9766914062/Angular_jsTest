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
var wjcGrid = require("wijmo/wijmo.grid");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("../services/DataSvc");
var BreezeCollectionView_1 = require("../BreezeCollectionView");
var OrdersCmp = /** @class */ (function () {
    function OrdersCmp(dataSvc) {
        var _this = this;
        this.dataSvc = dataSvc;
        //this.dataSvc.init();
        this.orders = new BreezeCollectionView_1.BreezeCollectionView(dataSvc.getManager(), dataSvc.getEntityQuery("Orders").take(50), true, true, true);
        this.orders.currentChanged.addHandler(function () {
            _this.currentOrder = _this.orders.currentItem;
        });
        this.orders.collectionChanged.addHandler(function () {
            _this.currentOrder = _this.orders.currentItem;
        });
        this.orders.querySucceeded.addHandler(function (sender, e) {
            _this.dataSvc.querySucceeded(e.data);
        });
        this.orders.queryFailed.addHandler(function (sender, e) {
            _this.dataSvc.queryFailed(e.data.message);
        });
        this.orders.saveSucceeded.addHandler(function (sender, e) {
            _this.dataSvc.saveSucceeded(e.data);
        });
        this.orders.saveFailed.addHandler(function (sender, e) {
            _this.dataSvc.saveFailed(e.data);
        });
    }
    OrdersCmp.prototype.initialized = function (grid) {
        // store reference to grid
        var tip = new wjcCore.Tooltip(), rng = null;
        // monitor the mouse over the grid
        grid.addEventListener(grid.hostElement, 'mousemove', function (evt) {
            var ht = grid.hitTest(evt);
            if (!ht.range.equals(rng)) {
                // new cell selected, show tooltip
                if (ht.cellType == wjcGrid.CellType.Cell) {
                    rng = ht.range;
                    var cellElement = document.elementFromPoint(evt.clientX, evt.clientY), cellBounds = wjcCore.Rect.fromBoundingRect(cellElement.getBoundingClientRect()), data = wjcCore.escapeHtml(grid.getCellData(rng.row, rng.col, true)), tipContent = '<b>' + data + '</b>';
                    if (cellElement.className.indexOf('wj-cell') > -1) {
                        tip.show(grid.hostElement, tipContent, cellBounds);
                    }
                    else {
                        tip.hide(); // cell must be behind scroll bar...
                    }
                }
            }
        });
        grid.addEventListener(grid.hostElement, 'mouseout', function () {
            tip.hide();
            rng = null;
        });
    };
    OrdersCmp.prototype.update = function (currentOrder) {
        this.orders.editItem(currentOrder);
        this.orders.commitEdit();
    };
    ;
    OrdersCmp.prototype.reset = function (currentOrder) {
        currentOrder.entityAspect.rejectChanges();
        this.orders.cancelEdit();
    };
    OrdersCmp = __decorate([
        core_1.Component({
            selector: 'orders-cmp',
            templateUrl: 'src/components/ordersCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], OrdersCmp);
    return OrdersCmp;
}());
exports.OrdersCmp = OrdersCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: OrdersCmp }
]);
var OrdersModule = /** @class */ (function () {
    function OrdersModule() {
    }
    OrdersModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, forms_1.FormsModule, routing],
            providers: [DataSvc_1.DataSvc],
            declarations: [OrdersCmp],
        })
    ], OrdersModule);
    return OrdersModule;
}());
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=OrdersCmp.js.map