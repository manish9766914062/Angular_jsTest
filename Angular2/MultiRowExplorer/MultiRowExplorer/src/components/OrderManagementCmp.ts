
import * as wjcCore from 'wijmo/wijmo';
import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';

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
    selector: 'order-management-cmp',
    templateUrl: 'src/components/orderManagementCmp.html',
})

export class OrderManagementCmp extends OrderBaseCmp {
    exportFileName = 'OrderManagement';
    data: wjcCore.CollectionView;
    pageIndex = -1;
    pageCount = -1;
   
    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        super(dataSvc, exportSvc);
        this.data = new wjcCore.CollectionView(dataSvc.getOrders(20));
        this.data.pageSize = 5;      
    }

    ngAfterViewInit() {
        if (this.multiRow) {
            var cv = <wjcCore.CollectionView>this.multiRow.collectionView;
            this.pageIndex = cv.pageIndex;
            this.pageCount = cv.pageCount;
            cv.pageChanged.addHandler(() => {
                this.pageIndex = cv.pageIndex;
            });
            cv.collectionChanged.addHandler((sender, e: any) => {
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

    // Generate the layout definition for the MultiRow control.
    generateLayoutDef(): any[] {
        var fields = this.fields;
        var warehouseDataMap = this.dataSvc.buildDataMap(fields.warehouses.split(','));

        return [
            {
                colspan: 3,
                cells: [
                    { binding: 'orderId', header: fields.orderManagementFields.orderId, width: 80 },
                    { binding: 'productId', header: fields.orderManagementFields.productId, width: 80 },
                    { binding: 'productName', header: fields.orderManagementFields.productName, width: 180 },
                    { binding: 'specialNote', header: fields.orderManagementFields.specialNote, align: 'center', colspan: 3 }
                ]
            },
            {
                colspan: 3,
                cells: [
                    { binding: 'quantity', header: fields.orderManagementFields.quantity, width: 80 },
                    { binding: 'unitPrice', header: fields.orderManagementFields.unitPrice, width: 80, format: 'c2' },
                    { binding: 'amount', header: fields.orderManagementFields.amount, isReadOnly: true, width: 80, format: 'c2' },
                    { binding: 'shippingWarehouse', header: fields.orderManagementFields.shippingWarehouse, dataMap: warehouseDataMap, align: 'center', colspan: 2 },
                    { binding: 'onHold', header: fields.orderManagementFields.onHold },
                ]
            },
            {
                cells: [
                    { binding: 'orderDate', header: fields.orderManagementFields.orderDate, format: 'yyyy/MM/dd' },
                    { binding: 'deliveryDate', header: fields.orderManagementFields.deliveryDate, format: 'yyyy/MM/dd' }
                ]
            }
        ];
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: OrderManagementCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridMultirowModule],
    declarations: [OrderManagementCmp],
})
export class OrderManagementModule {
}

