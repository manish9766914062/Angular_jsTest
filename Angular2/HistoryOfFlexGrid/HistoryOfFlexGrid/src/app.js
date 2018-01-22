"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.data = new wjcCore.CollectionView(this._getData(100));
    }
    AppCmp.prototype.iniFlexWin95 = function (flexWin95) {
        flexWin95.cells.rows.defaultSize = 17;
        flexWin95.columnHeaders.rows.defaultSize = 17;
    };
    AppCmp.prototype.iniFlexWMobile = function (flexWinMobile) {
        flexWinMobile.cells.rows.defaultSize = 15;
        flexWinMobile.columnHeaders.rows.defaultSize = 15;
        flexWinMobile.cells.columns.minSize = 50;
        flexWinMobile.autoSizeColumns();
    };
    // create some data for the sample  
    AppCmp.prototype._getData = function (count) {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), data = new wjcCore.ObservableArray();
        for (var i = 0; i < count; i++) {
            data.push({
                Id: i,
                Country: countries[i % countries.length],
                Date: new Date(2014, i % 12, i % 28),
                Amount: Math.random() * 10000
            });
        }
        return data;
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
            imports: [wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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