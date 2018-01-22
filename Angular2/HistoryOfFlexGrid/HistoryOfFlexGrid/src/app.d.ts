import * as wjcCore from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
export declare class AppCmp {
    data: wjcCore.CollectionView;
    flexWin95: null;
    flexWinMobile: null;
    flexWinPhone: null;
    constructor();
    iniFlexWin95(flexWin95: WjFlexGrid): void;
    iniFlexWMobile(flexWinMobile: WjFlexGrid): void;
    private _getData(count);
}
export declare class AppModule {
}
