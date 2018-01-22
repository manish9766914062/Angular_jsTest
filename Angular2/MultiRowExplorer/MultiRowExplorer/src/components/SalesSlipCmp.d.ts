import * as wjcCore from 'wijmo/wijmo';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class SalesSlipCmp extends OrderBaseCmp {
    exportFileName: string;
    data: wjcCore.CollectionView;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    generateLayoutDef(): any[];
}
export declare class SalesSlipModule {
}
