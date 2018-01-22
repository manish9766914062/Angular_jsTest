import { AfterViewInit } from '@angular/core';
export declare class AppCmp implements AfterViewInit {
    data: any;
    private _dragSrcEl;
    private _cols;
    any: any;
    constructor();
    ngAfterViewInit(): void;
    private _handleDragStart(e);
    private _handleDragOver(e);
    private _handleDragEnter(e);
    private _handleDragLeave(e);
    private _handleDragEnd(e);
    private _handleDrop(e);
    private _getData();
}
export declare class AppModule {
}
