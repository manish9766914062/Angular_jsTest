import * as wjcCore from 'wijmo/wijmo';
import * as wjcGauge from 'wijmo/wijmo.gauge';
import { AfterViewInit } from '@angular/core';
export declare class AppCmp implements AfterViewInit {
    yrMin: number;
    yrMax: number;
    animLength: number;
    animating: number;
    data: wjcCore.CollectionView;
    private _year;
    lineGauge: wjcGauge.LinearGauge;
    constructor();
    year: number;
    ngAfterViewInit(): void;
    toggleAnimation(): void;
    stopAnimation(): void;
    chartItemFormatter(engine: any, hitTestInfo: any, defaultFormat: any): void;
    private _updateData();
    private _interpolate(arr, year);
}
export declare class AppModule {
}
