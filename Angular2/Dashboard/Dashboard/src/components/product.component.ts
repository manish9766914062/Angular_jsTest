import { Component, Inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import * as wjCore from 'wijmo/wijmo';
import * as wjGrid from 'wijmo/wijmo.grid';
import { DataSvc } from '../services/DataSvc';
import { Product } from '../services/Product';
@Component({
    selector: '',
    templateUrl: './src/components/product.component.html'
})
export class ProductCmp implements AfterViewInit {
    route: ActivatedRoute;
    dataSvc: DataSvc;
    product: Product;
    productId: number;
    constructor( @Inject(ActivatedRoute) route: ActivatedRoute, @Inject(DataSvc) dataSvc: DataSvc) {
        this.route = route;
        this.dataSvc = dataSvc;
        this.route.params.subscribe(params => {
            this.productId = parseInt(params['id']);
        });
        dataSvc.loadingSucceed = () => {
            this.dataSvc.selectProduct(this.productId);
            this.product = this.dataSvc.product;
        };
    }

    ngAfterViewInit() {
        this.dataSvc.selectProduct(this.productId);
        this.product = this.dataSvc.product;
    }
}