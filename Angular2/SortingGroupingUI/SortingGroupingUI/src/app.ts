import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { GroupManager } from './groupManager';
import { SortManager } from './sortManager';
import { ManagerSvc } from './services/ManagerSvc';
import { SortDialogComboCmp } from './components/SortDialogComboCmp';
import { SortDialogFlexCmp } from './components/SortDialogFlexCmp';
import { GroupDialogComboCmp } from './components/GroupDialogComboCmp';
import { GroupDialogFlexCmp } from './components/GroupDialogFlexCmp';


'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    // expose some data
    sortManager: SortManager;
    groupManager: GroupManager;
    properties = 'country,color,product,active'.split(',');
    countries = 'US,Germany,UK,Japan,Italy,Greece,Spain,Canada,Australia,China,Austria'.split(',');
    products = 'Widget,Gadget,Doohickey'.split(',');
    colors = 'Black,White,Red,Green,Blue'.split(',');
    view: wjcCore.CollectionView;

    constructor( @Inject(ManagerSvc) managerSvc: ManagerSvc) {
        this.view = new wjcCore.CollectionView(this.getData(100));
        this.sortManager = new SortManager();
        this.groupManager = new GroupManager();
        managerSvc.groupManager = this.groupManager;
        managerSvc.sortManager = this.sortManager;
    } 

    // some random data
    private getData(count: number) {
        var data = [],
            countries = this.countries,
            products = this.products,
            colors = this.colors,
            dt = new Date();
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                date: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                country: countries[Math.floor(Math.random() * countries.length)],
                product: products[Math.floor(Math.random() * products.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                amount: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0,
            });
        }
        return data;
    }

}


@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [SortDialogComboCmp, SortDialogFlexCmp, GroupDialogComboCmp, GroupDialogFlexCmp, AppCmp],
    providers: [ManagerSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);