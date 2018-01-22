'use strict';
import * as wjcCore from 'wijmo/wijmo';
import { Component, EventEmitter, enableProdMode, NgModule, ViewChild, Inject } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjInputModule, WjPopup } from 'wijmo/wijmo.angular2.input';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataTransfer,DragDropTouch } from './DragDropTouch';
//import { ColumnPicker } from './ColumnPicker';
import { WjColumnPicker } from './components/WjColumnPicker';
//// AppCmp  component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    // expose some data
    data: any;
    @ViewChild('picker') picker: WjColumnPicker;
    @ViewChild('dlgColumns') dlgColumns: WjPopup;
    @ViewChild('flex') flex: WjFlexGrid;

    constructor() {
        this.data = this._getData(200);
    }

    // show column picker for the grid
    pickColumns() {

        // show column picker in a dialog
        this.picker.load();
        this.dlgColumns.show(true, (s: any) => {
            var dr = s.dialogResult;
            if (dr && dr.indexOf('apply') > -1) {
                this.picker.save();
            }
        });
    }

    // some random data
    private _getData(count: number): any {
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
    imports: [BrowserModule, WjCoreModule, WjGridModule, WjInputModule],
    declarations: [WjColumnPicker,AppCmp],
    providers: [DataTransfer, DragDropTouch],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application
platformBrowserDynamic().bootstrapModule(AppModule);