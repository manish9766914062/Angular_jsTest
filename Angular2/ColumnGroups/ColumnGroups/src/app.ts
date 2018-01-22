// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { DataSvc } from './services/DataSvc';
import { ColumnGroupProvider } from './ColumnGroupProvider';
    'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {
  
    w3Data: any[];
    fundData: any[];
    w3Columns: any[];
    fundColumns: any[];

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.w3Data = dataSvc.w3Data;
        this.fundData = dataSvc.fundData;
        this.w3Columns = dataSvc.w3Columns;
        this.fundColumns = dataSvc.fundColumns;
    }

    initW3C(s: WjFlexGrid){

        // create FlexGridFilter *before* the ColumnGroupProvider
        // so the filter icons will center-align properly in merged header cells:
        //var f = new wijmo.grid.filter.FlexGridFilter(s);
        var g = new ColumnGroupProvider(s, this.w3Columns);

        // select column groups on clicks (as opposed to sorting)
        g.selectOnClick = true;

        // set data source *after* creating the ColumnGroupProvider
        // to avoid automatic column generation:
        s.itemsSource = this.w3Data;
    }
    initFinancial(s: WjFlexGrid) {
        //var f = new wijmo.grid.filter.FlexGridFilter(s);
        var g = new ColumnGroupProvider(s, this.fundColumns);
        g.selectOnClick = true;
        s.itemsSource = this.fundData;
    }
}



@NgModule({
    imports: [WjGridModule, WjGridFilterModule,BrowserModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
