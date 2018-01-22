import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import { DataSvc } from './services/DataSvc';
export declare abstract class FlexGridImportExportBaseCmp {
    protected dataSvc: DataSvc;
    data: any[];
    includeColumnHeader: boolean;
    customContent: boolean;
    constructor(dataSvc: DataSvc);
    flexGrid: wjcGrid.FlexGrid;
    updateGroup(flex: wjcGrid.FlexGrid): void;
    _exportFormatItem(args: wjcGridXlsx.XlsxFormatItemEventArgs): void;
}
