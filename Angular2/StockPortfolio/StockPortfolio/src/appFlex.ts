
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { AppBaseCmp } from './appBase';

'use strict';

// The application root component.
@Component({
    selector: 'app-flex-cmp',
    templateUrl: 'src/appFlex.html'
})
export class AppFlexCmp extends AppBaseCmp{

    constructor() {
        super();
    }

}


@NgModule({
    imports: [WjInputModule, WjGridModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppFlexCmp],
    providers: [],
    bootstrap: [AppFlexCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);