'use strict';

import { Inject, ElementRef, Component, Input, Output,  OnInit, EventEmitter } from '@angular/core';
import { ColorWheel } from './ColorWheel';
@Component({
    selector: 'color-wheel',
    template: '<div></div>'
})
export class ColorWheelCmp implements OnInit {
    @Output() themeChanged = new EventEmitter();    

    private _palette: any;
    private _wheel: ColorWheel;

    constructor( @Inject(ElementRef) elRef: ElementRef) {     
        this._wheel = new ColorWheel(elRef.nativeElement);
        this._wheel.themeChanged.addHandler((s: ColorWheel, e:any) => {
            if (this.themeChanged) {
                this.themeChanged.emit(s);
            }
        })
    }

    ngOnInit() {
        this._wheel.primary = 'Indigo';
        this._wheel.accent = 'Pink';
    }

    @Input()
    get palette(): any {
        return this._palette;
    }
    set palette(value: any) {
        if (this._palette !== value) {
            this._wheel.palette = value;
            this._wheel.refresh(true);
        }
    }
}



