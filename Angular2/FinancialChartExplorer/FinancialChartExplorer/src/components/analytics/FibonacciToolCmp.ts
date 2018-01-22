

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import * as wjcChart from 'wijmo/wijmo.chart';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { WjChartAnnotationModule } from 'wijmo/wijmo.angular2.chart.annotation';
import { WjChartFinanceAnalyticsModule } from 'wijmo/wijmo.angular2.chart.finance.analytics';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//FibonacciTool sample component
@Component({
    selector: 'fibonacci-tool-cmp',
        templateUrl: 'src/components/analytics/FibonacciToolCmp.html',
})

export class FibonacciToolCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    title: string;
    selectedFib: string;
    properties: any;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('selector') selector: wjcChartInteraction.RangeSelector;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.selectedFib = 'retracements';
        this.setDataSource();
        this.title = 'Fibonacci Tool';
        this.properties = {
            retracements: {
                labelPosition: 'Left',
                uptrend: true,
                selectorVisible: false
            },
            arcs: {
                labelPosition: 'Top',
                start: new wjcChart.DataPoint(46, 19.75),
                end: new wjcChart.DataPoint(54, 17.1)

            },
            fans: {
                labelPosition: 'Top',
                start: new wjcChart.DataPoint(10, 18.12),
                end: new wjcChart.DataPoint(32, 20.53)
            },
            timeZones: {
                labelPosition: 'Right',
                start: 0,
                end: 3
            }
        };
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }

    rangeChanged() {
        var chart = this.chart;
        if (chart) {
            chart.beginUpdate();
            chart.series[1].maxX = this.selector.max;
            chart.series[1].minX = this.selector.min;
            chart.endUpdate();
        }
    }

    valueChanged() {
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    fibTypeClicked(type) {
        // ensure range selector is hidden
        if (type.selectedIndex !== 2) {
            this.properties.retracements.selectorVisible = false;
        }
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: FibonacciToolCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        WjInputModule, WjChartFinanceModule, WjChartInteractionModule, WjChartAnnotationModule,
        WjChartFinanceAnalyticsModule],
    declarations: [FibonacciToolCmp],
})
export class FibonacciToolModule {
}

