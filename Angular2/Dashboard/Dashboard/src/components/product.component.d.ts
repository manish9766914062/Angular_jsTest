import { AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSvc } from '../services/DataSvc';
import { Product } from '../services/Product';
export declare class ProductCmp implements AfterViewInit {
    route: ActivatedRoute;
    dataSvc: DataSvc;
    product: Product;
    productId: number;
    constructor(route: ActivatedRoute, dataSvc: DataSvc);
    ngAfterViewInit(): void;
}
