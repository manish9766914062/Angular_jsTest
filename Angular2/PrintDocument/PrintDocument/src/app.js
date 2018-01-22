"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcGrid = require("wijmo/wijmo.grid");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this._groupData = false;
        // generate some random data
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = [], groupDescrpition;
        for (var i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28 + 1),
                amount: (i % 123) * 10000,
                active: i % 4 == 0,
                discount: Math.random() * .4
            });
        }
        this.view = new wjcCore.CollectionView(data);
        this.groupDescrpition = new wjcCore.PropertyGroupDescription('country');
    }
    Object.defineProperty(AppCmp.prototype, "groupData", {
        get: function () {
            return this._groupData;
        },
        set: function (value) {
            this.view.groupDescriptions.clear();
            if (value) {
                this._groupData = value;
                this.view.groupDescriptions.push(this.groupDescrpition);
            }
        },
        enumerable: true,
        configurable: true
    });
    // print directly
    AppCmp.prototype.printWindow = function () {
        window.print();
    };
    AppCmp.prototype.printDocument = function (flex) {
        // create PrintDocument
        var doc = new wjcCore.PrintDocument({
            title: 'PrintDocument Test'
        });
        // add some simple text
        doc.append('<h1>Printing Example</h1>');
        doc.append('<p>This document was created using the <b>PrintDocument</b> class.</p>');
        // add existing elements
        doc.append('<h2>Render Existing Elements</h2>');
        doc.append('<p>It contains some elements that are hosted on the main page:</p>');
        doc.append(document.getElementById('titleDiv'));
        doc.append(document.getElementById('gaugeDiv'));
        // add a printer-friendly version of a FlexGrid to the document
        if (flex) {
            doc.append('<h2>Printer-Friendly FlexGrid</h2>');
            doc.append('<p>It also contains some custom-generated content. ' +
                'Here is a printer-friendly version of a <b>FlexGrid</b> with ' +
                wjcCore.format(flex.rows.length + '', 'n0') + ' rows:</p>');
            var tbl = this.renderTable(flex);
            doc.append(tbl);
        }
        // print the document
        doc.print();
    };
    // renders a FlexGrid as a printer-friendly table element
    AppCmp.prototype.renderTable = function (flex) {
        // start table
        var tbl = '<table>';
        // headers
        if (flex.headersVisibility & wjcGrid.HeadersVisibility.Column) {
            tbl += '<thead>';
            for (var r = 0; r < flex.columnHeaders.rows.length; r++) {
                tbl += this.renderRow(flex.columnHeaders, r);
            }
            tbl += '</thead>';
        }
        // body
        tbl += '<tbody>';
        for (var r = 0; r < flex.rows.length; r++) {
            tbl += this.renderRow(flex.cells, r);
        }
        tbl += '</tbody>';
        // done
        tbl += '</table>';
        return tbl;
    };
    AppCmp.prototype.renderRow = function (panel, r) {
        var tr = '', row = panel.rows[r], nextCol = -1;
        if (row.renderSize > 0) {
            // start row/group row
            tr += row instanceof wjcGrid.GroupRow
                ? '<tr style="font-weight:bold;height:2em;border-top:2px solid grey">'
                : '<tr>';
            // render each column
            for (var c = 0; c < panel.columns.length; c++) {
                var col = panel.columns[c];
                if (col.renderSize > 0 && c >= nextCol) {
                    var colSpan = '', mergedRange = null;
                    // get cell content
                    var content = panel.getCellData(r, c, true), data = panel.getCellData(r, c, false), isHtml = row.isContentHtml || col.isContentHtml;
                    if (!isHtml && wjcCore.isString(data)) {
                        content = wjcCore.escapeHtml(content);
                    }
                    if (wjcCore.isBoolean(data)) {
                        content = data ? '&#9745;' : '&#9744;';
                    }
                    if (row instanceof wjcGrid.GroupRow && c == panel.columns.firstVisibleIndex) {
                        content = row.getGroupHeader();
                    }
                    // handle merged cells
                    mergedRange = panel.grid.getMergedRange(panel, r, c, false);
                    if (mergedRange && mergedRange.columnSpan > 1) {
                        colSpan = ' colspan="' + mergedRange.columnSpan + '"';
                        nextCol = c + mergedRange.columnSpan;
                    }
                    // get cell style 
                    var style = 'width:' + (mergedRange ? mergedRange.getRenderSize(panel).width : col.renderSize) + 'px;';
                    if (col.getAlignment()) {
                        style += 'text-align:' + col.getAlignment() + ';';
                    }
                    // add cell to row
                    if (panel.cellType == wjcGrid.CellType.ColumnHeader) {
                        tr += '<th style="' + style + '"' + colSpan + '>' + content + '</th>';
                    }
                    else {
                        tr += '<td style="' + style + '"' + colSpan + '>' + content + '</td>';
                    }
                }
            }
            // close row
            tr += '</tr>';
        }
        return tr;
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        })
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_gauge_1.WjGaugeModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map