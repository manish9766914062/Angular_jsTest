
'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { ProductsService } from '../services/ProductsService';
import { CheckoutService } from '../services/CheckoutService';
//EventAnnotations sample component
@Component({
    selector: 'shopping-cart-cmp',
    templateUrl: 'src/components/shoppingCartCmp.html',
})

export class ShoppingCartCmp {
    private _router: Router;
    pdtSvc: ProductsService;
    cktSvc: CheckoutService;
    constructor( @Inject(ProductsService) pdtSvc: ProductsService, @Inject(CheckoutService)cktSvc: CheckoutService, @Inject(Router) router: Router) {
        this._router = router;
        this.pdtSvc = pdtSvc;
        this.cktSvc = cktSvc;
    }

    backToStore() {
        window.location.href = '';
    }

    // checkout the shopping cart.
   checkout(serviceName) {
        var merchantID;
        if (serviceName === 'PayPal') {
            merchantID = 'bernardo.castilho-facilitator@gmail.com';
        } else {
            throw 'Unknown checkout service: ' + serviceName;
        }
        this.cktSvc.checkout(serviceName, merchantID, this.pdtSvc.cartItems);
        this.pdtSvc.clearCart = true;
    };

    quantityChanged(item: any) {
        if (item.quantity > 0) {
            return;
        }
        var idx = this.pdtSvc.cartItems.indexOf(item);
        this.pdtSvc.cartItems.splice(idx,1);
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ShoppingCartCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule],
    declarations: [ShoppingCartCmp],
})
export class ShoppingCartModule {
}

