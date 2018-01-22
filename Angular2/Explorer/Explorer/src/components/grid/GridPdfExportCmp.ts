

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';



'use strict';


import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridBaseCmp } from './GridBaseCmp';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// FlexGrid Pdf export component.
@Component({
    selector: 'grid-pdf-export-cmp',
    templateUrl: 'src/components/grid/gridPdfExportCmp.html'
})

export class GridPdfExportCmp extends GridBaseCmp {

    exportMode = wjcGridPdf.ExportMode.All;
    orientation =  wjcPdf.PdfPageOrientation.Portrait;
    scaleMode =  wjcGridPdf.ScaleMode.ActualSize;
    @ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc);     
    }

   export() {
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            exportMode: this.exportMode,
            scaleMode: this.scaleMode,
            documentOptions: {
                pageSettings: {
                    layout: this.orientation
                },
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                info: {
                    author: 'C1',
                    title: 'PdfDocument sample',
                    keywords: 'PDF, C1, sample',
                    subject: 'PdfDocument'
                }
            },
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
    };

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
    { path: '', component: GridPdfExportCmp }
]);

@NgModule({
    imports: [CommonModule, routing, WjGridModule, WjInputModule],
    declarations: [GridPdfExportCmp],
})
export class GridPdfExportModule {
}

