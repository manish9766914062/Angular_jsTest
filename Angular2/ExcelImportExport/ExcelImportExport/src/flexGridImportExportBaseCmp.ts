import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { DataSvc } from './services/DataSvc';

'use strict';

// The Explorer application root component.
@Component({
    selector: '',
    templateUrl: ''
})

export abstract class FlexGridImportExportBaseCmp {
    protected dataSvc: DataSvc;
    data: any[];
    includeColumnHeader = true;
    customContent = false;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = dataSvc.getProductOrders(1500);
    }

    // references FlexSheet named 'flexSheetIntro' in the view
    @ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

    updateGroup(flex: wjcGrid.FlexGrid) {
        var groupNames = ['Product', 'Country', 'Amount'],
            cv,
            propName,
            groupDesc;

        if (flex) {
            // get the collection view, start update
            cv = flex.collectionView;
            cv.beginUpdate();

            // clear existing groups
            cv.groupDescriptions.clear();

            // add new groups
            for (var i = 0; i < groupNames.length; i++) {
                propName = groupNames[i].toLowerCase();
                if (propName == 'amount') {

                    // group amounts in ranges
                    // (could use the mapping function to group countries into continents, 
                    // names into initials, etc)
                    groupDesc = new wjcCore.PropertyGroupDescription(propName, function (item, prop) {
                        var value = item[prop];
                        if (value > 1000) return 'Large Amounts';
                        if (value > 100) return 'Medium Amounts';
                        if (value > 0) return 'Small Amounts';
                        return 'Negative';
                    });
                    cv.groupDescriptions.push(groupDesc);
                } else if (propName) {

                    // group other properties by their specific values
                    groupDesc = new wjcCore.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }

            // done updating
            cv.endUpdate();
        }
    }

    _exportFormatItem(args: wjcGridXlsx.XlsxFormatItemEventArgs) {
        var p = args.panel,
            row = args.row,
            col = args.col,
            xlsxCell = args.xlsxCell,
            cell: HTMLElement,
            color: string;

        if (p.cellType === wjcGrid.CellType.Cell) {
            if (p.columns[col].binding === 'color') {
                //color = p.rows[row].dataItem['color'];
                if (xlsxCell.value) {
                    if (!xlsxCell.style.font) {
                        xlsxCell.style.font = {};
                    }
                    xlsxCell.style.font.color = (<string>xlsxCell.value).toLowerCase();
                }
            } else if (p.columns[col].binding === 'active' && p.rows[row] instanceof wjcGrid.GroupRow) {
                cell = args.getFormattedCell();
                xlsxCell.value = cell.textContent.trim();
                xlsxCell.style.hAlign = wjcXlsx.HAlign.Left;
            }
        }
    }
}