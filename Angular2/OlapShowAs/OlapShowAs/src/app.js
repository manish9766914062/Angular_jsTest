"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcOlap = require("wijmo/wijmo.olap");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_olap_1 = require("wijmo/wijmo.angular2.olap");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.data = [];
        // remove space from percentage values
        wjcCore.culture.Globalize.numberFormat.percent.pattern = ['-n%', 'n%'];
        // create raw data set
        this.initData();
        // create pivot view
        this.initEngine();
    }
    AppCmp.prototype.initData = function () {
        var countries = 'Spain,Russia,Austria,Denmark,Germany'.split(','), colors = 'Red,Green,Blue'.split(','), products = 'Banana,Apple'.split(',');
        for (var i = 0; i <= 25; i++) {
            this.data.push({
                id: i,
                country: countries[i % countries.length],
                color: colors[i % colors.length],
                product: products[i % products.length],
                sales: 10 * i + 100,
                expenses: 5 * i + 30
            });
        }
    };
    AppCmp.prototype.initEngine = function () {
        this.ng = new wjcOlap.PivotEngine({
            autoGenerateFields: false,
            itemsSource: this.data,
            showColumnTotals: wjcOlap.ShowTotals.Subtotals,
            showRowTotals: wjcOlap.ShowTotals.Subtotals,
            fields: [
                { binding: 'country', header: 'Country' },
                { binding: 'color', header: 'Color' },
                { binding: 'product', header: 'Product' },
                { binding: 'sales', header: 'Sales' },
                { binding: 'sales', header: 'DiffRow', showAs: 'DiffRow' },
                { binding: 'sales', header: 'DiffRowPct', showAs: 'DiffRowPct', format: 'p2' },
                { binding: 'sales', header: 'DiffCol', showAs: 'DiffCol' },
                { binding: 'sales', header: 'DiffColPct', showAs: 'DiffColPct', format: 'p2' },
                { binding: 'sales', header: 'PctGrand', showAs: 'PctGrand', format: 'p2' },
                { binding: 'sales', header: 'PctRow', showAs: 'PctRow', format: 'p2' },
                { binding: 'sales', header: 'PctCol', showAs: 'PctCol', format: 'p2' },
                { binding: 'sales', header: 'RunTot', showAs: 'RunTot' },
                { binding: 'sales', header: 'RunTotPct', showAs: 'RunTotPct', format: 'p2' },
            ],
            rowFields: ['Country', 'Color'],
            columnFields: ['Product'],
            valueFields: [
                'Sales',
                'PctGrand', 'PctCol', 'PctRow', 'RunTot', 'RunTotPct',
                'DiffRow', 'DiffRowPct', 'DiffCol', 'DiffColPct'
            ]
        });
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
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_olap_1.WjOlapModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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