

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//EquiVolume sample component
@Component({
    selector: 'equi-volume-cmp',
    templateUrl: 'src/components/charttype/EquiVolumeCmp.html',
})

export class EquiVolumeCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    title: string;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('selectorChart') selectorChart: wjcChartFinance.FinancialChart;
    @ViewChild('selector') selector: wjcChartInteraction.RangeSelector;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.title = 'EquiVolume';
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }

    selectorChartRendered() {
        if (this.selector && this.selectorChart) {
            var range = this.dataSvc.findApproxRange(this.selectorChart.axisX.actualMin, this.selectorChart.axisX.actualMax);
            if (isNaN(range.max) || isNaN(range.min)) {
                return;
            }
            this.selector.max = range.max;
            this.selector.min = range.min;
        }
    }

    chartRendered() {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = this.tooltipSvc.getFinancialTooltip;
        }
    }

    rangeChanged() {
        var chart = this.chart,
            selector = this.selector,
            yRange;

        if (!chart || !selector) {
            return;
        }
        // find visible y-range
        yRange = this.dataSvc.findRenderedYRange(this.data, selector.min, selector.max);

        // update main chart's x & y range
        chart.axisX.min = selector.min;
        chart.axisX.max = selector.max;
        chart.axisY.min = yRange.min;
        chart.axisY.max = yRange.max;

        chart.invalidate();
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: EquiVolumeCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule, WjChartFinanceModule, WjChartInteractionModule],
    declarations: [EquiVolumeCmp],
})
export class EquiVolumeModule {
}

