import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class AppCmp {
    data: wjcCore.CollectionView;
    showErrors: boolean;
    validateEdits: boolean;
    customValidation: boolean;
    constructor();
    enableCustomValidation(flex: wjcGrid.FlexGrid): void;
    private _initData();
}
export declare class AppModule {
}
