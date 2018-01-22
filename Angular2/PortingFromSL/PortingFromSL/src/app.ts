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

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    // URL to Northwind service
    svcUrl = 'http://services.odata.org/Northwind/Northwind.svc';

    // create customers, orders, details view
    customers: wjcCore.CollectionView;
    orders: wjcCore.CollectionView;
    details: wjcCore.CollectionView;
    queryResources = [];

    constructor() {
        // create customers, orders, details view
        this.customers = new wjcCore.CollectionView();
        this.orders = new wjcCore.CollectionView();
        this.details = new wjcCore.CollectionView();

        // when the current customer changes, get his orders
        this.customers.currentChanged.addHandler(() => {
            this.orders.sourceCollection = [];
            this.details.sourceCollection = [];
            var customer = this.customers.currentItem;
            if (customer) {
                this.loadData(this.svcUrl, this.orders, 'Customers(\'' + customer.CustomerID + '\')/Orders', {
                    OrderDate: wjcCore.DataType.Date,
                    RequiredDate: wjcCore.DataType.Date,
                    ShippedDate: wjcCore.DataType.Date,
                    Freight: wjcCore.DataType.Number
                });
            }
        });

        // when the current order changes, get the order details
        this.orders.currentChanged.addHandler(() => {
            this.details.sourceCollection = [];
            var order = this.orders.currentItem;
            if (order) {
                this.loadData(this.svcUrl, this.details, 'Orders(' + order.OrderID + ')/Order_Details', {
                    UnitPrice: wjcCore.DataType.Number
                });
            }
        });
    }

    // handle clicks on the Start button
    startButton_Click() {

        // clear query history
        this.queryResources = [];

        // load the customers.
        this.loadData(this.svcUrl, this.customers, 'Customers');
    }

    // utility to load OData into a CollectionView
    private loadData(baseUrl: string, view: wjcCore.CollectionView, table: string, types?: any) {

        // build url
        var url = baseUrl + '/' + table;
        url += (url.indexOf('?') < 0) ? '?' : '&';
        url += '$format=json';

        // update query history
        this.queryResources.push({
            table: table.indexOf('/') > -1 ? table.split('/')[1] : table.split('?')[0],
            url: url
        });

        // go get the data
        wjcCore.httpRequest(url, {
            success: (xhr) => {

                // append new items
                var data = JSON.parse(xhr.response);
                for (var i = 0; i < data.value.length; i++) {

                    // convert data types (JSON doesn't do dates...)
                    var item = data.value[i];
                    if (types) {
                        for (var key in types) {
                            if (item[key]) {
                                item[key] = wjcCore.changeType(item[key], types[key], null);
                            }
                        }
                    }

                    // add item to collection
                    view.sourceCollection.push(item);
                }

                // continue loading more data or refresh and apply to update scope
                if (data['odata.nextLink']) {
                    this.loadData(baseUrl, view, data['odata.nextLink']);
                } else {
                    view.refresh();
                    view.moveCurrentToFirst();
                }
            }
        });
    }
}


@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);