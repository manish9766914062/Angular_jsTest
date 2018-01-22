"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcOData = require("wijmo/wijmo.oData");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcGridFilter = require("wijmo/wijmo.grid.filter");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this._url = 'http://services.odata.org/V4/Northwind/Northwind.svc';
    }
    // initialize an ODataCollectionView and bind it to a grid
    AppCmp.prototype.initODataCollectionView = function (s) {
        // declare collection view
        var cv = new wjcOData.ODataCollectionView(this._url, 'Order_Details_Extendeds', {
            oDataVersion: 4
        });
        // use virtual collection as grid data source
        var flex = s;
        flex.itemsSource = cv;
        // show row indices in row header cells
        flex.formatItem.addHandler(function (s, e) {
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = e.row;
            }
        });
        // add a filter
        var filter = new wjcGridFilter.FlexGridFilter(flex);
    };
    // initialize an ODataVirtualCollectionView and bind it to a grid
    AppCmp.prototype.initODataVirtualCollectionView = function (s) {
        // declare virtual collection view
        var vcv = new wjcOData.ODataVirtualCollectionView(this._url, 'Order_Details_Extendeds', {
            oDataVersion: 4
        });
        // use virtual collection as grid data source
        var flex = s;
        flex.itemsSource = vcv;
        // update data window when the grid scrolls
        flex.scrollPositionChanged.addHandler(function () {
            var rng = flex.viewRange;
            vcv.setWindow(rng.row, rng.row2);
        });
        // show row indices in row header cells
        flex.formatItem.addHandler(function (s, e) {
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = e.row;
            }
        });
        // add a filter
        var filter = new wjcGridFilter.FlexGridFilter(flex);
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
            imports: [wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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