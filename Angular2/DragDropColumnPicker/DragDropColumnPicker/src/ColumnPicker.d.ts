import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class ColumnPicker extends wjcCore.Control {
    private _grid;
    private _dAll;
    private _dInUse;
    private _dMarker;
    private _dragSource;
    private _dropIndex;
    private _lbAll;
    private _lbInUse;
    static controlTemplate: string;
    constructor(element: any, options?: any);
    grid: wjcGrid.FlexGrid;
    save(): void;
    load(): void;
    _getAllColumns(): wjcCore.ObservableArray;
    _createColumnListBox(host: HTMLElement): wjcInput.ListBox;
    _dragstart(e: DragEvent): void;
    _dragover(e: DragEvent): void;
    _drop(e: DragEvent): void;
    _dragend(e: DragEvent): void;
    _getListBoxTarget(e: DragEvent): wjcInput.ListBox;
    _resetMouseState(): void;
    _showDragMarker(e: DragEvent): void;
}
