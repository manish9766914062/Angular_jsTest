'use strict';
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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var router_2 = require("@angular/router");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var ProductsService_1 = require("../services/ProductsService");
var CheckoutService_1 = require("../services/CheckoutService");
//EventAnnotations sample component
var ShoppingCartCmp = /** @class */ (function () {
    function ShoppingCartCmp(pdtSvc, cktSvc, router) {
        this._router = router;
        this.pdtSvc = pdtSvc;
        this.cktSvc = cktSvc;
    }
    ShoppingCartCmp.prototype.backToStore = function () {
        window.location.href = '';
    };
    // checkout the shopping cart.
    ShoppingCartCmp.prototype.checkout = function (serviceName) {
        var merchantID;
        if (serviceName === 'PayPal') {
            merchantID = 'bernardo.castilho-facilitator@gmail.com';
        }
        else {
            throw 'Unknown checkout service: ' + serviceName;
        }
        this.cktSvc.checkout(serviceName, merchantID, this.pdtSvc.cartItems);
        this.pdtSvc.clearCart = true;
    };
    ;
    ShoppingCartCmp.prototype.quantityChanged = function (item) {
        if (item.quantity > 0) {
            return;
        }
        var idx = this.pdtSvc.cartItems.indexOf(item);
        this.pdtSvc.cartItems.splice(idx, 1);
    };
    ShoppingCartCmp = __decorate([
        core_1.Component({
            selector: 'shopping-cart-cmp',
            templateUrl: 'src/components/shoppingCartCmp.html',
        }),
        __param(0, core_1.Inject(ProductsService_1.ProductsService)), __param(1, core_1.Inject(CheckoutService_1.CheckoutService)), __param(2, core_1.Inject(router_1.Router))
    ], ShoppingCartCmp);
    return ShoppingCartCmp;
}());
exports.ShoppingCartCmp = ShoppingCartCmp;
var routing = router_2.RouterModule.forChild([
    { path: '', component: ShoppingCartCmp }
]);
var ShoppingCartModule = /** @class */ (function () {
    function ShoppingCartModule() {
    }
    ShoppingCartModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_input_1.WjInputModule],
            declarations: [ShoppingCartCmp],
        })
    ], ShoppingCartModule);
    return ShoppingCartModule;
}());
exports.ShoppingCartModule = ShoppingCartModule;
//# sourceMappingURL=ShoppingCartCmp.js.map