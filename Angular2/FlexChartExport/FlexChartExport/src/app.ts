import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule, WjFlexChart } from 'wijmo/wijmo.angular2.chart';
import 'wijmo/wijmo.chart.render';


'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    cv: wjcCore.CollectionView;
    exportType: string;
    chartType: string;
    constructor() {
        let data = [],
            names = ['Oranges', 'Apples', 'Pears', 'Bananas', 'Pineapples'];
        for (let i = 0; i < names.length; i++) {
            data.push({
                name: names[i],
                mar: Math.random() * 3,
                apr: Math.random() * 10,
                may: Math.random() * 5
            });
        }
        this.cv = new wjcCore.CollectionView(data);
        this.chartType = 'Column';
        this.exportType = '';
    }

    itemClicked(chart: WjFlexChart) {
        if (chart == null) {
            return;
        }
        chart.saveImageToFile('chart.' + this.exportType || 'png');
    };
}


@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);