import * as wjcCore from 'wijmo/wijmo';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
export declare class ProductsService {
    products: wjcCore.CollectionView;
    cartItems: any[];
    http: Http;
    clearCart: boolean;
    constructor(http: Http);
    getTotalPrice(sku: any): number;
    getTotalCount(sku: any): number;
    addCartItem(product: any, quantity: number): boolean;
    clearCartItem(sku: any): void;
    saveCartItems(): void;
    private toNumber(value);
    private getProductsWithPromise();
    private extractData(res);
    private loadCartItems();
}
