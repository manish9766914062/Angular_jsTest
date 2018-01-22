import * as wjcCore from 'wijmo/wijmo';
'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit, OnInit } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../services/ProductsService';
//EventAnnotations sample component
@Component({
    selector: 'store-cmp',
    templateUrl: 'src/components/storeCmp.html',
})

export class StoreCmp implements OnInit {

    pdtSvc: ProductsService;
    products: wjcCore.CollectionView;
    toFilter: number;

    private _filter: string;
    private _filterFunction: any;
    private _router: Router;

    constructor( @Inject(ProductsService) pdtSvc: ProductsService, @Inject(Router) router: Router) {
        this._router = router;
        this.pdtSvc = pdtSvc;
        this._filterFunction = this.filterFunction.bind(this);
    }

    // log in or out using Firebase user authorization object
    ngOnInit(): void {
        this.products = this.pdtSvc.products;
    }

    get filter(): string {
        return this._filter;
    }
    set filter(value: string) {
        this._filter = value;
        if (this.toFilter) {
            clearTimeout(this.toFilter);
        }
        this.toFilter = setTimeout(() => {
            this.toFilter = null;
            var cv = this.products;
            if (cv) {
                if (cv.filter != this._filterFunction) {
                    cv.filter = this._filterFunction;
                } else {
                    cv.refresh();
                }
            }
        }, 500);
    }

    // define filter function for collectionview
    private filterFunction(item) {
        var filter = this._filter;

        if (filter && item) {
            var value = item['name'];
            if (wjcCore.isString(value) && value.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                return true;
            }
            return false;
        }

        return true;
    };
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: StoreCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing],
    declarations: [StoreCmp],
})
export class StoreModule {
}

