import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { ColumnPicker } from './components/ColumnPickerDctv';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {

    data: any[];
    constructor() {
        this.data = this.getData(100);
    }   

    // some random data
    private getData(count) {
    var data = [],
        countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
        products = ['Widget', 'Gadget', 'Doohickey'],
        colors = ['Black', 'White', 'Red', 'Green', 'Blue'],
        dt = new Date();
    for (var i = 0; i < count; i++) {
        var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
            countryId = Math.floor(Math.random() * countries.length),
            productId = Math.floor(Math.random() * products.length),
            colorId = Math.floor(Math.random() * colors.length);
        var item = {
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            countryId: countryId,
            productId: productId,
            colorId: colorId,
            amount: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0,
        };
        data.push(item);
    }
    return data;
}
}

@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [ColumnPicker,AppCmp],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
