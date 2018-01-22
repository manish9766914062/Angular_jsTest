import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule} from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Router } from '@angular/router';
import { routes, routing } from './app.routing';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { ProductsService } from './services/ProductsService';
import { CheckoutService } from './services/CheckoutService';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp{

    private _pdtSvc: ProductsService;

    constructor( @Inject(ProductsService) pdtSvc: ProductsService) {
        this._pdtSvc = pdtSvc;
    }

}


@NgModule({
    imports: [WjInputModule, WjGridModule, WjGaugeModule, BrowserModule, FormsModule, routing, HttpModule],
    declarations: [AppCmp],
    providers: [ProductsService, CheckoutService],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);