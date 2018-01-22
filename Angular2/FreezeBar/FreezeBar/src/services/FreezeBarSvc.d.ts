import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class FreezeBarSvc {
    private flex;
    private host;
    private dragging;
    private freezeBar;
    private freeze;
    addFreezeBar(flex: wjcGrid.FlexGrid): void;
    private _gridMouseDown(e);
    private _gridMouseMove(e);
    private _stopDragging(e);
    private _positionfreezeBar(flex, div, frozen);
}
