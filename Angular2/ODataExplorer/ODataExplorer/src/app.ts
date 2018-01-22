import * as wjcCore from 'wijmo/wijmo';
import * as wjcOdata from 'wijmo/wijmo.odata';
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

    services: wjcCore.CollectionView;
    entities: wjcCore.CollectionView;
    data: any;

    constructor() {
        this.services = new wjcCore.CollectionView([
            { name: 'Northwind', url: 'http://services.odata.org/Northwind/Northwind.svc' },
            { name: 'OData Test', url: 'http://services.odata.org/V3/OData/OData.svc' }
        ]);
        this.entities = new wjcCore.CollectionView();

        // load entity list for the selected service
        this.loadEntityList();
        this.loadEntityData();

        this.services.currentChanged.addHandler(() => {
            this.loadEntityList();
        });
        this.entities.currentChanged.addHandler(() => {
            this.loadEntityData();
        });
        this.entities.collectionChanged.addHandler(() => {
            this.loadEntityData();
        });
    }

    private loadEntityList() {
        var url = this.services.currentItem.url,
            entityList = new wjcOdata.ODataCollectionView(
                url, // service
                null, // null to get entity list
                { // options
                    loaded: (sender, e) => {
                        this.entities.sourceCollection = sender.items;
                    }
                }
            );
    }

    private loadEntityData() {
        var svc = this.services.currentItem, // current service
            ent = this.entities.currentItem; // current entity
        if (svc && ent) {
            this.data = new wjcOdata.ODataCollectionView(
                svc.url, // service url
                ent.name, // entity name
                { // options
                    pageSize: this.data ? this.data.pageSize : 0,
                    loaded: function () {
                    },
                    error: function (sender, e) {
                        var msg = e.request.response.match(/"internalexception":{"message":"(.*?)"/);
                        if (msg) {
                            console.error(msg[1]);
                            e.cancel = true;
                        }
                    }
                }
            );
        }
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