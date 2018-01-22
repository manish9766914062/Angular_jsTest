import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcCore from 'wijmo/wijmo';

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
        selector: 'flex-grid-import-export-cmp',
        templateUrl: 'src/flexGridImportExportCmp.html'
    })
    export class FlexGridImportExportCmp extends FlexGridImportExportBaseCmp {

        exportExcel() {
            wjcGridXlsx.FlexGridXlsxConverter.save(this.flexGrid, {
                includeColumnHeaders: this.includeColumnHeader,
                includeCellStyles: false,
                formatItem: this.customContent ? this._exportFormatItem : null
            }, 'FlexGrid.xlsx');
        }

        importExcel() {
            var fileInput = <HTMLInputElement>document.getElementById('importFile');
            if (fileInput.files[0]) {
                this.customContent = false;
                wjcGridXlsx.FlexGridXlsxConverter.load(this.flexGrid, fileInput.files[0], { includeColumnHeaders: this.includeColumnHeader });
            }
        }
    }

    @NgModule({
        imports: [ WjGridModule, BrowserModule, FormsModule, TabsModule],
        declarations: [FlexGridImportExportCmp],
        providers: [DataSvc],
        bootstrap: [FlexGridImportExportCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application with hash style navigation and global services.
    platformBrowserDynamic().bootstrapModule(AppModule);
