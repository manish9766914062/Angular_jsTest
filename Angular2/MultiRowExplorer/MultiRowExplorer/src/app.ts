import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';

//var $: any;
// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { routes, routing } from './app.routing';
import { WjGridMultirowModule } from 'wijmo/wijmo.angular2.grid.multirow';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';
import { ExportSvc } from './services/ExportSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    fields: any;
    routes: Routes = routes;
    dataSvc: DataSvc;
    exportSvc: ExportSvc;
    private _culture: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        this.exportSvc = exportSvc;
        this.dataSvc = dataSvc;
        this.culture = 'en';
    }

    get culture(): string {
        return this._culture;
    }
    set culture(value: string) {
        if (this._culture != value) {
            this._culture = value;
            this._loadCulture(this._culture);
            this.exportSvc.culture = this._culture;
        }
    }

    private _loadCulture(culture: string) {
        $.ajax({
            url: 'scripts/vendor/wijmo.culture.' + this._culture + '.js',
            dataType: 'script',
            success: (data)=> {
                // culture applied, now load translations
                $.ajax({
                    url: 'src/translations/fields.' + this._culture + '.js',
                    dataType: 'json',
                    async: false,
                    success: (data)=> {
                        this.fields = data;
                        this.dataSvc.fields = data;
                    }
                });
            }
        });
    }

}


@NgModule({
    imports: [WjInputModule, WjGridMultirowModule, BrowserModule, FormsModule, routing],
    declarations: [AppCmp],
    providers: [DataSvc,ExportSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);