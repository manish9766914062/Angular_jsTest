import * as wjcCore from 'wijmo/wijmo';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class OrderManagementCmp extends OrderBaseCmp {
    exportFileName: string;
    data: wjcCore.CollectionView;
    pageIndex: number;
    pageCount: number;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    generateLayoutDef(): any[];
}
export declare class OrderManagementModule {
}
