import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataSvc } from '../services/DataSvc';
import { BreezeCollectionView } from '../BreezeCollectionView';
export declare class OrdersCmp {
    dataSvc: DataSvc;
    orders: BreezeCollectionView;
    currentOrder: any;
    constructor(dataSvc: DataSvc);
    initialized(grid: WjFlexGrid): void;
    update(currentOrder: any): void;
    reset(currentOrder: any): void;
}
export declare class OrdersModule {
}
