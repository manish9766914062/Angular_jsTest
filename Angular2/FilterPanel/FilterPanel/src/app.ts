import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as wjInput from 'wijmo/wijmo.angular2.input';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjFilterPanel } from './components/WjFilterPanel';

'use strict';

// The FilterPanel application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    data: any[];
    constructor() {
        this.initData();
    }

    private initData() {
        var countries = 'Spain,Portugal,England,France,Ireland'.split(',');
        this.data = [];
        for (var i = 0; i < 100; i++) {
            this.data.push({
                id: i,
                active: i % 2 == 0,
                country: countries[i % countries.length],
                name: 'Item ' + i,
                date: new Date(),
            });
        }
    }
}

@NgModule({
    imports: [WjGridModule, WjGridFilterModule, BrowserModule],
    declarations: [WjFilterPanel, AppCmp],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);