

import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// Chart Finance component
@Component({
    selector: 'chart-finance-cmp',
    templateUrl: 'src/components/chart/chartFinanceCmp.html'
})

export class ChartFinanceCmp {

    data: any[];
    customTooltip: Function;
    chartType = wjcChart.ChartType.Candlestick;

    constructor() {
        this.data = [];
        var start = new Date(99, 0, 1);
        for (var i = 0; i < 90; i++) {
            var q = {x:null, open:null, close:null,hi:null,lo:null};

            q.x = new Date(99, 0, i);

            if (i > 0)
                q.open = this.data[i - 1].close;
            else
                q.open = 1000;

            q.hi = q.open + Math.random() * 50;
            q.lo = q.open - Math.random() * 50;

            q.close = q.lo + Math.random() * (q.hi - q.lo);

            this.data.push(q);
        }
        this.customTooltip = this._customTooltip.bind(this);
    }

    private _customTooltip(ht: wjcChart.HitTestInfo) {
        return 'Date: ' + wjcCore.Globalize.format(ht.x, 'MMM-dd') + '<br/>' +
            'High: ' + ht.item.hi.toFixed() + '<br/>' +
            'Low: ' + ht.item.lo.toFixed() + '<br/>' +
            'Open: ' + ht.item.open.toFixed() + '<br/>' +
            'Close: ' + ht.item.close.toFixed();
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ChartFinanceCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjChartModule, WjInputModule],
    declarations: [ChartFinanceCmp],
})
export class ChartFinanceModule {
}

