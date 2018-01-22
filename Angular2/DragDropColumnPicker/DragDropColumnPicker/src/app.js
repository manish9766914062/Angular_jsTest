'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var wijmo_angular2_core_1 = require("wijmo/wijmo.angular2.core");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var DragDropTouch_1 = require("./DragDropTouch");
//import { ColumnPicker } from './ColumnPicker';
var WjColumnPicker_1 = require("./components/WjColumnPicker");
//// AppCmp  component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.data = this._getData(200);
    }
    // show column picker for the grid
    AppCmp.prototype.pickColumns = function () {
        var _this = this;
        // show column picker in a dialog
        this.picker.load();
        this.dlgColumns.show(true, function (s) {
            var dr = s.dialogResult;
            if (dr && dr.indexOf('apply') > -1) {
                _this.picker.save();
            }
        });
    };
    // some random data
    AppCmp.prototype._getData = function (count) {
        var data = [], countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'], products = ['Widget', 'Gadget', 'Doohickey'], colors = ['Black', 'White', 'Red', 'Green', 'Blue'], dt = new Date();
        for (var i = 0; i < count; i++) {
            var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
            var item = {
                id: i,
                start: date,
                end: date,
                country: countries[countryId],
                product: products[productId],
                color: colors[colorId],
                countryId: countryId,
                productId: productId,
                colorId: colorId,
                amount: Math.random() * 10000 - 5000,
                amount2: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0,
            };
            data.push(item);
        }
        return data;
    };
    __decorate([
        core_1.ViewChild('picker')
    ], AppCmp.prototype, "picker", void 0);
    __decorate([
        core_1.ViewChild('dlgColumns')
    ], AppCmp.prototype, "dlgColumns", void 0);
    __decorate([
        core_1.ViewChild('flex')
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
            imports: [platform_browser_1.BrowserModule, wijmo_angular2_core_1.WjCoreModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_input_1.WjInputModule],
            declarations: [WjColumnPicker_1.WjColumnPicker, AppCmp],
            providers: [DragDropTouch_1.DataTransfer, DragDropTouch_1.DragDropTouch],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map