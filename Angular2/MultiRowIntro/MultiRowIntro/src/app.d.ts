import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';
import { AfterViewInit } from '@angular/core';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp implements AfterViewInit {
    protected dataSvc: DataSvc;
    orders: wjcCore.CollectionView;
    groupedOrders: wjcCore.CollectionView;
    pagedOrders: wjcCore.CollectionView;
    addNewOrders: wjcCore.CollectionView;
    layoutDefs: wjcCore.CollectionView;
    ldOneLine: any[];
    ldTwoLines: any[];
    ldThreeLines: any[];
    frozenGrid: wjcGrid.FlexGrid;
    filterGrid: wjcGrid.FlexGrid;
    expandedHeadersGrid: wjcMultiRow.MultiRow;
    constructor(dataSvc: DataSvc);
    toggleFreeze(rows: number, cols: number): void;
    ngAfterViewInit(): void;
}
export declare class AppModule {
}
