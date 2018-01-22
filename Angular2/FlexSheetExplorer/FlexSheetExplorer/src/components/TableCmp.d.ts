import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcInput from 'wijmo/wijmo.input';
import { DataSvc } from '../services/DataSvc';
export declare class TableCmp {
    protected dataSvc: DataSvc;
    selectedTable: wjcGridSheet.Table;
    tableStyleNames: any[];
    constructor(dataSvc: DataSvc);
    flexSheet: wjcGridSheet.FlexSheet;
    cboTableStyles: wjcInput.ComboBox;
    flexSheetInit(flexSheet: wjcGridSheet.FlexSheet): void;
    cboTableStylesInit(cboTableStyles: wjcInput.ComboBox): void;
    private _getSelectedTable(selection, flexSheet);
}
export declare class TableModule {
}
