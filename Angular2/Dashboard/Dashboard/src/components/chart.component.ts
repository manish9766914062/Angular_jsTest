import { Component, Inject } from '@angular/core';

import * as wjCore from 'wijmo/wijmo';
import * as wjOData from 'wijmo/wijmo.odata';
import * as wjGrid from 'wijmo/wijmo.grid';
import { DataSvc } from '../services/DataSvc';
@Component({
    selector: '',
    templateUrl: './src/components/chart.component.html'
})
export class ChartCmp {
    chartData = [];
    qThis: string;
    chartType = 'Column';
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.qThis = dataSvc.qThis;
        this.chartData = dataSvc.chartData;
        if (this.chartData.length === 0) {
            dataSvc.loadingSucceed = () => {
                this.chartData = dataSvc.chartData;
            };
        }
    }

    // set current chart type
    setChartType(chartType: string) {
        this.chartType = chartType;
    }
}