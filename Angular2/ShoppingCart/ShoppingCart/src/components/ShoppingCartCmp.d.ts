import { Router } from '@angular/router';
import { ProductsService } from '../services/ProductsService';
import { CheckoutService } from '../services/CheckoutService';
export declare class ShoppingCartCmp {
    private _router;
    pdtSvc: ProductsService;
    cktSvc: CheckoutService;
    constructor(pdtSvc: ProductsService, cktSvc: CheckoutService, router: Router);
    backToStore(): void;
    checkout(serviceName: any): void;
    quantityChanged(item: any): void;
}
export declare class ShoppingCartModule {
}
