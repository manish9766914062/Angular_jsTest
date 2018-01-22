import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcOlap from 'wijmo/wijmo.olap';
import { AfterViewInit } from '@angular/core';
import { WjPivotPanel, WjPivotGrid } from 'wijmo/wijmo.angular2.olap';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp implements AfterViewInit {
    dataSets: any;
    showTotals: any;
    chartTypes: any;
    viewDefs: any;
    isServer: boolean;
    ngFmt: wjcOlap.PivotEngine;
    legendVisibility: {
        name: string;
        value: wjcOlap.LegendVisibility;
    }[];
    thePanel: WjPivotPanel;
    pivotGrid: WjPivotGrid;
    rawGrid: WjFlexGrid;
    protected dataSvc: DataSvc;
    private _rawData;
    private _cubeFields;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    rawData: any;
    formatCmbItem(e: wjcInput.FormatItemEventArgs): void;
    formatItem(s: wjcOlap.PivotGrid, e: wjcGrid.FormatItemEventArgs): void;
    collapse(level: number): void;
    saveView(): void;
    loadView(def?: string): void;
    export(): void;
    private transposeView(ng);
    private getViewTitle(ng);
    private addTitleCell(sheet, title);
}
export declare class AppModule {
}
