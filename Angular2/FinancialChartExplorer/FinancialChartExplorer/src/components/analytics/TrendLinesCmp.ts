

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartAnalyticsModule } from 'wijmo/wijmo.angular2.chart.analytics';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//TrendLines sample component
@Component({
    selector: 'trend-line-cmp',
    templateUrl: 'src/components/analytics/TrendLinesCmp.html',
})

export class TrendLinesCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    title: string;
    properties: any;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.title = 'Trend Lines';
        this.properties = {
            fitType: 'Linear',
            order: 2,
            sampleCount: 150
        };
    }

    chartRendered() {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = this.tooltipSvc.getTooltip;
        }
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }

    orderChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.order = input.value;
    };

    sampleCountChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.sampleCount = input.value;
    };
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: TrendLinesCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        WjInputModule, WjChartFinanceModule, WjChartAnalyticsModule],
    declarations: [TrendLinesCmp],
})
export class TrendLinesModule {
}

