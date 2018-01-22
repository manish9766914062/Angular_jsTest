
import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcGauge from 'wijmo/wijmo.gauge';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {
    // nation data
    yrMin = 1800;
    yrMax = 2009;
    animLength = 15000; // 15s for the full animation
    animating = 0;
    data: wjcCore.CollectionView;

    private _year: number;
    @ViewChild('lineGauge') lineGauge: wjcGauge.LinearGauge;

    constructor() {  
        this._year = this.yrMin;    
        this.data = new wjcCore.CollectionView(null, {
            sortDescriptions: [
                new wjcCore.SortDescription('yearPopulation', false) // small countries above big ones
            ],
            filter: (item)=> { // filter out countries without enough data
                return item.population.length > 1 &&
                    item.income.length > 1 &&
                    item.lifeExpectancy.length > 1;
            }
        });  

        // https://bost.ocks.org/mike/nations/nations.json
        wjcCore.httpRequest('nations.json', {
            success: (xhr)=> {
                this.data.sourceCollection = JSON.parse(xhr.response);
                this.data.currentItem = null; // start with no selection
                this.toggleAnimation(); // start animation when data is loaded
            }
        });
    }

    get year(): number {
        return this._year;
    }
    set year(value: number) {
        this._year = value;
        this._updateData();
    }

    ngAfterViewInit() {
        if (this.lineGauge) {
            this.lineGauge.face.thickness = 0.08;
        }
    }
    toggleAnimation() {
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        } else {
            var min = (this.year < this.yrMax - 10) ? this.year : this.yrMin,
                max = this.yrMax,
                duration = this.animLength * (max - min) / (this.yrMax - this.yrMin);
            this.animating = wjcCore.animate((pct)=> {
                this.year = Math.round(min + (max - min) * pct);
                //this.$apply();
                if (pct == 1) {
                    this.animating = null;
                    //this.$apply();
                }
            }, duration);
        }
    }

    stopAnimation() {
        if (this.animating) {
            clearInterval(this.animating);
            this.animating = null;
        }
    }

    chartItemFormatter(engine, hitTestInfo, defaultFormat) {
        if (hitTestInfo.chartElement == wjcChart.ChartElement.SeriesSymbol) {
            var fill = 'black',
                stroke = 'black'
            switch (hitTestInfo.item.region) {
                case 'Sub-Saharan Africa':
                    fill = '#1F77B4';
                    break;
                case 'South Asia':
                    fill = '#FF7F0E';
                    break;
                case 'Middle East & North Africa':
                    fill = '#2CA02C';
                    break;
                case 'America':
                    fill = '#D62728';
                    break;
                case 'Europe & Central Asia':
                    fill = '#9467BD';
                    break;
                case 'East Asia & Pacific':
                    fill = '#8C564B';
                    break;
            }
            engine.fill = fill;
            engine.stroke = stroke;
            engine.strokeWidth = 1;
            defaultFormat();
        }
    }

    private _updateData() {
        var year = this.year;
        var items = this.data.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.yearIncome = this._interpolate(item.income, year);
            item.yearLifeExpectancy = this._interpolate(item.lifeExpectancy, year);
            var pop = this._interpolate(item.population, year);
            if (pop > 1000000) pop = Math.round(pop / 1000000) * 1000000;
            item.yearPopulation = pop;
        }
        this.data.refresh();
    }

    private _interpolate(arr: any, year: number):number {

        // binary search
        var min = 0, max = arr.length - 1, cur, item;
        while (min <= max) {
            cur = (min + max) >>> 1,
                item = arr[cur];
            if (item[0] > year) {
                max = cur - 1;
            } else if (item[0] < year) {
                min = cur + 1;
            } else {
                return item[1]; // found year, no need to interpolate
            }
        }
        // before the first/after the last
        if (min == 0) return arr[min][1];
        if (min == arr.length) return arr[max][1];

        // in range: interpolate
        var pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
        return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
    }
}


@NgModule({
    imports: [WjChartModule, WjGaugeModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);