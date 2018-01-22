import * as wjcCore from 'wijmo/wijmo';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class TransferSlipCmp extends OrderBaseCmp {
    items: wjcCore.CollectionView;
    debtorSum: string;
    creditorSum: string;
    balance: string;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    fields: any;
    moveToFirstPage(): void;
    moveToLastPage(): void;
    moveToPreviousPage(): void;
    moveToNextPage(): void;
    exportToExcel(): void;
    exportToPDF(): void;
    generateLayoutDef(): any[];
    private updateSummary(cv);
}
export declare class TransferSlipModule {
}
