import { ElementRef, OnInit, EventEmitter } from '@angular/core';
export declare class ColorWheelCmp implements OnInit {
    themeChanged: EventEmitter<{}>;
    private _palette;
    private _wheel;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
    palette: any;
}
