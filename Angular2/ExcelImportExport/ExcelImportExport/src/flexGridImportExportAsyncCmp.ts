// Import JSZip and provide wijmo.xlsx with a reference to it
import * as JSZip from 'jszip';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';
wjcXlsx.useJSZip(JSZip);

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';
import { FlexGridImportExportBaseCmp } from './FlexGridImportExportBaseCmp';


'use strict';

// The Explorer application root component.
@Component({
    selector: 'flex-grid-import-export-async-cmp',
    templateUrl: 'src/flexGridImportExportAsyncCmp.html'
})
export class FlexGridImportExportAsyncCmp extends FlexGridImportExportBaseCmp {

    exportExcelAsync() {
        wjcGridXlsx.FlexGridXlsxConverter.saveAsync(this.flexGrid,
            {
                includeColumnHeaders: this.includeColumnHeader,
                includeCellStyles: false,
                formatItem: this.customContent ? this._exportFormatItem : null
            },
            'FlexGrid.xlsx');
    }

    importExcelAsync() {
        var fileInput = <HTMLInputElement>document.getElementById('importFile');
        if (fileInput.files[0]) {
            this.customContent = false;
            wjcGridXlsx.FlexGridXlsxConverter.loadAsync(this.flexGrid, fileInput.files[0], { includeColumnHeaders: this.includeColumnHeader });
        }
    }
}


@NgModule({
    imports: [WjGridModule, BrowserModule, FormsModule, TabsModule],
    declarations: [FlexGridImportExportAsyncCmp],
    providers: [DataSvc],
    bootstrap: [FlexGridImportExportAsyncCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
