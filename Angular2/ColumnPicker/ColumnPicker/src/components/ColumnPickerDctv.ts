
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcFlexGridColumnPicker from '../FlexGridColumnPicker';

'use strict';

import { ElementRef, Directive, Self } from '@angular/core';
import { Input, Inject, OnInit, Injector } from '@angular/core';
import * as ngCore from '@angular/core';
import * as WjFlexGrid from 'wijmo/wijmo.angular2.grid';

@Directive({
    selector: '[columnPicker]',
    inputs: ['columnPicker']
})
export class ColumnPicker implements ngCore.OnInit, ngCore.OnDestroy {

    columnPicker: string;
    private _frame: HTMLElement;
    private _img: HTMLElement;

    constructor( @Self() @Inject(WjFlexGrid.WjFlexGrid) private _flex: WjFlexGrid.WjFlexGrid) {        
    }

    ngOnInit() {
        if (!this._flex) {
            return;
        }

        var cp = new wjcFlexGridColumnPicker.FlexGridColumnPicker(this._flex, this.columnPicker);
    }

    ngOnDestroy() {
        this._flex.invalidate();
    }
}
