

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';

//RangeSelector sample component
@Component({
    selector: 'range-selector-cmp',
    templateUrl: 'src/components/RangeSelectorCmp.html'
})

export class RangeSelectorCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;
    @ViewChild('stChart') stChart: wjcChartFinance.FinancialChart;
    @ViewChild('rsChart') rsChart: wjcChartFinance.FinancialChart;
    @ViewChild('rangeSelector') rangeSelector: wjcChartInteraction.RangeSelector;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
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
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }
}
