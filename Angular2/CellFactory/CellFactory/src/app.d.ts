import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class AppCmp {
    data: any[];
    flex: wjcGrid.FlexGrid;
    constructor();
    setRenderMode(renderMode: string): void;
    initGrid(flex: wjcGrid.FlexGrid): void;
    private _itemFormatter(p, r, c, cell);
    private _createData(rows, cols);
}
export declare class AppModule {
}
