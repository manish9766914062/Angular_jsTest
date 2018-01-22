

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { WjChartAnnotationModule } from 'wijmo/wijmo.angular2.chart.annotation';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//EventAnnotations sample component
@Component({
    selector: 'event-annotations-cmp',
    templateUrl: 'src/components/analytics/EventAnnotationsCmp.html',
})

export class EventAnnotationsCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    annotations: any[];
    selectedSymbol: string;
    title: string;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('selectorChart') selectorChart: wjcChartFinance.FinancialChart;
    @ViewChild('selector') selector: wjcChartInteraction.RangeSelector;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.annotations = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = 'box';
        this.setDataSource();
        this.title = 'Event Annotations';
        this.setAnnotations();
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }

    selectorChartRendered() {
        if (this.selector && this.selectorChart) {
            var range = this.dataSvc.findApproxRange(this.selectorChart.axisX.actualMin, this.selectorChart.axisX.actualMax, 0.45);
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

    private setAnnotations() {
        this.dataSvc.getData('box-annotations').subscribe(data => {
            var i, len = data.length;
            for (i = 0; i < len; i++) {
                data[i].tooltip = '<b>' + data[i].title + '</b>';
                if (data[i].description) {
                    data[i].tooltip += '<br>' + data[i].description;
                }
            }
            this.annotations = data;
        });
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: EventAnnotationsCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjChartFinanceModule, WjChartInteractionModule,
        WjChartAnnotationModule],
    declarations: [EventAnnotationsCmp],
})
export class EventAnnotationsModule {
}

