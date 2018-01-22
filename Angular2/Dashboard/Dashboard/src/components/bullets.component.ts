import { Component, EventEmitter, Inject, NgModule } from '@angular/core';
import { DataSvc } from '../services/DataSvc';

@Component({
    selector: '',
    templateUrl: './src/components/bullets.component.html'
})
export class BulletsCmp {
    products = [];
    qPrev: string;
    qThis: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.products = dataSvc.products;
        this.qPrev = dataSvc.qPrev;
        this.qThis = dataSvc.qThis;
    }
}