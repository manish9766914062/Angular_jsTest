import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcInput from 'wijmo/wijmo.input';
// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, AfterViewInit, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';

'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {
    protected dataSvc: DataSvc;
    private books: wjcCore.CollectionView;
    private authors: wjcCore.ObservableArray;
    private filter = {
        title: '',
        author: '',
        price: null
    };
    private toFilter = null;
    private cmbTitle: wjcInput.ComboBox;
    private inPrice: wjcInput.InputNumber;
    private cmbAuth: wjcInput.ComboBox;

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        // expose book data as a CollectionView
        this.books = new wjcCore.CollectionView(this.dataSvc.getBooks());
        // apply filter
        this.books.filter = (item:any) => {

            // filter by title, author, price
            var ft = this.filter.title;
            if (ft && item.title.toLowerCase().indexOf(ft.toLowerCase()) < 0) {
                return false;
            }
            var fa = this.filter.author;
            if (fa && fa.indexOf('(all') < 0 && item.author.toLowerCase().indexOf(fa.toLowerCase()) < 0) {
                return false;
            }
            var fp = this.filter.price;
            if (fp != null && item.price > fp) {
                return false;
            }

            // all passed
            return true;
        };
        // keep list of authors for filtering
        this.authors = new wjcCore.ObservableArray();
        this.books.collectionChanged.addHandler(() => {
            this.updateAuthors();
        });
        this.updateAuthors();
    }

    ngAfterViewInit() {
        var flex = this.flex;
        if (flex) {

            this.customFilterComp();

            // enable merging
            flex.allowMerging = wjcGrid.AllowMerging.ColumnHeaders;

            // add extra column header row
            var row = new wjcGrid.Row(),
                ch = flex.columnHeaders;

            // initialize header cells
            row.allowMerging = true;
            for (var i = 0; i < flex.columns.length; i++) {
                flex.columns[i].allowMerging = true;
            }
            ch.rows.insert(0, row);
            this.setHeader(ch, 0, 0, 1, 0, 'Sales');
            this.setHeader(ch, 0, 1, 0, 2, 'Book');
            this.setHeader(ch, 0, 3, 0, 3, 'Price');
            this.setHeader(ch, 1, 3, 1, 3, '');
            this.setHeader(ch, 0, 4, 0, 5, 'Delivery Terms');
            this.setHeader(ch, 1, 4, 1, 4, 'In Store');
            this.setHeader(ch, 1, 5, 1, 5, 'Shipping');
            this.setHeader(ch, 0, 6, 1, 6, 'Bestseller');
            this.setHeader(ch, 0, 7, 1, 7, 'Publication Date');
            ch.rows[1].height = ch.rows.defaultSize + 12;

            // enable custom item formatter
            var itf = this.itemFormatter.bind(this);
            flex.itemFormatter = itf;

            // create DataMap for 'shipping' column
            var shippingValues = [
                { key: 1, val: '1 hour' },
                { key: 12, val: '12 hours' },
                { key: 24, val: '24 hours' },
                { key: 24, val: '1 day' },
                { key: 48, val: '2 days' },
                { key: 7 * 24, val: '1 week' },
                { key: -1, val: 'pickup' },
                { key: null, val: 'na' }
            ];
            flex.columns.getColumn('shipping').dataMap = new wjcGrid.DataMap(shippingValues, 'key', 'val');
        }
    }

    // update author list
    private updateAuthors() {
        var authors = this.authors,
            items = this.books.sourceCollection;

        authors.deferUpdate(() => {

            // populate avoiding duplicates
            authors.clear();
            for (var i = 0; i < items.length; i++) {
                var a = items[i].author;
                if (authors.indexOf(a) < 0) {
                    authors.push(a);
                }
            }

            // sort authors
            authors.sort();

            // insert item to remove filter at the first position
            authors.splice(0, 0, '(all authors)');

        });
    }

    private updateFilter(part:string, value:any) {
        if (this.filter[part] != value) {

            // update filter
            this.filter[part] = value;

            // reschedule update
            if (this.toFilter) clearTimeout(this.toFilter);
            this.toFilter = setTimeout(() => {
                this.books.refresh(); // apply new filter
            }, 600);
        }
    }

    private customFilterComp() {

        // title filter
        this.cmbTitle = new wjcInput.ComboBox(document.createElement('div'), {
            placeholder: 'title',
            textChanged: (s, e) => {
                this.updateFilter('title', s.text);
            }
        });

        this.cmbAuth = new wjcInput.ComboBox(document.createElement('div'), {
            placeholder: 'author',
            itemsSource: this.authors,
            textChanged: (s, e) => {
                this.updateFilter('author', s.text);
            }
        });

        // price filter
        this.inPrice = new wjcInput.InputNumber(document.createElement('div'), {
            isRequired: false,
            value: null,
            placeholder: 'max price',
            valueChanged: (s, e) => {
                this.updateFilter('price', s.value);
            }
        });
    }

    // item formatter
    private itemFormatter(panel: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement) {
        var flex = panel.grid,
            row = flex.rows[r],
            col = flex.columns[c],
            sel = flex.selection,
            editCell = flex.activeEditor && sel.row == r && sel.col == c;

        // add filters to column headers
        if (panel.cellType == wjcGrid.CellType.ColumnHeader && r == 1) {
            switch (col.binding) {

                // title filter
                case 'title':
                    cell.innerHTML = '';
                    cell.appendChild(this.cmbTitle.hostElement);
                    break;

                // author filter
                case 'author':
                    cell.innerHTML = '';
                    cell.appendChild(this.cmbAuth.hostElement);
                    break;

                // price filter
                case 'price':
                    cell.innerHTML = '';
                    cell.appendChild(this.inPrice.hostElement);
                    break;
            }
        }

        // customize data cells
        if (panel.cellType == wjcGrid.CellType.Cell && !editCell) {
            switch (col.binding) {

                // use links for titles
                case 'title':
                    cell.innerHTML = wjcCore.format('<a href="{url}" target="_blank">{title}</a>', row.dataItem);
                    break;

                // use color and icons for sales
                case 'sales':
                    cell.innerHTML = wjcCore.format('<span style="color:{color}"><span class="wj-glyph-{dir}" style="float:left;margin:6px"></span> {sales:n0}</span>', {
                        color: row.dataItem.sales > 0 ? 'green' : 'red',
                        dir: row.dataItem.sales > 0 ? 'up' : 'down',
                        sales: row.dataItem.sales
                    });
                    break;
            }
        }
    }

    // set cell header
    private setHeader(p: wjcGrid.GridPanel, r1: number, c1: number, r2: number, c2: number, hdr:string) {
        for (var r = r1; r <= r2; r++) {
            for (var c = c1; c <= c2; c++) {
                p.setCellData(r, c, hdr);
            }
        }
    }
}
@NgModule({
    imports: [WjCoreModule, WjInputModule, WjGridModule, BrowserModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);