// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import {routeTree, routing} from './app.routing';

// Services
import { DataSvc } from './services/DataSvc';
import { TooltipSvc } from './services/TooltipSvc';

'use strict';

// The FinancialChartExplorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html',
})
export class AppCmp {
    // Used to show navigation links and section headers in markup.
    private routTree = routeTree;
}


@NgModule({
    imports: [BrowserModule, routing, HttpModule],
    declarations: [AppCmp],
    providers: [DataSvc, TooltipSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application 
platformBrowserDynamic().bootstrapModule(AppModule);

