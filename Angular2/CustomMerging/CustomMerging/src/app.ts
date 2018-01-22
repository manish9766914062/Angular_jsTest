import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { CustomMergeManager } from './CustomMergeManager';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    constructor() {
    }

    initCustomMerge(flex: wjcGrid.FlexGrid) {
        // set custom merge manager
        flex.mergeManager = new CustomMergeManager(flex);

        // create rows and columns
        while (flex.columns.length < 7) {
            flex.columns.push(new wjcGrid.Column());
        }
        while (flex.rows.length < 5) {
            flex.rows.push(new wjcGrid.Row());
        }
        this._setData(flex.columnHeaders, 0, ',Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'.split(','));
        flex.rowHeaders.columns[0].width = 80;
        flex.rows.defaultSize = 40;

        // add data
        this._setData(flex.cells, 0, '12:00,Walker,Morning Show,Morning Show,Sport,Weather,N/A,N/A'.split(','));
        this._setData(flex.cells, 1, '13:00,Today Show,Today Show,Sesame Street,Football,Market Watch,N/A,N/A'.split(','));
        this._setData(flex.cells, 2, '14:00,Today Show,Today Show,Kid Zone,Football,Soap Opera,N/A,N/A'.split(','));
        this._setData(flex.cells, 3, '15:00,News,News,News,News,News,N/A,N/A'.split(','));
        this._setData(flex.cells, 4, '16:00,News,News,News,News,News,N/A,N/A'.split(','));
    }

    formatItem(s: WjFlexGrid, e: wjcGrid.FormatItemEventArgs) {
        if (e.cell.children.length == 0) {
            e.cell.innerHTML = '<div>' + e.cell.innerHTML + '</div>';
            wjcCore.setCss(e.cell, {
                display: 'table',
                tableLayout: 'fixed'
            });
            wjcCore.setCss(e.cell.children[0], {
                display: 'table-cell',
                textAlign: 'center',
                verticalAlign: 'middle'
            });
        }
    }

    private _setData(p: wjcGrid.GridPanel, r: number, cells: string[]) {

        // first element in row header
        if (p.cellType == wjcGrid.CellType.Cell) {
            p.grid.rowHeaders.setCellData(r, 0, cells[0]);
        }

        // other elements in row
        for (var i = 1; i < cells.length; i++) {
            p.setCellData(r, i - 1, cells[i]);
        }
    }
}


@NgModule({
    imports: [WjGridModule, BrowserModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);