import * as wjcGrid from 'wijmo/wijmo.grid';
import { ColumnPicker } from '../ColumnPicker';
import { ElementRef } from '@angular/core';
export declare class WjColumnPicker extends ColumnPicker {
    grid: wjcGrid.FlexGrid;
    constructor(elRef: ElementRef);
}
