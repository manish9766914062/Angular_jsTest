import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { CustomCellFactory } from './CustomCellFactory';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    data: any[];
    @ViewChild('flexGrid') flex: wjcGrid.FlexGrid;

    constructor() {
        this.data = this._createData(100, 900);
    }

    setRenderMode(renderMode: string) {
        switch (renderMode) {
            case 'CustomCellFactory':
                this.flex.cellFactory = new CustomCellFactory();
                this.flex.itemFormatter = null;
                break;
            case 'ItemFormatter':
                this.flex.cellFactory = new wjcGrid.CellFactory();
                this.flex.itemFormatter = this._itemFormatter;
                break;
            case 'Default':
                this.flex.cellFactory = new wjcGrid.CellFactory();
                this.flex.itemFormatter = null;
                break;
            default:
                throw 'Invalid renderMode request';
        }
    }

    initGrid(flex: wjcGrid.FlexGrid) {
        flex.rows.forEach((item: any) => {
            item.height = 35;
        });
        flex.columns.forEach((item: any) => {
            item.width = 35;
            item.align = '';
        });
        this.setRenderMode('CustomCellFactory');
    }

    // itemFormatter function
    private _itemFormatter(p: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement) {
        switch (p.cellType) {

            // regular cells
            case wjcGrid.CellType.Cell:
                wjcCore.addClass(cell, 'centered-cell');
                cell.style.backgroundColor = (r % 2 == 0) ? '#fff682' : '#b0e9ff';
                var html = '<div>' + p.getCellData(r, c, true) + '</div>';
                if (cell.innerHTML != html) {
                    cell.innerHTML = html;
                }
                break;

            // column headers
            case wjcGrid.CellType.ColumnHeader:
                wjcCore.addClass(cell, 'rotated-cell');
                var html = '<div>' + p.getCellData(r, c, true) + '</div>';
                if (cell.innerHTML != html) {
                    cell.innerHTML = html;
                }
                break;
        }
    }

    // create some data for the sample  
    private _createData(rows: number, cols: number): any[] {
        var data = [];
        for (var r = 0; r < rows; r++) {
            data[r] = [];
            for (var c = 0; c < cols; c++) {
                data[r][c] = r + c;
            }
        }
        return data;
    }
}


@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);