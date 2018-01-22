import { OrderBaseCmp } from './OrderBaseCmp';
import { DataSvc } from '../services/DataSvc';
import { ExportSvc } from '../services/ExportSvc';
export declare class OrdersSlipCmp extends OrderBaseCmp {
    exportFileName: string;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    ngAfterViewInit(): void;
    generateLayoutDef(): ({
        colspan: number;
        cells: ({
            binding: string;
            header: any;
            width: number;
        } | {
            binding: string;
            header: any;
            colspan: number;
        })[];
    } | {
        cells: {
            binding: string;
            header: any;
            width: number;
        }[];
    } | {
        cells: {
            binding: string;
            header: any;
            format: string;
            width: number;
        }[];
    } | {
        cells: {
            binding: string;
            header: any;
            isReadOnly: boolean;
            format: string;
            width: number;
        }[];
    })[];
}
export declare class OrdersSlipModule {
}
