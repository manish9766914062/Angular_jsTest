import * as wjcCore from 'wijmo/wijmo';
import * as wjcChartAnalytics from 'wijmo/wijmo.chart.analytics';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';

'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
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
    selector: 'box-whisker-cmp',
    templateUrl: 'src/components/BoxWhiskerCmp.html'
})

export class BoxWhiskerCmp implements AfterViewInit {
    itemsSource: wjcCore.ObservableArray;
    title: string;
    rotated: boolean;
    groupWidth: number;
    gapWidth: number;
    quartileCalculation: wjcChartAnalytics.QuartileCalculation;
    showMeanLine: boolean;
    showMeanMarker: boolean;
    showInnerpoints: boolean;
    showOutliers: boolean;
    showLabel: boolean;

    // references control in the view
    @ViewChild('boxwhisker') boxwhisker: wjcChartAnalytics.BoxWhisker;
    @ViewChild('boxwhisker2') boxwhisker2: wjcChartAnalytics.BoxWhisker;
    @ViewChild('boxwhisker3') boxwhisker3: wjcChartAnalytics.BoxWhisker;
    @ViewChild('boxwhiskerChart') boxwhiskerChart: wjcChart.FlexChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.itemsSource = dataSvc.getBoxData();
        this.title = 'Box & Whisker';
        this.rotated = false;
        this.groupWidth = 0.8;
        this.gapWidth = 0.1;
        this.quartileCalculation = wjcChartAnalytics.QuartileCalculation.InclusiveMedian;
        this.showMeanLine = false;
        this.showMeanMarker = false;
        this.showInnerpoints = false;
        this.showOutliers = false;
        this.showLabel = false;
    }

    groupWidthChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.groupWidth = input.value;
    };

    gapWidthChanged = (input: wjcInput.InputNumber) => {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.gapWidth = input.value;
    };

    showLabelChanged = (input: HTMLInputElement) => {
        this.boxwhiskerChart.dataLabel.content = input.checked ? '{y}' : '';
    }

    ngAfterViewInit() {
        this.boxwhiskerChart.tooltip.content = function (hti) {
            if (hti) {
                return '<b>' + hti.name + '</b> - <b>' + hti.x + '</b></br>' +
                    '<b>min</b>: ' + hti.item.min + '</br>' +
                    '<b>firstQuartile</b>: ' + hti.item.firstQuartile + '</br>' +
                    '<b>median</b>: ' + hti.item.median + '</br>' +
                    '<b>thirdQuartile</b>: ' + hti.item.thirdQuartile + '</br>' +
                    '<b>max</b>: ' + hti.item.max + '</br>' +
                    '<b>mean</b>: ' + hti.item.mean + '</br>';
            }
        }
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: BoxWhiskerCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjChartModule, WjChartAnalyticsModule, WjInputModule],
    declarations: [BoxWhiskerCmp],
})
export class BoxWhiskerModule {
}
