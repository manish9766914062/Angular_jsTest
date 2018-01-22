'use strict';

import { Injectable, Inject } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';
import { Product } from './Product';
// Common data service
@Injectable()
export class DataSvc {

    products = [];
    chartData = [];;
    loading = true;
    error: string
    qStart: string;
    qPrev = Product.getQuarter(true);
    qThis= Product.getQuarter(false);
    product: any;
    loadingSucceed: Function;;

    selectProduct(id:number) {
        for (var i = 0; i < this.products.length; i++) {
            var p = this.products[i];
            if (p.id == id) {
                this.product = p;
                break;
            }
        }
    }
}