import * as wjcCore from 'wijmo/wijmo';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    data: wjcCore.CollectionView;
    flexWin95: null;
    flexWinMobile: null;
    flexWinPhone: null;

    constructor() {
        this.data = new wjcCore.CollectionView(this._getData(100));
    }

    iniFlexWin95(flexWin95: WjFlexGrid) {
        flexWin95.cells.rows.defaultSize = 17;
        flexWin95.columnHeaders.rows.defaultSize = 17;
    }

    iniFlexWMobile(flexWinMobile: WjFlexGrid) {
        flexWinMobile.cells.rows.defaultSize = 15;
        flexWinMobile.columnHeaders.rows.defaultSize = 15;
        flexWinMobile.cells.columns.minSize = 50;
        flexWinMobile.autoSizeColumns();
    }

    // create some data for the sample  
    private _getData(count) {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = new wjcCore.ObservableArray();
        for (var i = 0; i < count; i++) {
            data.push({
                Id: i,
                Country: countries[i % countries.length],
                Date: new Date(2014, i % 12, i % 28),
                Amount: Math.random() * 10000
            });
        }
        return data;
    }
}


@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);