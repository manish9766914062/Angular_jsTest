

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcCore from 'wijmo/wijmo';



'use strict';


import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, forwardRef, Type, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridBaseCmp } from './GridBaseCmp';
import { DataSvc } from '../../services/DataSvc';
import { RouterModule } from '@angular/router';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

// FlexGrid excel Export component.
@Component({
    selector: 'grid-excel-import-export-cmp',
    templateUrl: 'src/components/grid/gridExcelImportExportCmp.html'
})

export class GridExcelImportExportCmp extends GridBaseCmp {

    // references FlexSheet named 'flexSheetIntro' in the view
    @ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;
    includeColumnHeader = true;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc); 
    
    }

    exportExcel() {
        wjcGridXlsx.FlexGridXlsxConverter.save(this.flexGrid, { includeColumnHeaders: this.includeColumnHeader, includeCellStyles: false }, 'FlexGrid.xlsx');
    }

    importExcel() {
        var fileInput = <HTMLInputElement>document.getElementById('importFile');
        if (fileInput.files[0]) {
            wjcGridXlsx.FlexGridXlsxConverter.load(this.flexGrid, fileInput.files[0], { includeColumnHeaders: this.includeColumnHeader });
        }
    }

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
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: GridExcelImportExportCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjGridModule],
    declarations: [GridExcelImportExportCmp],
})
export class GridExcelImportExportModule {
}

