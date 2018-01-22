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
'use strict';
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
// Common data service
var ProductsService = /** @class */ (function () {
    function ProductsService(http) {
        var _this = this;
        this.clearCart = false;
        this.http = http;
        this.products = new wjcCore.CollectionView();
        this.getProductsWithPromise().then(function (data) {
            _this.products.sourceCollection = data;
        });
        this.cartItems = [];
        this.loadCartItems();
        // save items to local storage when unloading
        window.addEventListener('unload', function () {
            console.log('unload');
            if (_this.clearCart) {
                _this.cartItems = [];
                _this.clearCart = false;
            }
            _this.saveCartItems();
        });
    }
    // get the total price for all items currently in the cart
    ProductsService.prototype.getTotalPrice = function (sku) {
        var total = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (sku == null || item.sku == sku) {
                total += this.toNumber(item.quantity * item.price);
            }
        }
        return total;
    };
    ProductsService.prototype.getTotalCount = function (sku) {
        var count = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (sku == null || item.sku == sku) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;
    };
    // add item in shopping cart
    ProductsService.prototype.addCartItem = function (product, quantity) {
        quantity = this.toNumber(quantity);
        if (quantity != 0) {
            // update quantity for existing item
            var found = false;
            for (var i = 0; i < this.cartItems.length && !found; i++) {
                var item = this.cartItems[i];
                if (item.sku === product.sku) {
                    found = true;
                    item.quantity = this.toNumber(item.quantity + quantity);
                }
            }
            // new item, add now
            if (!found) {
                this.cartItems.push({
                    sku: product.sku,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        }
        return false;
    };
    ;
    // remove item from the shopping cart
    ProductsService.prototype.clearCartItem = function (sku) {
        if (sku) {
            for (var i = 0; i < this.cartItems.length; i++) {
                var item = this.cartItems[i];
                if (item.sku === sku) {
                    this.cartItems.splice(i, 1);
                }
            }
        }
        else {
            this.cartItems = [];
        }
        this.saveCartItems();
    };
    ;
    ProductsService.prototype.saveCartItems = function () {
        if (localStorage != null && JSON != null) {
            localStorage['shoppingCart_items'] = JSON.stringify(this.cartItems);
        }
    };
    ;
    // convert the value to numeric value
    ProductsService.prototype.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    };
    ProductsService.prototype.getProductsWithPromise = function () {
        return this.http.get('data/products.json').toPromise()
            .then(this.extractData);
    };
    ProductsService.prototype.extractData = function (res) {
        return res.json();
    };
    // load the shopping cart from local storage
    ProductsService.prototype.loadCartItems = function () {
        var items = localStorage != null ? localStorage['shoppingCart_items'] : null;
        if (items != null && JSON != null) {
            try {
                var items = JSON.parse(items);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                        this.cartItems.push({
                            sku: item.sku,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity
                        });
                    }
                }
            }
            catch (err) {
                // ignore errors while loading...
            }
        }
    };
    ;
    ProductsService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http))
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=ProductsService.js.map