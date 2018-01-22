import { AfterViewInit, ElementRef } from '@angular/core';
import * as ngCore from '@angular/core';
export declare class BreezeInput implements AfterViewInit {
    label: string;
    model: any;
    propName: string;
    value: string;
    id: string;
    errorPath: string;
    static _uid: number;
    private _ntvEle;
    private _propValue;
    constructor(elRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [key: string]: ngCore.SimpleChange;
    }): any;
}
export declare class BreezeInputModule {
}
