

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

//MovingAverages sample component
@Component({
    selector: 'moving-averages-cmp',
    templateUrl: 'src/components/analytics/MovingAveragesCmp.html',
})

export class MovingAveragesCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    title: string;
    shortProps: any;
    longProps: any;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = 'fb';
        this.setDataSource();
        this.title = 'Moving Averages';
        this.shortProps = {
            period: 50,
            type: 'Simple',
            name: ' Day MA'
        };
        this.longProps = {
            period: 200,
            type: 'Simple',
            name: ' Day MA'
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

    shortPeriodChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.shortProps.period = input.value;
    };

    longPeriodChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.longProps.period = input.value;
    };
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: MovingAveragesCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        WjInputModule, WjChartFinanceModule, WjChartAnalyticsModule],
    declarations: [MovingAveragesCmp],
})
export class MovingAveragesModule {
}

