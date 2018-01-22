

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartAnimation from 'wijmo/wijmo.chart.animation';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';

//Animation sample component
@Component({
    selector: 'animation-cmp',
    templateUrl: 'src/components/AnimationCmp.html'
})

export class AnimationCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;
    footer: string;
    chartType: string;
    easing: string;
    duration: number;
    bindingY: string;
    bindingYs: any;
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('animation') animation: wjcChartAnimation.ChartAnimation;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
        this.footer = 'Click on chart to refresh';
        this.chartType = 'Line';
        this.easing = 'Swing';
        this.duration = 400;
        this.bindingY = 'close';
        this.bindingYs = {
            Column: 'close',
            Line: 'close',
            Area: 'close',
            Candlestick: 'high,low,open,close',
            HighLowOpenClose: 'high,low,open,close'
        };
    }

    private setDataSource() {
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }

    ngAfterViewInit() {
        this.chart.tooltip.content = ht => {
            var dateStr = 'Date: ' + ht.x + '<br/>',
                hlocStr = 'Open: ' + wjcCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + wjcCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + wjcCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2') + '<br/>',
                closeStr = 'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2'),
                volStr = 'Volume: ' + wjcCore.Globalize.format(ht.item.volume, 'n0'),
                toolTipStr;
            switch (this.chartType) {
                case 'Line':
                case 'Column':
                    toolTipStr = dateStr + closeStr;
                    break;
                default:
                    toolTipStr = dateStr + hlocStr;
                    break;
            }
            return toolTipStr;
        };

        this.chart.hostElement.addEventListener('click', () => {
            this.refreshChart();
        });
    }

    typeChanged(menu) {
        var chartType = menu.selectedValue;
        this.bindingY = this.bindingYs[chartType];
    }

    refreshChart() {
        if (this.chart) {
            // call with a delay to make sure that bindings have propagated to all components
            setTimeout(() => {
                this.chart.invalidate(true);
            }, 0);
        }
    }

    durationChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.duration = input.value;
    };
}
