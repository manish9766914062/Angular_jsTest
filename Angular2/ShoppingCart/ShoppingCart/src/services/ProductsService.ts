import * as wjcCore from 'wijmo/wijmo';
'use strict';
import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// Common data service
@Injectable()
export class ProductsService {

    products: wjcCore.CollectionView;
    cartItems: any[];
    http: Http;
    clearCart = false;
    constructor( @Inject(Http) http: Http) {
        this.http = http;
        this.products = new wjcCore.CollectionView();
        this.getProductsWithPromise().then(data => {
            this.products.sourceCollection = data;
        })
        this.cartItems = [];
        this.loadCartItems();
        // save items to local storage when unloading
        window.addEventListener('unload', () => {
            console.log('unload');
            if (this.clearCart) {
                this.cartItems = [];
                this.clearCart = false;
            }
            this.saveCartItems();
        })
    }

   // get the total price for all items currently in the cart
    getTotalPrice(sku) {
        var total = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (sku == null || item.sku == sku) {
                total += this.toNumber(item.quantity * item.price);
            }
        }
        return total;
    }

    getTotalCount(sku) {
        var count = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            var item = this.cartItems[i];
            if (sku == null || item.sku == sku) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;
    }

    // add item in shopping cart
    addCartItem(product: any, quantity: number) {
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

    // remove item from the shopping cart
    clearCartItem(sku) {
        if (sku) {
            for (var i = 0; i < this.cartItems.length; i++) {
                var item = this.cartItems[i];
                if (item.sku === sku) {
                    this.cartItems.splice(i, 1);
                }
            }
        } else {
            this.cartItems = [];
        }

        this.saveCartItems();
    };

   saveCartItems() {
    if (localStorage != null && JSON != null) {
        localStorage['shoppingCart_items'] = JSON.stringify(this.cartItems);
    }
};

    // convert the value to numeric value
    private toNumber(value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    }

    private getProductsWithPromise(): Promise<any> {
        return this.http.get('data/products.json').toPromise()
            .then(this.extractData);
    }

    private extractData(res: Response) {
        return res.json();
    }

    // load the shopping cart from local storage
    private loadCartItems() {
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
}