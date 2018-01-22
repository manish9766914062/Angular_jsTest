import * as wjcGrid from 'wijmo/wijmo.grid';
import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class PurchaseSlipCmp extends OrderBaseCmp {
    exportFileName: string;
    getSummaryFieldsTimer: number;
    footer: wjcGrid.FlexGrid;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    fields: any;
    exportToExcel(): void;
    exportToPDF(): void;
    generateLayoutDef(): ({
        cells: {
            binding: string;
            header: any;
            align: string;
            width: number;
        }[];
    } | {
        cells: {
            binding: string;
            header: any;
            align: string;
        }[];
    } | {
        cells: ({
            binding: string;
            header: any;
            width: number;
        } | {
            binding: string;
            header: any;
            dataMap: wjcGrid.DataMap;
            width: number;
        })[];
    } | {
        cells: {
            binding: string;
            header: any;
            width: number;
            format: string;
        }[];
    } | {
        cells: {
            binding: string;
            header: any;
            width: number;
            format: string;
            isReadOnly: boolean;
        }[];
    })[];
    private getSummaryFields();
    private updateSummary(cv);
    private mergeFooter();
}
export declare class PurchaseSlipModule {
}
