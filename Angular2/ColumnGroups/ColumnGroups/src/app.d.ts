import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    w3Data: any[];
    fundData: any[];
    w3Columns: any[];
    fundColumns: any[];
    constructor(dataSvc: DataSvc);
    initW3C(s: WjFlexGrid): void;
    initFinancial(s: WjFlexGrid): void;
}
export declare class AppModule {
}
