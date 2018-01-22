
import * as wjcGrid from 'wijmo/wijmo.grid';
import { ColumnPicker } from '../ColumnPicker';

import {Component, Input, Inject, ElementRef } from '@angular/core';    

// Represents a column picker.
@Component({
    selector: 'wj-column-picker',
    template: `<div></div>`,
})
export class WjColumnPicker extends ColumnPicker {
    @Input() grid: wjcGrid.FlexGrid

    constructor(@Inject(ElementRef) elRef: ElementRef) {
        super(elRef.nativeElement);
    }
};


