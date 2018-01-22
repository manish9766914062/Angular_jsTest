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
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var CustomCellFactory_1 = require("./CustomCellFactory");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.data = this._createData(100, 900);
    }
    AppCmp.prototype.setRenderMode = function (renderMode) {
        switch (renderMode) {
            case 'CustomCellFactory':
                this.flex.cellFactory = new CustomCellFactory_1.CustomCellFactory();
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
    };
    AppCmp.prototype.initGrid = function (flex) {
        flex.rows.forEach(function (item) {
            item.height = 35;
        });
        flex.columns.forEach(function (item) {
            item.width = 35;
            item.align = '';
        });
        this.setRenderMode('CustomCellFactory');
    };
    // itemFormatter function
    AppCmp.prototype._itemFormatter = function (p, r, c, cell) {
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
    };
    // create some data for the sample  
    AppCmp.prototype._createData = function (rows, cols) {
        var data = [];
        for (var r = 0; r < rows; r++) {
            data[r] = [];
            for (var c = 0; c < cols; c++) {
                data[r][c] = r + c;
            }
        }
        return data;
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], AppCmp.prototype, "flex", void 0);
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
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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