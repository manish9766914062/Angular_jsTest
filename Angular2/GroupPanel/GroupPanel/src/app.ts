import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridGrouppanelModule } from 'wijmo/wijmo.angular2.grid.grouppanel';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {    
    data: wjcCore.CollectionView;
    protected dataSvc: DataSvc;

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData());
        this.data.groupDescriptions.push(new wjcCore.PropertyGroupDescription('name'));
        this.data.groupDescriptions.push(new wjcCore.PropertyGroupDescription('checked'));
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule, WjGridGrouppanelModule, BrowserModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
