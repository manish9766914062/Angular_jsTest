"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcOlap = require("wijmo/wijmo.olap");
var wjcGridXlsx = require("wijmo/wijmo.grid.xlsx");
var wjcXlsx = require("wijmo/wijmo.xlsx");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_olap_1 = require("wijmo/wijmo.angular2.olap");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var AppTab_1 = require("./components/AppTab");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        this.legendVisibility = [
            { name: 'Always', value: wjcOlap.LegendVisibility.Always },
            { name: 'Never', value: wjcOlap.LegendVisibility.Never },
            { name: 'Automatic', value: wjcOlap.LegendVisibility.Auto }
        ];
        this.dataSvc = dataSvc;
        this.dataSets = this.dataSvc.initDataSets();
        this.showTotals = this.dataSvc.initShowTotals();
        this.chartTypes = this.dataSvc.initChartTypes();
        this.viewDefs = this.dataSvc.initViewDefs();
        this.rawData = this.dataSets[0].value;
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
    AppCmp.prototype.ngAfterViewInit = function () {
        var ng = this.thePanel.engine;
        ng.rowFields.push('Product', 'Country');
        ng.valueFields.push('Sales', 'Downloads');
        ng.showRowTotals = wjcOlap.ShowTotals.Subtotals;
        ng.showColumnTotals = wjcOlap.ShowTotals.Subtotals;
    };
    AppCmp.prototype.formatItem = function (s, e) {
        if (e.panel == s.cells && e.col % 2 == 1) {
            var value = s.getCellData(e.row, e.col, false), color = '#d8b400', glyph = 'circle';
            if (value != null) {
                if (value < 0) {
                    color = '#9f0000';
                    glyph = 'down';
                }
                else if (value > 0.05) {
                    color = '#4c8f00';
                    glyph = 'down';
                }
                e.cell.style.color = color;
                e.cell.innerHTML += ' <span style="font-size:120%" class="wj-glyph-' + glyph + '"></span>';
            }
        }
    };
    // save/restore view definitions
    AppCmp.prototype.saveView = function () {
        var ng = this.thePanel.engine;
        if (ng.isViewDefined) {
            localStorage.viewDefinition = ng.viewDefinition;
        }
    };
    AppCmp.prototype.loadView = function (def) {
        var ng = this.thePanel.engine;
        if (def) {
            // load pre-defined view (against specific dataset)
            this.rawData = this.dataSets[3].value;
            ng.itemsSource = this.rawData;
            ng.viewDefinition = def;
        }
        else {
            // load view from localStorage (whatever the user saved)
            ng.viewDefinition = localStorage.viewDefinition;
        }
    };
    // export pivot table and raw data to Excel
    AppCmp.prototype.export = function () {
        var ng = this.thePanel.engine;
        // create book with current view
        var book = wjcGridXlsx.FlexGridXlsxConverter.save(this.pivotGrid, {
            includeColumnHeaders: true,
            includeRowHeaders: true
        });
        book.sheets[0].name = 'Main View';
        this.addTitleCell(book.sheets[0], this.getViewTitle(ng));
        // add sheet with transposed view
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
        // save the book
        book.save('wijmo.olap.xlsx');
    };
    // save/load/transpose/export views
    AppCmp.prototype.transposeView = function (ng) {
        ng.deferUpdate(function () {
            // save row/col fields
            var rows = [], cols = [];
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
    };
    // build a title for the current view
    AppCmp.prototype.getViewTitle = function (ng) {
        var title = '';
        for (var i = 0; i < ng.valueFields.length; i++) {
            if (i > 0)
                title += ', ';
            title += ng.valueFields[i].header;
        }
        title += ' by ';
        if (ng.rowFields.length) {
            for (var i = 0; i < ng.rowFields.length; i++) {
                if (i > 0)
                    title += ', ';
                title += ng.rowFields[i].header;
            }
        }
        if (ng.rowFields.length && ng.columnFields.length) {
            title += ' and by ';
        }
        if (ng.columnFields.length) {
            for (var i = 0; i < ng.columnFields.length; i++) {
                if (i > 0)
                    title += ', ';
                title += ng.columnFields[i].header;
            }
        }
        return title;
    };
    // adds a title cell into an xlxs sheet
    AppCmp.prototype.addTitleCell = function (sheet, title) {
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
    };
    __decorate([
        core_1.ViewChild('thePanel')
    ], AppCmp.prototype, "thePanel", void 0);
    __decorate([
        core_1.ViewChild('pivotGrid')
    ], AppCmp.prototype, "pivotGrid", void 0);
    __decorate([
        core_1.ViewChild('rawGrid')
    ], AppCmp.prototype, "rawGrid", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_olap_1.WjOlapModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, AppTab_1.TabsModule],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc],
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