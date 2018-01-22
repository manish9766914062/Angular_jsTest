"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
// Application Routes. "data.caption" defines captions for navigation links in markup.
exports.routes = [
    { path: '', redirectTo: 'transferSlip', pathMatch: 'full' },
    { path: 'transferSlip', loadChildren: 'src/components/TransferSlipCmp#TransferSlipModule' },
    { path: 'ordersSlip', loadChildren: 'src/components/OrdersSlipCmp#OrdersSlipModule' },
    { path: 'orderDetail', loadChildren: 'src/components/OrderDetailCmp#OrderDetailModule' },
    { path: 'purchaseSlip', loadChildren: 'src/components/PurchaseSlipCmp#PurchaseSlipModule' },
    { path: 'orderManagement', loadChildren: 'src/components/OrderManagementCmp#OrderManagementModule' },
    { path: 'salesSlip', loadChildren: 'src/components/SalesSlipCmp#SalesSlipModule' }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map