'use strict';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { routeTree, routing } from './app.routing';
// Services
import { DataSvc } from './services/DataSvc';
// In order to support chart.saveImageToDataUrl method in IE.
import 'wijmo/wijmo.chart.render';

// The Explorer application root component.
@Component({
	selector: 'app-cmp',
	templateUrl: 'src/app.html'
})
export class AppCmp {
	@Input() navCollapsed = true;
	// Used to show navigation links and section headers in markup.
	private routTree = routeTree;
}

@NgModule({
	imports: [BrowserModule, routing],
	declarations: [AppCmp],
	providers: [DataSvc],
	bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application 
platformBrowserDynamic().bootstrapModule(AppModule);
