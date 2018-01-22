

'use strict';

import { Component, EventEmitter, Inject, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { BreezeInputModule } from './BreezeInput';
import { DataSvc } from '../services/DataSvc';
import { BreezeCollectionView } from '../BreezeCollectionView';

@Component({
    selector: 'customers-cmp',
    templateUrl: 'src/components/customersCmp.html'
})

export class CustomersCmp {

    customers: BreezeCollectionView;
    customer: any;
    numberInput: any;
    dataSvc: DataSvc;

    private _filterText: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        //this.dataSvc.init();
        this.customers = new BreezeCollectionView(dataSvc.getManager(), dataSvc.getEntityQuery("Customers"), true, true, true);
        this.customers.currentChanged.addHandler(()=> {
            this.customer = this.customers.currentItem;
        });

        this.customers.collectionChanged.addHandler(() => {
            this.customer = this.customers.currentItem;
        });

        this.customers.querySucceeded.addHandler((sender, e:any)=> {
            if (this.numberInput) {
                this.numberInput.max = this.customers.pageCount;
            }
            this.dataSvc.querySucceeded(e.data);
        });

        this.customers.queryFailed.addHandler((sender, e: any) => {
            this.dataSvc.queryFailed(e.data.message);
        });

        this.customers.saveSucceeded.addHandler((sender, e: any) => {
            this.dataSvc.saveSucceeded(e.data);
        });

        this.customers.saveFailed.addHandler((sender, e: any) => {
            this.dataSvc.saveFailed(e.data);
        });
    }

    get filterText(): string {
        return this._filterText;
    }

    set filterText(value:string) {
        if (value !== this._filterText) {
            this._filterText = value;
            this.customers.filterPredicate = this.dataSvc.getCompanyNamePredicate(value);
        }
    }

    update(customer: any) {
        this.customers.editItem(customer);
        this.customers.commitEdit();
    };

    reset(customer: any) {
        this.customer.entityAspect.rejectChanges();
        this.customers.cancelEdit();
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: CustomersCmp }
]);

@NgModule({
    imports: [CommonModule, WjInputModule, WjGridModule, WjGridFilterModule, BreezeInputModule, FormsModule,routing],
    providers: [DataSvc],
    declarations: [CustomersCmp],
})
export class CustomersModule {
}
