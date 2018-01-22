
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjGridMultirowModule } from 'wijmo/wijmo.angular2.grid.multirow';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';

//EventAnnotations sample component
@Component({
    selector: 'purchase-slip-cmp',
    templateUrl: 'src/components/purchaseSlipCmp.html',
})

export class PurchaseSlipCmp extends OrderBaseCmp  {
    exportFileName = 'PurchaseSlip';
    getSummaryFieldsTimer: number;
    @ViewChild('footer') footer: wjcGrid.FlexGrid;
    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        super(dataSvc, exportSvc);
        this.data = dataSvc.getPurchaseSlip();
    }

    ngAfterViewInit() {
        var multiRow = this.multiRow,
            footer = this.footer;
        if (multiRow) {
            var cv = multiRow.collectionView;
            cv.collectionChanged.addHandler((sender, e: any) => {
                var quantity, unitCost;
                if (e.action === wjcCore.NotifyCollectionChangedAction.Change && !!e.item) {
                    quantity = +e.item.quantity;
                    unitCost = +e.item.unitCost;
                    if (!isNaN(quantity) && !isNaN(unitCost)) {
                        e.item.cost = quantity * unitCost;
                        e.item.price = e.item.cost * 1.35;
                        this.updateSummary(cv);
                    }
                }
            });            
            multiRow.scrollPositionChanged.addHandler(() => {
                if (footer && footer.scrollPosition.x !== multiRow.scrollPosition.x) {
                    footer.scrollPosition = new wjcCore.Point(multiRow.scrollPosition.x, 0);
                }
            })
            multiRow._root.style.overflowX = 'hidden';
            this.getLayoutDef();
        }

        if (footer && multiRow) {
            this.getSummaryFields();
            footer.scrollPositionChanged.addHandler(()=> {
                if (multiRow && multiRow.scrollPosition.x !== footer.scrollPosition.x) {
                    multiRow.scrollPosition = new wjcCore.Point(footer.scrollPosition.x, multiRow.scrollPosition.y);
                }
            })
        }
        
   }

    get fields(): any {
        return this._fields;
    }
    set fields(value: any) {
        if (this._fields != value) {
            var multiRow = this.multiRow,
                footer = this.footer;
            this._fields = value;
            if (multiRow) {
                this.getLayoutDef();
            }
            if (footer && footer.rows.length > 0 && footer.columns.length > 0 && multiRow) {
                footer.setCellData(0, 3, this.fields.summary);
                footer.setCellData(0, 6, this.fields.amountSummary);
                this.updateSummary(multiRow.collectionView);
            }
        }
    }

    exportToExcel() {
        var mainWorkbook = wjcGridXlsx.FlexGridXlsxConverter.save(this.multiRow),
            footerWOrkbook = wjcGridXlsx.FlexGridXlsxConverter.save(this.footer);

        mainWorkbook.sheets[0].rows.push(footerWOrkbook.sheets[0].rows[0]);
        mainWorkbook.save('PurchaseSlip.xlsx');
    }

    exportToPDF() {
        var isJapanese = this.exportSvc.culture === 'ja';

        try {
            this.mergeFooter();
            this.exportSvc.exportPdf(this.multiRow, 'PurchaseSlip.pdf', isJapanese, null);
        } finally {
           this.multiRow.rows.pop();
        }
    }

    generateLayoutDef() {
        var fields = this.fields,
          caseDataMap = this.dataSvc.buildDataMap(fields.cases.split(','));

        return [
            {
                cells: [
                    { binding: 'productName', header: fields.purchaseSlipFields.productName, align: 'center', width: 200 }
                ]
            },
            {
                cells: [
                    { binding: 'productId', header: fields.purchaseSlipFields.productId, width: 90 }
                ]
            },
            {
                cells: [
                    { binding: 'color', header: fields.purchaseSlipFields.color, align: 'center' },
                    { binding: 'packageUnit', header: fields.purchaseSlipFields.packageUnit, align: 'center' }
                ]
            },
            {
                cells: [
                    { binding: 'size', header: fields.purchaseSlipFields.size, width: 80 },
                    { binding: 'case', header: fields.purchaseSlipFields.case, dataMap: caseDataMap, width: 80 }
                ]
            },
            {
                cells: [
                    { binding: 'quantity', header: fields.purchaseSlipFields.quantity, width: 65 }
                ]
            },
            {
                cells: [
                    { binding: 'deal', header: fields.purchaseSlipFields.deal, width: 60 },
                    { binding: 'id', header: fields.purchaseSlipFields.id, width: 60 }
                ]
            },
            {
                cells: [
                    { binding: 'unitCost', header: fields.purchaseSlipFields.unitCost, width: 130, format: 'c2' }
                ]
            },
            {
                cells: [
                    { binding: 'cost', header: fields.purchaseSlipFields.cost, width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'price', header: fields.purchaseSlipFields.price, width: 90, format: 'c2', isReadOnly: true }
                ]
            },
            {
                cells: [
                    { binding: 'remarks', header: fields.purchaseSlipFields.remarks, align: 'center' }
                ]
            }
        ];
    }

    private getSummaryFields() {
        var footer = this.footer,
            multiRow = this.multiRow,
            cv = multiRow.collectionView,
            fields = this.fields;
        if (fields) {
            footer.columnLayout = multiRow.columnLayout;
            for (var i = 0; i < footer.columns.length; i++) {
                footer.columns[i].isReadOnly = true;
                footer.columns[i].cssClass = 'summary-footer';
                if (i === 3 || i === 6) {
                    footer.columns[i].cssClass += ' summary-footer-title';
                }
            }
            footer.columns[4].align = 'right';
            footer.rows.push(new wjcGrid.Row());
            footer.columnHeaders.rows.clear();
            footer.setCellData(0, 3, fields.summary);
            footer.setCellData(0, 6, fields.amountSummary);
            this.updateSummary(cv);
        } else {
            clearTimeout(this.getSummaryFieldsTimer);
            this.getSummaryFieldsTimer = null;
            this.getSummaryFieldsTimer = setTimeout(() => {
                this.getSummaryFields();
            }, 100);
        }
    }


    // Update the summary info for the MultiRow control.
    private updateSummary(cv: wjcCore.ICollectionView) {
        var footer = this.footer,
            qtySum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'quantity'),
            costSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'cost'),
            priceSum = wjcCore.getAggregate(wjcCore.Aggregate.Sum, cv.items, 'price');

        footer.setCellData(0, 4, qtySum);
        footer.setCellData(0, 7, wjcCore.Globalize.format(costSum, 'c2'));
        footer.setCellData(0, 8, wjcCore.Globalize.format(priceSum, 'c2'));

    }

    // Merge the footer to the multiRow control for exporting pdf.
    private mergeFooter() {
        var multiRow = this.multiRow,
            footer = <wjcGrid.FlexGrid>this.footer,
            rowCnt = multiRow.rows.length,
            newRow = new wjcGrid.GroupRow();

        //newRow.recordIndex = 0;
        multiRow.rows.push(newRow);
        multiRow.setCellData(rowCnt, 3, footer.getCellData(0, 3, false));
        multiRow.setCellData(rowCnt, 4, footer.getCellData(0, 4, false));
        multiRow.setCellData(rowCnt, 6, footer.getCellData(0, 6, false), false);
        multiRow.setCellData(rowCnt, 7, footer.getCellData(0, 7, false));
        multiRow.setCellData(rowCnt, 8, footer.getCellData(0, 8, false));
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: PurchaseSlipCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridMultirowModule, WjGridModule],
    declarations: [PurchaseSlipCmp],
})
export class PurchaseSlipModule {
}

