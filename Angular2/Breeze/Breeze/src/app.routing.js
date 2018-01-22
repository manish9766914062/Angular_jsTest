"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
// Application Routes. "data.caption" defines captions for navigation links in markup.
exports.routes = [
    { path: '', data: { caption: 'Home' }, loadChildren: 'src/components/HomeCmp#HomeModule' },
    { path: 'customers', data: { caption: 'Customers' }, loadChildren: 'src/components/CustomersCmp#CustomersModule' },
    { path: 'orders', data: { caption: 'Orders' }, loadChildren: 'src/components/OrdersCmp#OrdersModule' },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map