import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';
import { AfterViewInit } from '@angular/core';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class OrderBaseCmp implements AfterViewInit {
    data: any;
    getLayoutDefTimer: number;
    exportFileName: string;
    pageIndex: number;
    pageCount: number;
    multiRow: wjcMultiRow.MultiRow;
    protected _fields: any;
    protected dataSvc: DataSvc;
    protected exportSvc: ExportSvc;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    fields: any;
    moveToFirstPage(): void;
    moveToLastPage(): void;
    moveToPreviousPage(): void;
    moveToNextPage(): void;
    exportToExcel(): void;
    exportToPDF(): void;
    getLayoutDef(): void;
    generateLayoutDef(): any[];
}
