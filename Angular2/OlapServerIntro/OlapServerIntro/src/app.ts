import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcOlap from 'wijmo/wijmo.olap';
import * as wjcOData from 'wijmo/wijmo.odata';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcXlsx from 'wijmo/wijmo.xlsx';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule, WjPivotPanel, WjPivotGrid } from 'wijmo/wijmo.angular2.olap';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

'use strict';

// The OlapServerIntro application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp implements AfterViewInit {

    dataSets: any;
    showTotals: any;
    chartTypes: any;
    viewDefs: any;
    isServer: boolean;
    ngFmt: wjcOlap.PivotEngine;

    legendVisibility = [
        { name: 'Always', value: wjcOlap.LegendVisibility.Always },
        { name: 'Never', value: wjcOlap.LegendVisibility.Never },
        { name: 'Automatic', value: wjcOlap.LegendVisibility.Auto }
    ];

    @ViewChild('thePanel') thePanel: WjPivotPanel;
    @ViewChild('pivotGrid') pivotGrid: WjPivotGrid;
    @ViewChild('rawGrid') rawGrid: WjFlexGrid;

    protected dataSvc: DataSvc;
    private _rawData: any;
    private _cubeFields: any[];

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;

        this.dataSets = this.dataSvc.initDataSets();
        this.showTotals = this.dataSvc.initShowTotals();
        this.chartTypes = this.dataSvc.initChartTypes();
        this.viewDefs = this.dataSvc.initViewDefs();
        this._cubeFields = this.dataSvc.initCubeFields();

        this.isServer = true;

        this._rawData = this.dataSets[0].value;

        this.ngFmt = new wjcOlap.PivotEngine({
            autoGenerateFields: false,
            itemsSource: this.dataSvc.getSimpleDataSet(10000),
            showColumnTotals: wjcOlap.ShowTotals.GrandTotals,
            showRowTotals: wjcOlap.ShowTotals.None,
            fields: [
                { binding: 'product', header: 'Product' },
                { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                { binding: 'sales', header: 'Sales', format: 'n0' },
                { binding: 'sales', header: 'Diff', format: 'p0', showAs: wjcOlap.ShowAs.DiffRowPct }
            ]
        });

        this.ngFmt.rowFields.push('Date');
        this.ngFmt.columnFields.push('Product');
        this.ngFmt.valueFields.push('Sales', 'Diff');
    }

    ngAfterViewInit() {
        this.rawData = this.dataSets[0].value;
        var ng = this.thePanel.engine;

        ng.rowFields.push('Product', 'Country');
        ng.valueFields.push('Sales', 'Downloads');
        ng.showRowTotals = wjcOlap.ShowTotals.Subtotals;
        ng.showColumnTotals = wjcOlap.ShowTotals.Subtotals;
    }

    get rawData(): any {
        return this._rawData;
    }
    set rawData(value: any) {
        // use custom set of fields for the cube source
        var ng = this.thePanel.engine;
        if (wjcCore.isString(value) && value.indexOf('cube') > 0) {
            ng.autoGenerateFields = false;
            ng.fields.clear();
            wjcCore.copy(ng, {
                fields: this._cubeFields
            });
        } else {
            if (!ng.autoGenerateFields) { // clear custom (non-auto-generated) fields (TFS 245470)
                ng.fields.clear();
            }
            ng.autoGenerateFields = true;
        }

        // no filter by value on server sources
        ng.defaultFilterType = wjcCore.isString(ng.itemsSource) ? 1 : 3;
        this.isServer = wjcCore.isString(value);
        this._rawData = value;
    }

    formatCmbItem(e: wjcInput.FormatItemEventArgs) {
        e.item.innerHTML = wjcCore.isString(e.data.value)
            ? '&#9729; ' + e.data.name
            : e.data.name;
    }

    formatItem(s: wjcOlap.PivotGrid, e: wjcGrid.FormatItemEventArgs) {
        if (e.panel == s.cells && e.col % 2 == 1) {
            var value = s.getCellData(e.row, e.col, false),
                color = '#d8b400',
                glyph = 'circle';
            if (value != null) {
                if (value < 0) { // negative variation
                    color = '#9f0000';
                    glyph = 'down';
                } else if (value > 0.05) { // positive variation
                    color = '#4c8f00';
                    glyph = 'down';
                }
                e.cell.style.color = color;
                e.cell.innerHTML += ' <span style="font-size:120%" class="wj-glyph-' + glyph + '"></span>';
            }
        }
    }

    collapse(level: number) {
        this.pivotGrid.collapseRowsToLevel(level);
        this.pivotGrid.collapseColumnsToLevel(level);
    }

    // save/restore view definitions
    saveView() {
        var ng = this.thePanel.engine;
        if (ng.isViewDefined) {
            localStorage.viewDefinition = ng.viewDefinition;
        }
    }
    loadView(def?: string) {
        var ng = this.thePanel.engine;
        if (def) {
            // load pre-defined view (against specific dataset)
            //this.rawData = this.dataSets[3].value;
            //ng.itemsSource = this.rawData;
            ng.viewDefinition = def;
        } else {
            // load view from localStorage (whatever the user saved)
            ng.viewDefinition = localStorage.viewDefinition;
        }
    }

    // export pivot table and raw data to Excel
    export() {
        var ng = this.thePanel.engine;

        // create book with current view
        var book = wjcGridXlsx.FlexGridXlsxConverter.save(this.pivotGrid, {
            includeColumnHeaders: true,
            includeRowHeaders: true
        });
        book.sheets[0].name = 'Main View';
        this.addTitleCell(book.sheets[0], this.getViewTitle(ng));

        // add sheet with transposed view
        if (!wjcCore.isString(ng.itemsSource)) {
            this.transposeView(ng);
            var transposed = wjcGridXlsx.FlexGridXlsxConverter.save(this.pivotGrid, {
                includeColumnHeaders: true,
                includeRowHeaders: true
            });
            transposed.sheets[0].name = 'Transposed View';
            this.addTitleCell(transposed.sheets[0], this.getViewTitle(ng));
            book.sheets.push(transposed.sheets[0]);
            this.transposeView(ng);

            // add sheet with raw data (unless there's too much data)
            if (this.rawGrid.rows.length < 20000) {
                var raw = wjcGridXlsx.FlexGridXlsxConverter.save(this.rawGrid, {
                    includeColumnHeaders: true,
                    includeRowHeaders: false
                });
                raw.sheets[0].name = 'Raw Data';
                book.sheets.push(raw.sheets[0]);
            }
        }

        // save the book
        book.save('wijmo.olap.xlsx');
    }

    // save/load/transpose/export views
    private transposeView(ng: wjcOlap.PivotEngine) {
        ng.deferUpdate(() => {

            // save row/col fields
            var rows = [],
                cols = [];
            for (var r = 0; r < ng.rowFields.length; r++) {
                rows.push(ng.rowFields[r].header);
            }
            for (var c = 0; c < ng.columnFields.length; c++) {
                cols.push(ng.columnFields[c].header);
            }

            // clear row/col fields
            ng.rowFields.clear();
            ng.columnFields.clear();

            // restore row/col fields in transposed order
            for (var r = 0; r < rows.length; r++) {
                ng.columnFields.push(rows[r]);
            }
            for (var c = 0; c < cols.length; c++) {
                ng.rowFields.push(cols[c]);
            }
        });
    }

    // build a title for the current view
    private getViewTitle(ng: wjcOlap.PivotEngine): string {
        var title = '';
        for (var i = 0; i < ng.valueFields.length; i++) {
            if (i > 0) title += ', ';
            title += ng.valueFields[i].header;
        }
        title += ' by ';
        if (ng.rowFields.length) {
            for (var i = 0; i < ng.rowFields.length; i++) {
                if (i > 0) title += ', ';
                title += ng.rowFields[i].header;
            }
        }
        if (ng.rowFields.length && ng.columnFields.length) {
            title += ' and by ';
        }
        if (ng.columnFields.length) {
            for (var i = 0; i < ng.columnFields.length; i++) {
                if (i > 0) title += ', ';
                title += ng.columnFields[i].header;
            }
        }
        return title;
    }

    // adds a title cell into an xlxs sheet
    private addTitleCell(sheet: wjcXlsx.WorkSheet, title: string) {

        // create cell
        var cell = new wjcXlsx.WorkbookCell();
        cell.value = title;
        cell.style = new wjcXlsx.WorkbookStyle();
        cell.style.font = new wjcXlsx.WorkbookFont();
        cell.style.font.bold = true;

        // create row to hold the cell
        var row = new wjcXlsx.WorkbookRow();
        row.cells[0] = cell;

        // and add the new row to the sheet
        sheet.rows.splice(0, 0, row);
    }
}


@NgModule({
    imports: [WjInputModule, WjOlapModule, WjGridModule, WjGridFilterModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
