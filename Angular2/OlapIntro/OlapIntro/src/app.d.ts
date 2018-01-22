import * as wjcCore from 'wijmo/wijmo';
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
    ngFmt: wjcOlap.PivotEngine;
    rawData: wjcCore.CollectionView;
    legendVisibility: {
        name: string;
        value: wjcOlap.LegendVisibility;
    }[];
    thePanel: WjPivotPanel;
    pivotGrid: WjPivotGrid;
    rawGrid: WjFlexGrid;
    protected dataSvc: DataSvc;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    formatItem(s: wjcOlap.PivotGrid, e: wjcGrid.FormatItemEventArgs): void;
    saveView(): void;
    loadView(def?: string): void;
    export(): void;
    private transposeView(ng);
    private getViewTitle(ng);
    private addTitleCell(sheet, title);
}
export declare class AppModule {
}
