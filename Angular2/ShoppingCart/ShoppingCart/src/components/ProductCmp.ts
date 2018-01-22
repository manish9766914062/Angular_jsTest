
'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { ProductsService } from '../services/ProductsService';

@Component({
    selector: 'product-cmp',
    templateUrl: 'src/components/productCmp.html',
})

export class ProductCmp {

    pdtSvc: ProductsService;

    private _router: Router;
    private _dvaCaption = [
        'Negligible',
        'Low',
        'Average',
        'Good',
        'Great'
    ];
    private _dvaRange = [
        'below 5%',
        'between 5 and 10%',
        'between 10 and 20%',
        'between 20 and 40%',
        'above 40%'
    ];

    constructor( @Inject(ProductsService) pdtSvc: ProductsService, @Inject(Router) router: Router) {
        this._router = router;
        this.pdtSvc = pdtSvc;
    }

    backToStore() {
        window.location.href = '';
    }

    // Get the caption of the nutrients
    getDvaCaption(idx: number): any {
        if (idx < this._dvaCaption.length) {
            return this._dvaCaption[idx];
        } else {
            return undefined;
        }
    }

    // Get the range discription of the nutrients
    getDvaRange(idx: number): any {
        if (idx < this._dvaRange.length) {
            return this._dvaRange[idx];
        } else {
            return undefined;
        }
    }

    getNutrientsKeys(): string[] {
        return Object.keys(this.pdtSvc.products.currentItem.nutrients);
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ProductCmp }
]);

@NgModule({
    imports: [CommonModule, WjGaugeModule, FormsModule, routing],
    declarations: [ProductCmp],
})
export class ProductModule {
}

