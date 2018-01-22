import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    data: wjcCore.CollectionView;
    showErrors = true;
    validateEdits = true;
    customValidation = false;

    constructor() {
        this._initData();
    }

    enableCustomValidation(flex: wjcGrid.FlexGrid) {
        flex.cellEditEnded.addHandler((s, e: any) => {
            if (this.customValidation && !s.activeEditor) {
                this.showErrors = true; // show errors so user knows what's going on
                this.validateEdits = true; // customValidation (row) implies validateEdits (cell)
                var item = s.rows[e.row].dataItem;
                s.columns.forEach(function (col) {
                    if (s.collectionView.getError(item, col.binding)) {
                        s.startEditing(true, e.row, col.index);
                        return;
                    }
                });
            }
        })
    }

    // create some data for the sample  
    private _initData() {
        var data = [],
            countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            customers = [
                { id: 0, firstName: 'John', lastName: 'Lennon' },
                { id: 1, firstName: 'Paul', lastName: 'McCartney' },
                { id: 2, firstName: 'Ringo', lastName: 'Starr' },
                { id: 3, firstName: 'George', lastName: 'Harrison' },
            ];
        for (var i = 0; i < 10 * countries.length; i++) {
            data.push({
                customer: customers[i % customers.length],
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                active: i % 2 == 0
            });
        }
        this.data = new wjcCore.CollectionView(data, {

            // initialize new items
            newItemCreator: () => {
                return {
                    customer: customers[0],
                    country: countries[0],
                    downloads: 0,
                    sales: 0,
                    expenses: 0,
                    active: false
                }
            },

            // validation code (logic only!)
            getError: (item:any, property:any) => {
                switch (property) {
                    case 'country':
                        return countries.indexOf(item.country) < 0
                            ? 'Invalid Country'
                            : null;
                    case 'downloads':
                    case 'sales':
                    case 'expenses':
                        return item[property] < 1000
                            ? 'Cannot be less than 1,000!'
                            : null;
                    case 'active':
                        return item.active && item.country.match(/US|UK/)
                            ? 'Active items are not allowed in the US or UK!'
                            : null;
                    case 'customer.firstName':
                        return item.customer.firstName.match(/^(John|Paul|Ringo|George)$/)
                            ? null
                            : 'That\'s not a Beatle!!';
                    case 'customer.lastName':
                        return item.customer.lastName.match(/^(Lennon|McCartney|Starr|Harrison)$/)
                            ? null
                            : 'That\'s not a Beatle!!';
                }
                return null;
            }
        });
    }
}


@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);