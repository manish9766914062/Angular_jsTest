import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule, WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {
    data: any;
    clearCells = false;
    interval = 100; // update interval in ms: 1000, 500, 100, 10, 1
    intervalData = [1000, 500, 100, 10, 1];
    batchSizeData = [100, 50, 10, 5, 1];
    batchSize = 5; // items to update: 100, 50, 10, 5, 1
    cellElements = {};

    private _customCells = true;
    private _autoUpdate = true;

    @ViewChild('theGrid') theGrid: WjFlexGrid;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = dataSvc.getData();
    }

    ngAfterViewInit() {
        this.theGrid.rowHeaders.columns[0].width = 80;
        this._updateTrades();
    }

    updatingView() {
        this.clearCells = true; // clear cell elements on next formatItem
    }

    get customCells(): boolean {
        return this._customCells;
    }
    set customCells(value: boolean) {
        if (this._customCells !== value) {
            this._customCells = value;
            this.theGrid.invalidate();
        }
    }

    get autoUpdate(): boolean {
        return this._autoUpdate;
    }
    set autoUpdate(value: boolean) {
        if (this._autoUpdate !== value) {
            this._autoUpdate = value;
            this.theGrid.invalidate();
        }
    }


    formatItem(s: WjFlexGrid, e: wjcGrid.FormatItemEventArgs) {
        // show symbols in row headers
        let item;
        if (e.panel == s.rowHeaders && e.col == 0) {
            item = s.rows[e.row].dataItem.symbol;
            e.cell.textContent = item;
        }

        // regular cells
        if (e.panel == s.cells) {
            let col = s.columns[e.col],
                item = s.rows[e.row].dataItem;

            // clear cell elements
            if (this.clearCells) {
                this.clearCells = false;
                this.cellElements = {};
            }

            // store cell element
            if (!this.cellElements[item.symbol]) {
                this.cellElements[item.symbol] = { item: item };
            }
            this.cellElements[item.symbol][col.binding] = e.cell;

            // custom painting
            this._formatCell(e.cell, item, col, false);
        }
    }

    private _updateTrades() {
        let now = new Date(),
            changedItems = {};
        for (let i = 0; i < this.batchSize; i++) {

            // select an item
            let item = this.data[DataSvc.randBetween(0, this.data.length - 1)];

            // update current data
            item.bid = item.bid * (1 + (Math.random() * .11 - .05));
            item.ask = item.ask * (1 + (Math.random() * .11 - .05));
            item.bidSize = DataSvc.randBetween(10, 1000);
            item.askSize = DataSvc.randBetween(10, 1000);
            let sale = (item.ask + item.bid) / 2;
            item.lastSale = sale;
            item.lastSize = Math.floor((item.askSize + item.bidSize) / 2);
            item.quoteTime = now;
            item.tradeTime = new Date(Date.now() + DataSvc.randBetween(0, 60000));

            // update history data
            this._addHistory(item.askHistory, item.ask);
            this._addHistory(item.bidHistory, item.bid);
            this._addHistory(item.saleHistory, item.lastSale);

            // keep track of changed items
            changedItems[item.symbol] = true;
        }

        // update the grid
        if (this.autoUpdate) {
            this._updateGrid(changedItems);
        }

        // and schedule the next batch
        setTimeout(() => {
            this._updateTrades();
        }, this.interval);
    }

    // update grid cells when items change
    private _updateGrid(changedItems: any) {
        for (let symbol in changedItems) {
            let itemCells = this.cellElements[symbol];
            if (itemCells) {
                let item = itemCells.item;
                this.theGrid.columns.forEach((col) => {
                    let cell = itemCells[col.binding];
                    if (cell) {
                        this._formatCell(cell, item, col, true);
                    }
                })
            }
        }
    }

    // add a value to a history array
    private _addHistory(array: number[], data: number) {
        array.push(data);
        if (array.length > 10) { // limit history length
            array.splice(0, 1);
        }
    }

    // custom cell painting
    private _formatCell(cell: HTMLElement, item: any, col: wjcGrid.Column, flare: boolean) {
        if (this.customCells) {
            switch (col.binding) {
                case 'bid':
                    this._formatDynamicCell(cell, item, col, 'bidHistory', flare);
                    break;
                case 'ask':
                    this._formatDynamicCell(cell, item, col, 'askHistory', flare);
                    break;
                case 'lastSale':
                    this._formatDynamicCell(cell, item, col, 'saleHistory', flare);
                    break;
                default:
                    cell.textContent = wjcCore.Globalize.format(item[col.binding], col.format);
                    break;
            }
        } else {
            cell.textContent = wjcCore.Globalize.format(item[col.binding], col.format);
        }
    }

    private _formatDynamicCell(cell: HTMLElement, item: any, col: wjcGrid.Column, history:string, flare: boolean) {

        // cell template
        let html = '<div class="ticker chg-{dir} flare-{fdir}"> ' +
            '<div class="value">{value}</div >' +
            '<div class="chg">{chg}</div>' +
            '<div class="glyph"><span class="wj-glyph-{glyph}"></span></div>' +
            '<div class="spark">{spark}</div>' +
            '</div>';

        // value
        html = html.replace('{value}', wjcCore.Globalize.format(item[col.binding], col.format));

        // % change
        let hist = item[history],
            chg = hist.length > 1 ? hist[hist.length - 1] / hist[hist.length - 2] - 1 : 0;
        html = html.replace('{chg}', wjcCore.Globalize.format(chg * 100, 'n1') + '%');

        // up/down glyph
        let glyph = chg > +0.001 ? 'up' : chg < -0.001 ? 'down' : 'circle';
        html = html.replace('{glyph}', glyph);

        // sparklines
        html = html.replace('{spark}', this._getSparklines(item[history]));

        // change direction
        let dir = glyph == 'circle' ? 'none' : glyph;
        html = html.replace('{dir}', dir);

        // flare direction
        let flareDir = flare ? dir : 'none';
        html = html.replace('{fdir}', flareDir);

        // done
        cell.innerHTML = html;
    }


    // generate sparklines as SVG
    private _getSparklines(data: number[]) {
        let svg = '',
            min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            x1 = 0,
            y1 = this._scaleY(data[0], min, max);
        for (let i = 1; i < data.length; i++) {
            let x2 = Math.round((i) / (data.length - 1) * 100),
                y2 = this._scaleY(data[i], min, max);
            svg += '<line x1=' + x1 + '% y1=' + y1 + '% x2=' + x2 + '% y2=' + y2 + '% />';
            x1 = x2;
            y1 = y2;
        }
        return '<svg><g>' + svg + '</g></svg>';
    }

    private _scaleY(value: number, min: number, max: number) {
        return max > min ? 100 - Math.round((value - min) / (max - min) * 100) : 0;
    }

}


@NgModule({
    imports: [WjGridModule, WjInputModule, FormsModule, BrowserModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);