import * as wjcChart from 'wijmo/wijmo.chart';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { ChartMultiSelectSvc } from './services/ChartMultiSelectSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    data: any[];
    items = [];
    chartType = 'Column';
    cmsv: ChartMultiSelectSvc;
    @ViewChild('flexChart') flexChart: wjcChart.FlexChart;

    constructor( @Inject(ChartMultiSelectSvc) cmsv: ChartMultiSelectSvc) {
        this.data = this._createData(100, 900);
        this.cmsv = cmsv;
    }

    chartRendered() {
        var chart = this.flexChart; // internal

        if (!chart) {
            return;
        }

        this.cmsv.initChartMultiSelect(chart, this.items);
    }
    // select all values/elements under 500
    selectValuesUnder500() {
        this.cmsv.selectValuesUnder500();
    }

    // clear selection for button click
    clear() {
        this.cmsv.clearSelection();

        // update length for view
        this.items.length = 0;
    }

    private _createData(rows: number, cols: number): any[] {
        var countries = ['Brazil', 'Canada', 'France', 'Germany', 'USA'],
            item = null,
            data = [];

        for (var i = 0; i < countries.length; i++) {
            item = {
                country: countries[i],
                sales: Math.random() * 1000,
                downloads: Math.random() * 1000
            };

            data.push(item);
        }

        return data;
    }

}


@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [ChartMultiSelectSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);