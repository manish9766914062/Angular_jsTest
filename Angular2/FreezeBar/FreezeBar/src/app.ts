import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { FreezeBarSvc } from './services/FreezeBarSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    data: any[];

    private _freezeBarSvc: FreezeBarSvc;
    constructor( @Inject(FreezeBarSvc) freezeBarSvc: FreezeBarSvc) {
        this._freezeBarSvc = freezeBarSvc;
        this.data = this._createData(100, 900);
    }

    initGrid(flex: wjcGrid.FlexGrid) {
        setTimeout(() => {
            this._freezeBarSvc.addFreezeBar(flex);
        }, 100);
    }

    // create some data for the sample  
    private _createData(rows, cols): any[] {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (var i = 0; i < 100; i++) {
            data.push({
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }

        return data;
    }    
}


@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [FreezeBarSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);