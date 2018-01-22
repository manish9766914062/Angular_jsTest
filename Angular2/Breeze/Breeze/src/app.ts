// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { routes, routing } from './app.routing';
import { DataSvc } from './services/DataSvc';

    'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {
  
    // Used to show navigation links and section headers in markup.
    private routes = routes;
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        dataSvc.init();
    }
}


@NgModule({
    imports: [routing, BrowserModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
