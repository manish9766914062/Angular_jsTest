import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';

'use strict';

import { Component, Inject, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WjGridSheetModule } from 'wijmo/wijmo.angular2.grid.sheet';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

import { DataSvc } from '../services/DataSvc';

@Component({
    selector: 'table-cmp',
    templateUrl: 'src/components/tableCmp.html'
})
export class TableCmp {
    protected dataSvc: DataSvc;

    selectedTable: wjcGridSheet.Table = null;
    tableStyleNames: any[] = null;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
    }

    // references FlexSheet named 'flexSheet' in the view
    @ViewChild('flexSheet') flexSheet: wjcGridSheet.FlexSheet;

    // references Combobox named 'cboTableStyles' in the view
    @ViewChild('cboTableStyles') cboTableStyles: wjcInput.ComboBox;

    flexSheetInit(flexSheet: wjcGridSheet.FlexSheet) {
        var tableStyle: wjcGridSheet.TableStyle,
            table: wjcGridSheet.Table,
            i: number,
            self = this;

        self.tableStyleNames = [];
        for (i = 1; i <= 21; i++) {
            self.tableStyleNames.push('TableStyleLight' + i);
        }
        for (i = 1; i <= 28; i++) {
            self.tableStyleNames.push('TableStyleMedium' + i);
        }
        for (i = 1; i <= 11; i++) {
            self.tableStyleNames.push('TableStyleDark' + i);
        }

        tableStyle = flexSheet.getBuiltInTableStyle('TableStyleDark9');
        table = flexSheet.addTableFromDataSource(2, 1, self.dataSvc.getTableData(10), 'Table1', tableStyle, { showTotalRow: true });

        flexSheet.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
            var selection = args.range;
            if (selection.isValid) {
                self._getSelectedTable(selection, flexSheet);
            } else {
                self.selectedTable = null;
            }
        });

        flexSheet.updatedLayout.addHandler(() => {
            if (flexSheet.selection && flexSheet.selection.isValid) {
                self._getSelectedTable(flexSheet.selection, flexSheet);
            } else {
                self.selectedTable = null;
            }
        });
    }

    cboTableStylesInit(cboTableStyles: wjcInput.ComboBox) {
        var self = this;
        if (cboTableStyles) {
            cboTableStyles.selectedIndexChanged.addHandler(() => {
                // apply the table style for the selected table
                if (self.selectedTable) {
                    var tableStyle = self.flexSheet.getBuiltInTableStyle(cboTableStyles.selectedValue);
                    self.selectedTable.style = tableStyle;
                }
            });
            if (self.selectedTable) {
                cboTableStyles.selectedValue = self.selectedTable.style.name;
            }
        }
    }

    // Get selected table in FlexSheet.
    private _getSelectedTable(selection: wjcGrid.CellRange, flexSheet: wjcGridSheet.FlexSheet) {
        this.selectedTable = flexSheet.selectedSheet.findTable(selection.row, selection.col);
        if (this.selectedTable && this.cboTableStyles) {
            var tableStyle = flexSheet.getBuiltInTableStyle(this.selectedTable.style.name);
            if (tableStyle) {
                this.cboTableStyles.selectedValue = tableStyle.name;
            }
        }
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: TableCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridSheetModule, WjInputModule],
    declarations: [TableCmp],
})
export class TableModule {
}
