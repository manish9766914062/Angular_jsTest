import * as wjcCore from 'wijmo/wijmo';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    countries: string[];
    items: wjcCore.CollectionView;
    selectedCountries: string[];
    getCompanies: Function;

    private _cache = {};

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.countries = dataSvc.getAllCountries();
        this.selectedCountries = ['Belgium', 'Vietnam'];
        this.items = dataSvc.getAllItems();
       
        // start service so there's no delay when the user starts typing
        var params = { query: 'start', max: 0 };
        $.getJSON('companycatalog.ashx', params);
        this.getCompanies = this._getCompaniesFunc.bind(this);
    }

    // function to retrieve companies using web service   

    private _getCompaniesFunc(query:string, max: number, callback: Function) {

        // try getting the result from the cache
         var   result = this._cache[query];
        if (result) {
            callback(result);
            return;
        }

        // not in cache, get from server
        var params = { query: query, max: max };
        $.getJSON('companycatalog.ashx', params, (response)=> {

            // add 'SymbolName' property to result
            let items = [];
            for (var i = 0; i < response.length; i++) {
                var c = response[i];
                c.SymbolName = c.Symbol + ': ' + c.Name;
            }

            // store result in cache
            if (query !== '') {
                this._cache[query] = response;
            }           

            // and return the result
            callback(response);
        }).fail( (error)=> {
                console.log('error: ' + error.responseText);
                this._cache[query] = null; // << no point in trying this query again
                callback(null);
            });
    }
}


@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);