import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { FlexGridFilter } from './valuefilter/FlexGridFilter';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    data: wjcCore.CollectionView;
    countryMap: wjcGrid.DataMap;

    private _countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');

    constructor() {
        this.data = new wjcCore.CollectionView(this._createData());
        var map = [];
        for (var i = 0; i < this._countries.length; i++) {
            map.push({ key: i, val: this._countries[i] });
        }
        this.countryMap = new wjcGrid.DataMap(map, 'key', 'val');
    }
    
    initialized(flex: wjcGrid.FlexGrid) {
        var gridFilter = new FlexGridFilter(flex);
    }
    // create some data for the sample  
    private _createData(): any[] {
        // create some random data
        var countries = this._countries,
            data = [];
        for (var i = 0; i < 500; i++) {
            data.push({
                id: i,
                name: countries[i % countries.length],
                date: new Date(2015, i % 12, i % 25 + 1),
                time: new Date(2015, i % 12, i % 25 + 1, i % 24, i % 60, i % 60),
                country: countries[i % countries.length],
                countryMapped: i % countries.length,
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                checked: i % 9 == 0
            });
        }
        return data;
    }
}


@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);