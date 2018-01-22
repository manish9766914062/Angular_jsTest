import * as wjcGrid from 'wijmo/wijmo.grid';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
export declare class AppCmp {
    constructor();
    initCustomMerge(flex: wjcGrid.FlexGrid): void;
    formatItem(s: WjFlexGrid, e: wjcGrid.FormatItemEventArgs): void;
    private _setData(p, r, cells);
}
export declare class AppModule {
}
