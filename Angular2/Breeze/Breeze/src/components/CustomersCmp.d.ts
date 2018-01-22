import { DataSvc } from '../services/DataSvc';
import { BreezeCollectionView } from '../BreezeCollectionView';
export declare class CustomersCmp {
    customers: BreezeCollectionView;
    customer: any;
    numberInput: any;
    dataSvc: DataSvc;
    private _filterText;
    constructor(dataSvc: DataSvc);
    filterText: string;
    update(customer: any): void;
    reset(customer: any): void;
}
export declare class CustomersModule {
}
