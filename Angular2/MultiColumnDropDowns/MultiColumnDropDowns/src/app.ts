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

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

   items = 'Apple,Apricot,Banana,Blueberry,Cherry,Coconut,Grape,Grapefruit,Lemon,Lime,Mango,Melon,Nectarine,Orange,Peach,Pineapple,Plum,Pomegranate,Raspberry,Tangerine,Watermelon'.split(',');
   data = [
        { id: 1, fruit: this.items[0], qty: 12 },
        { id: 2, fruit: this.items[2], qty: 13 },
        { id: 3, fruit: this.items[3], qty: 16 },
        { id: 4, fruit: this.items[4], qty: 17 },
    ]

    constructor() {
        
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