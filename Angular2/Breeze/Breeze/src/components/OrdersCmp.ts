
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
'use strict';

import { Component, EventEmitter, Inject, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from '../services/DataSvc';
import { BreezeCollectionView } from '../BreezeCollectionView';

@Component({
    selector: 'orders-cmp',
    templateUrl: 'src/components/ordersCmp.html'
})

export class OrdersCmp {

    dataSvc: DataSvc;
    orders: BreezeCollectionView;
    currentOrder: any;
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        //this.dataSvc.init();
        this.orders = new BreezeCollectionView(dataSvc.getManager(), dataSvc.getEntityQuery("Orders").take(50), true, true, true);
        this.orders.currentChanged.addHandler(() => {
            this.currentOrder = this.orders.currentItem;
        });

        this.orders.collectionChanged.addHandler(() => {
            this.currentOrder = this.orders.currentItem;
        });
        this.orders.querySucceeded.addHandler((sender, e: any) => {
            this.dataSvc.querySucceeded(e.data);
        });

        this.orders.queryFailed.addHandler((sender, e: any) => {
            this.dataSvc.queryFailed(e.data.message);
        });

        this.orders.saveSucceeded.addHandler((sender, e: any) => {
            this.dataSvc.saveSucceeded(e.data);
        });

        this.orders.saveFailed.addHandler((sender, e: any) => {
            this.dataSvc.saveFailed(e.data);
        });
    }
    initialized(grid: WjFlexGrid) {

        // store reference to grid
        let tip = new wjcCore.Tooltip(),
            rng = null;

        // monitor the mouse over the grid
        grid.addEventListener(grid.hostElement, 'mousemove', (evt)=> {
            var ht = grid.hitTest(evt);
            if (!ht.range.equals(rng)) {
                // new cell selected, show tooltip
                if (ht.cellType == wjcGrid.CellType.Cell) {
                    rng = ht.range;
                    var cellElement = document.elementFromPoint(evt.clientX, evt.clientY),
                        cellBounds = wjcCore.Rect.fromBoundingRect(cellElement.getBoundingClientRect()),
                        data = wjcCore.escapeHtml(grid.getCellData(rng.row, rng.col, true)),
                        tipContent = '<b>' + data + '</b>';
                    if (cellElement.className.indexOf('wj-cell') > -1) {
                        tip.show(grid.hostElement, tipContent, cellBounds);
                    } else {
                        tip.hide(); // cell must be behind scroll bar...
                    }
                }
            }
        });
        grid.addEventListener(grid.hostElement, 'mouseout', ()=> {
            tip.hide();
            rng = null;
        });
    }

    update(currentOrder: any) {
        this.orders.editItem(currentOrder);
        this.orders.commitEdit();
    };

    reset(currentOrder: any) {
        currentOrder.entityAspect.rejectChanges();
        this.orders.cancelEdit();
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: OrdersCmp }
]);

@NgModule({
    imports: [CommonModule, WjInputModule, WjGridModule, WjGridFilterModule, FormsModule, routing],
    providers: [DataSvc],
    declarations: [OrdersCmp],
})
export class OrdersModule {
}
