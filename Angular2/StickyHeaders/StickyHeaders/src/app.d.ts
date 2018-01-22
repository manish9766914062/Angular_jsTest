import * as wjcOdata from 'wijmo/wijmo.odata';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcGridGrouppanel from 'wijmo/wijmo.grid.grouppanel';
export declare class AppCmp {
    products: wjcOdata.ODataCollectionView;
    private _url;
    constructor();
    init(s: wjcGrid.FlexGrid): void;
    toggleFilter(filter: wjcGridFilter.FlexGridFilter): void;
    toggleGroupPanel(theGroupPanel: wjcGridGrouppanel.GroupPanel, theGrid: wjcGrid.FlexGrid): void;
}
export declare class AppModule {
}
