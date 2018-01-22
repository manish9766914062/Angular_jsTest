import * as wjcGrid from 'wijmo/wijmo.grid';
import { AfterViewInit } from '@angular/core';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp implements AfterViewInit {
    data: any;
    clearCells: boolean;
    interval: number;
    intervalData: number[];
    batchSizeData: number[];
    batchSize: number;
    cellElements: {};
    private _customCells;
    private _autoUpdate;
    theGrid: WjFlexGrid;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    updatingView(): void;
    customCells: boolean;
    autoUpdate: boolean;
    formatItem(s: WjFlexGrid, e: wjcGrid.FormatItemEventArgs): void;
    private _updateTrades();
    private _updateGrid(changedItems);
    private _addHistory(array, data);
    private _formatCell(cell, item, col, flare);
    private _formatDynamicCell(cell, item, col, history, flare);
    private _getSparklines(data);
    private _scaleY(value, min, max);
}
export declare class AppModule {
}
