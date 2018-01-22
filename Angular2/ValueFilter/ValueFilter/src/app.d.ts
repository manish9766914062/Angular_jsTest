import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class AppCmp {
    data: wjcCore.CollectionView;
    countryMap: wjcGrid.DataMap;
    private _countries;
    constructor();
    initialized(flex: wjcGrid.FlexGrid): void;
    private _createData();
}
export declare class AppModule {
}
