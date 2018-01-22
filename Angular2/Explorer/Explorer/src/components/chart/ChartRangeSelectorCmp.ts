

import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcCore from 'wijmo/wijmo';



'use strict';


import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { DataSvc } from '../../services/DataSvc';

// Chart rangeSelector component
@Component({
    selector: 'chart-range-selector-cmp',
    templateUrl: 'src/components/chart/chartRangeSelectorCmp.html'
})

export class ChartRangeSelectorCmp  {

    data: any[];
    header: string;
    @ViewChild('stChart') stChart: wjcChart.FlexChart;
    @ViewChild('rsChart') rsChart: wjcChart.FlexChart;
    @ViewChild('rangeSelector') rangeSelector: wjcChartInteraction.RangeSelector;

    private dataSvc: DataSvc;

    constructor( @Inject(DataSvc) dataSvc: DataSvc ) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
    }

    stRendered() {
        var stChart = this.stChart;

        if (!stChart) {
            return;
        }
        stChart.axisX.labels = false;
        stChart.axisX.axisLine = false;
        stChart.legend.position = 0;
        stChart.plotMargin = '60 30 0 50';

        stChart.tooltip.content = function (ht) {
            return 'Date: ' + ht.x + '<br/>' +
                'Open: ' + wjcCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                'High: ' + wjcCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                'Low: ' + wjcCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                'Volume: ' + wjcCore.Globalize.format(ht.item.volume, 'n0');
        };
    }

    rsRendered() {
        var rsChart = this.rsChart;

        if (!rsChart) {
            return;
        }
        rsChart.axisY.labels = false;
        rsChart.axisY.majorGrid = false;
        rsChart.tooltip.content = '';
        rsChart.plotMargin = '0 30 NaN 50';
    }

    rangeChanged() {
        if (this.stChart && this.rangeSelector) {
            this.stChart.axisX.min = this.rangeSelector.min;
            this.stChart.axisX.max = this.rangeSelector.max;
            this.stChart.invalidate();
        }
    }

    private setDataSource() {
        this.data = this.dataSvc.getChartData();
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ChartRangeSelectorCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjChartModule, WjInputModule, WjChartInteractionModule],
    declarations: [ChartRangeSelectorCmp],
})
export class ChartRangeSelectorModule {
}
