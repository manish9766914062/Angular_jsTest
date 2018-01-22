import { Router } from '@angular/router';
import { ProductsService } from '../services/ProductsService';
export declare class ProductCmp {
    pdtSvc: ProductsService;
    private _router;
    private _dvaCaption;
    private _dvaRange;
    constructor(pdtSvc: ProductsService, router: Router);
    backToStore(): void;
    getDvaCaption(idx: number): any;
    getDvaRange(idx: number): any;
    getNutrientsKeys(): string[];
}
export declare class ProductModule {
}
