

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
import { WjChartFinanceAnalyticsModule } from 'wijmo/wijmo.angular2.chart.finance.analytics';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//Overlays sample component
@Component({
    selector: 'overlays-cmp',
    templateUrl: 'src/components/analytics/OverlaysCmp.html',
})

export class OverlaysCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    overlays: any[];
    item: string;
    data: any[];
    title: string;
    selectedSymbol: string;
    selectedOverlay: string;
    properties: any;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.overlays = dataSvc.getOverlayList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.selectedOverlay = this.overlays[0].abbreviation;
        this.setDataSource();
        this.title = 'Overlays';
        this.properties = {
            // Bollinger Bands
            bollingerPeriod: 20,
            bollingerMultiplier: 2,

            // Moving Average Envelopes
            envelopePeriod: 20,
            envelopeType: 'Simple',
            envelopeSize: 0.03
        };
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }
    
    chartRendered() {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = this.tooltipSvc.getFinancialTooltip;
        }
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }

    bpChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.bollingerPeriod = input.value;
    };

    bmChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.bollingerMultiplier = input.value;
    };

    esChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.envelopeSize = input.value;
    };

    epChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.envelopePeriod = input.value;
    };
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: OverlaysCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        WjInputModule, WjChartFinanceModule, WjChartFinanceAnalyticsModule],
    declarations: [OverlaysCmp],
})
export class OverlaysModule {
}

