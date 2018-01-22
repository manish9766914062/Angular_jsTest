import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';

'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';

//EventAnnotations sample component
@Component({
    selector: '',
    templateUrl: ''
})

export class OrderBaseCmp implements AfterViewInit {

    data: any;
    getLayoutDefTimer: number;
    exportFileName: string;
    pageIndex = -1;
    pageCount = -1;
    @ViewChild('multiRow') multiRow: wjcMultiRow.MultiRow;

    protected _fields: any;
    protected dataSvc: DataSvc;
    protected exportSvc: ExportSvc;

    constructor(@Inject(DataSvc) dataSvc: DataSvc, @Inject(ExportSvc) exportSvc: ExportSvc) {
        this.dataSvc = dataSvc;
        this.exportSvc = exportSvc;
        this.fields = dataSvc.fields;
        dataSvc.fieldsChanged = () => {
            this.fields = dataSvc.fields;
        };
    }

    ngAfterViewInit() {
        if (this.multiRow) {
            this.getLayoutDef();
        }
    }

    get fields(): any {
        return this._fields;
    }
    set fields(value: any) {
        if (this._fields != value) {
            this._fields = value;
            if (this.multiRow) {
                this.getLayoutDef();
            }
        }
    }

    moveToFirstPage() {
        this.data.moveToFirstPage();
    }

    moveToLastPage() {
        this.data.moveToLastPage();
    }

    moveToPreviousPage() {
        this.data.moveToPreviousPage();
    }

    moveToNextPage() {
        this.data.moveToNextPage();
    }

    exportToExcel() {
        this.exportSvc.exportXlsx(this.multiRow, this.exportFileName + '.xlsx');
    }

    exportToPDF() {
        var isJapanese = this.exportSvc.culture === 'ja';
        this.exportSvc.exportPdf(this.multiRow, this.exportFileName + '.pdf', isJapanese, null);
    }

    getLayoutDef() {
        if (this.fields) {
            this.multiRow.layoutDefinition = this.generateLayoutDef();
        } else {
            clearTimeout(this.getLayoutDefTimer);
            this.getLayoutDefTimer = null;
            this.getLayoutDefTimer = setTimeout(() => {
                this.getLayoutDef();
            }, 100);
        }
    }

    // Generate the layout definition for the MultiRow control.
    generateLayoutDef() {
        return [];
    }
}



