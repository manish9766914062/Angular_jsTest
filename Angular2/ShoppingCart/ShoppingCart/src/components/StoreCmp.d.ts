import * as wjcCore from 'wijmo/wijmo';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/ProductsService';
export declare class StoreCmp implements OnInit {
    pdtSvc: ProductsService;
    products: wjcCore.CollectionView;
    toFilter: number;
    private _filter;
    private _filterFunction;
    private _router;
    constructor(pdtSvc: ProductsService, router: Router);
    ngOnInit(): void;
    filter: string;
    private filterFunction(item);
}
export declare class StoreModule {
}
