import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
export declare class DataSvc {
    cityMap: wjcGrid.DataMap;
    orders: wjcCore.CollectionView;
    groupedOrders: wjcCore.CollectionView;
    pagedOrders: wjcCore.CollectionView;
    addNewOrders: wjcCore.CollectionView;
    ordersRefreshing: boolean;
    addNewOrdersRefreshing: boolean;
    groupedOrdersRefreshing: boolean;
    pagedOrdersRefreshing: boolean;
    constructor();
    randBetween(min: any, max: any): number;
}
