"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
// Application Routes. "data.caption" defines captions for navigation links in markup.
exports.routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    { path: 'store', loadChildren: 'src/components/StoreCmp#StoreModule' },
    { path: 'product', loadChildren: 'src/components/ProductCmp#ProductModule' },
    { path: 'cart', loadChildren: 'src/components/ShoppingCartCmp#ShoppingCartModule' }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map