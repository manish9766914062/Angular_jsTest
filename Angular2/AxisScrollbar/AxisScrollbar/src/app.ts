import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { AxisScrollbar } from './AxisScrollbar';

import { DataSvc } from './services/DataSvc';

    'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {
    // generate some random data
    private data: any[];
    protected dataSvc: DataSvc;
    private axisXScrollbar;
    private axisYScrollbar;

    constructor(@Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getData();
    }

    chartRendered(chart: wjcChart.FlexChart) {
        // create Scrollbar
        if (!this.axisXScrollbar) {
            this.axisXScrollbar = new AxisScrollbar(chart.axes[0], {
                minScale: 0.02
            });
        }

        if (!this.axisYScrollbar) {
            this.axisYScrollbar = new AxisScrollbar(chart.axes[1], {
                buttonsVisible: false,
                minScale: 0.05
            });
        }
    }
}



@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartInteractionModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
