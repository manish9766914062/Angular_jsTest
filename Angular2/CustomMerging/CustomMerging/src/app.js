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
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var CustomMergeManager_1 = require("./CustomMergeManager");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
    }
    AppCmp.prototype.initCustomMerge = function (flex) {
        // set custom merge manager
        flex.mergeManager = new CustomMergeManager_1.CustomMergeManager(flex);
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
    };
    AppCmp.prototype.formatItem = function (s, e) {
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
    };
    AppCmp.prototype._setData = function (p, r, cells) {
        // first element in row header
        if (p.cellType == wjcGrid.CellType.Cell) {
            p.grid.rowHeaders.setCellData(r, 0, cells[0]);
        }
        // other elements in row
        for (var i = 1; i < cells.length; i++) {
            p.setCellData(r, i - 1, cells[i]);
        }
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
            imports: [wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule],
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