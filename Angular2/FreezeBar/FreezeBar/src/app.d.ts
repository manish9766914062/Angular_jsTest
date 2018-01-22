import * as wjcGrid from 'wijmo/wijmo.grid';
import { FreezeBarSvc } from './services/FreezeBarSvc';
export declare class AppCmp {
    data: any[];
    private _freezeBarSvc;
    constructor(freezeBarSvc: FreezeBarSvc);
    initGrid(flex: wjcGrid.FlexGrid): void;
    private _createData(rows, cols);
}
export declare class AppModule {
}
