import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcChart from 'wijmo/wijmo.chart';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartInteractionModule, WjFlexChartRangeSelector } from 'wijmo/wijmo.angular2.chart.interaction';
import { AggregateSeries } from './AggregateSeries';


    'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp implements AfterViewInit {
    // generate some random data
    data: any[];
    chartType = 'LineSymbols';
    aggType = 'Avg';
    interval = 'WW';
    autoInterval = true;
    customTooltip: Function;
    @ViewChild('chart') chart: wjcChart.FlexChart;

    private aggSeries;
    private _bindings = {
        Column: 'close',
        LineSymbols: 'close',
        Candlestick: 'high,low,open,close'
    };

    constructor() {
        wjcCore.httpRequest('data/msft.json', {
            success: (xhr) => {
               let data = JSON.parse(xhr.response, (key, value) => {
                    if (key === 'date') {
                        value = new Date(value);
                    }
                    return value;

                });
               this.data = data;
            }
           
        });
        this.customTooltip = this._customTooltip.bind(this);
    }

    ngAfterViewInit() {
        this.aggSeries = new AggregateSeries();
        let series = this.aggSeries;
        this.chart.beginUpdate();
        series.itemsSource = this.data;
        series.chartType = wjcChart.ChartType[this.chartType];
        series.binding = this._bindings[this.chartType];
        series.bindingX = 'date';
        series.groupAggregate = wjcCore.Aggregate[this.aggType];
        series.autoGroupIntervals = ["DD", "WW", "MM", "YYYY"];
        series.autoInterval = true;
        this.chart.series.push(series);
        this.chart.endUpdate();
    }

    // set aggregate type
    aggTypeChanged() {
        this.aggSeries.groupAggregate = wjcCore.Aggregate[this.aggType];
    }

    // set chart type
    chartTypeChanged() {
        this.chart.beginUpdate();
        this.chart.chartType = wjcChart.ChartType[this.chartType];
        this.chart.binding = this._bindings[this.chartType];
        this.aggSeries.chartType = wjcChart.ChartType[this.chartType];
        this.aggSeries.binding = this._bindings[this.chartType];
        this.chart.endUpdate();
    }

    // set interval   
    intervalChanged() {
        this.aggSeries.groupInterval = this.interval;
    }

    // set AutoInterval  
    setAutoInterval() {
        this.aggSeries.autoInterval = this.autoInterval;
    }

    rangeChanged(sender: WjFlexChartRangeSelector) {
        this.chart.beginUpdate();
        this.chart.axisX.min = sender.min;
        this.chart.axisX.max = sender.max;
        this.chart.endUpdate();
    }

    private _customTooltip(ht: wjcChart.HitTestInfo) {
        if (!ht) {
            return '';
        } else if (this.chartType === 'Candlestick' && ht.item && ht.x) {
            return '<b>Date:</b> ' + wjcCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                '<b>High:</b> ' + ht.item.high.toFixed(2) + '<br>' +
                '<b>Low:</b> ' + ht.item.low.toFixed(2) + '<br>' +
                '<b>Open:</b> ' + ht.item.open.toFixed(2) + '<br>' +
                '<b>Close:</b> ' + ht.item.close.toFixed(2);
        } else if (ht.x && ht.y) {
            return '<b>Date:</b> ' + wjcCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                '<b>Value:</b> ' + ht.y.toFixed(2);
        }
    }
}



@NgModule({
    imports: [WjCoreModule, WjInputModule, WjChartModule, WjChartInteractionModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
