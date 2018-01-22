import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class OrderDetailCmp extends OrderBaseCmp {
    exportFileName: string;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    exportToPDF(): void;
    generateLayoutDef(): ({
        colspan: number;
        cells: ({
            binding: string;
            width: number;
            header: any;
        } | {
            binding: string;
            header: any;
            colspan: number;
            align: string;
        })[];
    } | {
        cells: {
            binding: string;
            width: number;
            header: any;
        }[];
    } | {
        cells: {
            binding: string;
            width: number;
            header: any;
            format: string;
        }[];
    } | {
        cells: {
            binding: string;
            header: any;
        }[];
    })[];
}
export declare class OrderDetailModule {
}
