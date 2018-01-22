import * as wjcCore from 'wijmo/wijmo';
import * as wjcOlap from 'wijmo/wijmo.olap';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule, WjPivotPanel } from 'wijmo/wijmo.angular2.olap';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';


'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {

    ng: wjcOlap.PivotEngine;
    data = [];
    constructor() {

        // remove space from percentage values
        wjcCore.culture.Globalize.numberFormat.percent.pattern = ['-n%', 'n%'];

        // create raw data set
        this.initData();

        // create pivot view
        this.initEngine();
    }

    private initData() {
        var countries = 'Spain,Russia,Austria,Denmark,Germany'.split(','),
            colors = 'Red,Green,Blue'.split(','),
            products = 'Banana,Apple'.split(',');
        for (var i = 0; i <= 25; i++) {
            this.data.push({
                id: i,
                country: countries[i % countries.length],
                color: colors[i % colors.length],
                product: products[i % products.length],
                sales: 10 * i + 100,
                expenses: 5 * i + 30
            });
        }
    }

    private initEngine() {
        this.ng = new wjcOlap.PivotEngine({
            autoGenerateFields: false,
            itemsSource: this.data,
            showColumnTotals: wjcOlap.ShowTotals.Subtotals,
            showRowTotals: wjcOlap.ShowTotals.Subtotals,
            fields: [
                { binding: 'country', header: 'Country' },
                { binding: 'color', header: 'Color' },
                { binding: 'product', header: 'Product' },
                { binding: 'sales', header: 'Sales' },

                { binding: 'sales', header: 'DiffRow', showAs: 'DiffRow' },
                { binding: 'sales', header: 'DiffRowPct', showAs: 'DiffRowPct', format: 'p2' },
                { binding: 'sales', header: 'DiffCol', showAs: 'DiffCol' },
                { binding: 'sales', header: 'DiffColPct', showAs: 'DiffColPct', format: 'p2' },

                { binding: 'sales', header: 'PctGrand', showAs: 'PctGrand', format: 'p2' },
                { binding: 'sales', header: 'PctRow', showAs: 'PctRow', format: 'p2' },
                { binding: 'sales', header: 'PctCol', showAs: 'PctCol', format: 'p2' },
                { binding: 'sales', header: 'RunTot', showAs: 'RunTot' },
                { binding: 'sales', header: 'RunTotPct', showAs: 'RunTotPct', format: 'p2' },
            ],
            rowFields: ['Country', 'Color'],
            columnFields: ['Product'],
            valueFields: [
                'Sales',
                'PctGrand', 'PctCol', 'PctRow', 'RunTot', 'RunTotPct',
                'DiffRow', 'DiffRowPct', 'DiffCol', 'DiffColPct'
            ]
        });
    }
}


@NgModule({
    imports: [WjInputModule, WjOlapModule, WjGridModule, WjGridFilterModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
