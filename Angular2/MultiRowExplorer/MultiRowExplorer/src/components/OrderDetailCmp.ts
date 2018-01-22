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
    selector: 'order-detail-cmp',
    templateUrl: 'src/components/orderDetailCmp.html',
})

export class OrderDetailCmp extends OrderBaseCmp {

    exportFileName = 'OrderDetail';

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        super(dataSvc, exportSvc)
        this.data = dataSvc.getOrderDetail(5);
        this.fields = dataSvc.fields;
    }

    exportToPDF() {
        var styles = {
            cellStyle: {
                backgroundColor: '#ffffff',
                borderColor: '#c6c6c6'
            },
            altCellStyle: {
                backgroundColor: '#C0FFC0'
            },
            headerCellStyle: {
                backgroundColor: '#eaeaea'
            }
        }, isJapanese = this.exportSvc.culture === 'ja';

        this.exportSvc.exportPdf(this.multiRow, 'OrderDetail.pdf', isJapanese, styles);
    }

    // Generate the layout definition for the MultiRow control.
    generateLayoutDef() {
        var fields = this.fields;
        return [
            {
                colspan: 6,
                cells: [
                    { binding: 'orderId', width: 90, header: fields.orderDetailFields.orderId },
                    { binding: 'partId', width: 80, header: fields.orderDetailFields.partId },
                    { binding: 'handlingId', width: 100, header: fields.orderDetailFields.handlingId },
                    { binding: 'processingStatus', width: 125, header: fields.orderDetailFields.processingStatus },
                    { binding: 'purchaseId', width: 100, header: fields.orderDetailFields.purchaseId },
                    { binding: 'completed', width: 100, header: fields.orderDetailFields.completed },
                    { binding: 'orderDate', width: 90, header: fields.orderDetailFields.orderDate },
                    { binding: 'partName', header: fields.orderDetailFields.partName, colspan: 5, align: 'center' },
                    { binding: 'company', header: fields.orderDetailFields.company, colspan: 3, align: 'center' },
                    { binding: 'person', header: fields.orderDetailFields.person, colspan: 2, align: 'center' },
                    { binding: 'accepted', width: 100, header: fields.orderDetailFields.accepted }
                ]
            },
            {
                cells: [
                    { binding: 'quantity1', width: 90, header: fields.orderDetailFields.quantity1 },
                    { binding: 'quantity2', width: 90, header: fields.orderDetailFields.quantity2 },
                    { binding: 'quantity3', width: 90, header: fields.orderDetailFields.quantity3 },
                ]
            },
            {
                cells: [
                    { binding: 'unit', width: 60, header: fields.orderDetailFields.unit },
                ]
            },
            {
                cells: [
                    { binding: 'deliveryDate', width: 120, header: fields.orderDetailFields.deliveryDate, format: 'yyyy/MM/dd' },
                    { binding: 'processingDate', width: 120, header: fields.orderDetailFields.processingDate, format: 'yyyy/MM/dd' },
                    { binding: 'shippingDate', width: 120, header: fields.orderDetailFields.shippingDate, format: 'yyyy/MM/dd' }
                ]
            },
            {
                cells: [
                    { binding: 'packingRequest', header: fields.orderDetailFields.packingRequest }
                ]
            }
        ];
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: OrderDetailCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridMultirowModule],
    declarations: [OrderDetailCmp],
})
export class OrderDetailModule {
}

