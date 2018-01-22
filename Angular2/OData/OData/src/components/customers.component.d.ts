import * as wjOData from 'wijmo/wijmo.odata';
import * as wjGrid from 'wijmo/wijmo.grid';
export declare class CustomersCmp {
    cvCst: wjOData.ODataCollectionView;
    cvOrd: wjOData.ODataCollectionView;
    cvDtl: wjOData.ODataCollectionView;
    mapShp: wjGrid.DataMap;
    mapEmp: wjGrid.DataMap;
    constructor();
    private getOrderDetail();
    private getNewId(view, idField);
}
