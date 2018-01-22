
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
    selector: 'sale-slip-cmp',
    templateUrl: 'src/components/salesSlipCmp.html',
})

export class SalesSlipCmp extends OrderBaseCmp {
    exportFileName = 'SalesSlip';
    data: wjcCore.CollectionView;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        super(dataSvc, exportSvc);
        this.data = new wjcCore.CollectionView(dataSvc.getSalesSlip(20));
        this.data.pageSize = 5;
    }

    ngAfterViewInit() {
        var multiRow = this.multiRow;
        if (multiRow) {
            var cv = <wjcCore.CollectionView>multiRow.collectionView;
            this.pageIndex = cv.pageIndex;
            this.pageCount = cv.pageCount;
            cv.pageChanged.addHandler(()=> {
                this.pageIndex = cv.pageIndex;
            });
            cv.collectionChanged.addHandler((sender, e:any)=> {
                var unitPrice, profitUnitPrice, quantity;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    unitPrice = +e.item.unitPrice;
                    profitUnitPrice = +e.item.profitUnitPrice;
                    quantity = +e.item.quantity;
                    if (!isNaN(quantity)) {
                        if (!isNaN(unitPrice)) {
                            e.item.salesAmount = unitPrice * quantity;
                        }
                        if (!isNaN(profitUnitPrice)) {
                            e.item.totalProfit = profitUnitPrice * quantity;
                        }
                        if (!isNaN(unitPrice) && !isNaN(profitUnitPrice)) {
                            e.item.profitRate = e.item.totalProfit / e.item.salesAmount;
                        }
                    }
                }
            });
            this.getLayoutDef();
        }
    }

    // Generate the layout definition for the MultiRow control.
    generateLayoutDef(): any[] {
        var fields = this.fields,
            warehouseDataMap = this.dataSvc.buildDataMap(fields.warehouses.split(','));

        return [
            {
                cells: [
                    { binding: 'id', header: fields.salesSlipFields.id, width: 60 }
                ]
            },
            {
                colspan: 5,
                cells: [
                    { binding: 'productId', header: fields.salesSlipFields.productId, width: 80 },
                    { binding: 'productName', header: fields.salesSlipFields.productName, colspan: 3 },
                    { binding: 'marker', header: fields.salesSlipFields.marker, align: 'center' },
                    { binding: 'quantity', header: fields.salesSlipFields.quantity, width: 80, align: 'right' },
                    { binding: 'unit', header: fields.salesSlipFields.unit },
                    { binding: 'unitPrice', header: fields.salesSlipFields.unitPrice, format: 'c2', colspan: 2 },
                    { binding: 'salesAmount', header: fields.salesSlipFields.salesAmount, format: 'c2', isReadOnly: true },
                    { binding: 'profitUnitPrice', header: fields.salesSlipFields.profitUnitPrice, format: 'c2', colspan: 2 },
                    { binding: 'totalProfit', header: fields.salesSlipFields.totalProfit, format: 'c2', colspan: 2, isReadOnly: true, cssClass: 'profit-cell' },
                    { binding: 'profitRate', header: fields.salesSlipFields.profitRate, format: 'p2', isReadOnly: true, cssClass: 'profit-cell' }
                ]
            }
        ];
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: SalesSlipCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridMultirowModule],
    declarations: [SalesSlipCmp],
})
export class SalesSlipModule {
}

