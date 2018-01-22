import * as wjcCore from 'wijmo/wijmo';
import * as wjcChartAnalytics from 'wijmo/wijmo.chart.analytics';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';

'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartAnalyticsModule } from 'wijmo/wijmo.angular2.chart.analytics';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

import { DataSvc } from './../services/DataSvc';

//Box & Whisker sample component
@Component({
    selector: 'error-bar-cmp',
    templateUrl: 'src/components/ErrorBarCmp.html'
})

export class ErrorBarCmp {
    itemsSource: wjcCore.ObservableArray;
    title: string;
    rotated: boolean;
    chartType: wjcChart.ChartType;
    errorAmount: wjcChartAnalytics.ErrorAmount;
    endStyle: wjcChartAnalytics.ErrorBarEndStyle;
    direction: wjcChartAnalytics.ErrorBarDirection;
    value: any;

    // references control in the view
    @ViewChild('errorbar') errorbar: wjcChartAnalytics.ErrorBar;
    @ViewChild('errorbarChart') errorbarChart: wjcChart.FlexChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.itemsSource = dataSvc.getErrorBarData();
        this.title = 'ErrorBar';
        this.rotated = false;
        this.chartType = wjcChart.ChartType.Column;
        this.errorAmount = wjcChartAnalytics.ErrorAmount.FixedValue;
        this.endStyle = wjcChartAnalytics.ErrorBarEndStyle.Cap;
        this.direction = wjcChartAnalytics.ErrorBarDirection.Both;
        this.value = 10;
    }

    errorAmountChanged(menu: wjcInput.Menu) {
        var val = menu.selectedValue;
        switch (val) {
            case 'FixedValue':
                this.value = 10;
                break;
            case 'Percentage':
                this.value = 0.1;
                break;
            case 'StandardDeviation':
                this.value = 1;
                break;
            case 'Custom':
                this.value = {
                    minus: 5,
                    plus: 10
                };
                break;
        }
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ErrorBarCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjChartModule, WjChartAnalyticsModule, WjInputModule],
    declarations: [ErrorBarCmp],
})
export class ErrorBarModule {
}
