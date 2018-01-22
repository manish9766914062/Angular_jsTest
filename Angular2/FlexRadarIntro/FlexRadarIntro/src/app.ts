import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
import * as wjcInput from 'wijmo/wijmo.input';





// Angular

import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartRadarModule } from 'wijmo/wijmo.angular2.chart.radar';
import { WjChartAnimationModule } from 'wijmo/wijmo.angular2.chart.animation';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {
    // generate some random data
    basicData: any[];
    basicChartType = 'Line';
    basicTotalAngle = 360;
    basicStartAngle = 0;
    basicStacking = 'None';
    basicReversed = false;
    basicPolarData: any[];
    polarChartType = 'Line';
    polarTotalAngle = 360;
    polarStartAngle = 0;
    polarStacking = 'None';
    polarReversed = false;

    animationData = [];
    duration = 400;
    easing = 'Swing';
    animationMode = 'Point';
    animationChartType = 'Line';
    animationBindingX = 'country';

    protected dataSvc: DataSvc;
    @ViewChild('animationChart') animationChart: wjcChartRadar.FlexRadar;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.basicData = this.dataSvc.getData();
        this.basicPolarData = this.dataSvc.getPolarData();
        this.animationData = this.dataSvc.getData();
    }

    basicStartAngleChanged = (sender: wjcInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.basicStartAngle = sender.value;
    };

    basicTotalAngleChanged = (sender: wjcInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.basicTotalAngle = sender.value;
    };

    polarStartAngleChanged = (sender: wjcInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.polarStartAngle = sender.value;
    };

    polarTotalAngleChanged = (sender: wjcInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.polarTotalAngle = sender.value;
    };

    durationChanged = (sender: wjcInput.InputNumber) => {
        if (sender.value < sender.min || sender.value > sender.max) {
            return;
        }
        this.duration = sender.value;
        if (this.animationChart) {
            this.animationChart.refresh();
        }
    };

    animationChanged = () => {
        if (this.animationChart) {
            // call with a delay to make sure that bindings have propagated to all components
            setTimeout(() => {
                this.animationChart.refresh();
            }, 0);
        }
    }

    isPolarChanged = (sender) => {
        var chart = this.animationChart,
            isPolar =  sender.checked;

        if (!chart) {
            return;
        }
        chart.beginUpdate();
        if (isPolar) {
            this.animationData = this.dataSvc.getPolarData();
            this.animationBindingX = 'longitude';
            chart.series[0].binding = 'latitude1';
            chart.series[0].name = 'Latitude1';
            chart.series[1].binding = 'latitude2';
            chart.series[1].name = 'Latitude2';
        } else {
            this.animationData = this.dataSvc.getData();
            this.animationBindingX = 'country';
            chart.series[0].binding = 'sales';
            chart.series[0].name = 'Sales';
            chart.series[1].binding = 'downloads';
            chart.series[1].name = 'Downloads';
        }
        chart.endUpdate();
    };
}


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartRadarModule, WjChartAnimationModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
