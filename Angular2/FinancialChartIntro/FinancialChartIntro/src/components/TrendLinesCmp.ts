

import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';

//TrendLines sample component
@Component({
    selector: 'trend-lines-cmp',
    templateUrl: 'src/components/TrendLinesCmp.html'})

export class TrendLinesCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;
    movingAverageName: string;
    movingAveragePeriod: number;
    movingAverageType: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
        this.movingAveragePeriod = 2;
        this.movingAverageType = 'Simple';
        this.movingAverageName = 'Simple Moving Average';
    }

    changeType(maMenu) {
        this.movingAverageName = maMenu.selectedValue + ' Moving Average';
    }

    periodChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.movingAveragePeriod = input.value;
    };

    private setDataSource() {
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }
}
