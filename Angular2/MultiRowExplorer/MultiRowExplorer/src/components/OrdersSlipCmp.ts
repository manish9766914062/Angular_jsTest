import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';
import * as wjcCore from 'wijmo/wijmo';
'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjGridMultirowModule } from 'wijmo/wijmo.angular2.grid.multirow';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';

//EventAnnotations sample component
@Component({
    selector: 'orders-slip-cmp',
    templateUrl: 'src/components/ordersSlipCmp.html',
})

export class OrdersSlipCmp extends OrderBaseCmp {
    exportFileName = 'OrdersSlip';
    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        super(dataSvc, exportSvc);
        this.data = dataSvc.generateOrdersSlipData();
    }

    ngAfterViewInit() {
        if (this.multiRow) {
            var cv = this.multiRow.collectionView;
            cv.collectionChanged.addHandler((sender, e:any)=> {
                var unitPrice, quantity;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    unitPrice = +e.item.unitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(unitPrice) && !isNaN(quantity)) {
                        e.item.amount = unitPrice * quantity;
                    }
                }
            });
            this.getLayoutDef();
        }
    }
        

    generateLayoutDef() {
        var fields = this.fields;
        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'productId', header: fields.ordersSlipFields.productId, width: 90 },
                    { binding: 'categoryId', header: fields.ordersSlipFields.categoryId, width: 90 },
                    { binding: 'categoryName', header: fields.ordersSlipFields.category, width: 90 },
                    { binding: 'productName', header: fields.ordersSlipFields.productName, colspan: 3 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: fields.ordersSlipFields.quantity, width: 140 },
                    { binding: 'packageUnit', header: fields.ordersSlipFields.packageUnit, width: 140 }
                ]
            },
            {
                cells: [
                    { binding: 'unitPrice', header: fields.ordersSlipFields.unitPrice, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'amount', header: fields.ordersSlipFields.amount, isReadOnly: true, format: 'c2', width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'shippingId', header: fields.ordersSlipFields.shippingId, width: 100 },
                    { binding: 'discontinued', header: fields.ordersSlipFields.discontinued, width: 100 }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: fields.ordersSlipFields.remarks, width: 280 },
                    { binding: 'description', header: fields.ordersSlipFields.description, width: 280 }
                ]
            }
        ];
    }

}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: OrdersSlipCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridMultirowModule],
    declarations: [OrdersSlipCmp],
})
export class OrdersSlipModule {
}

