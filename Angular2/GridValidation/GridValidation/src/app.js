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
        this.showErrors = true;
        this.validateEdits = true;
        this.customValidation = false;
        this._initData();
    }
    AppCmp.prototype.enableCustomValidation = function (flex) {
        var _this = this;
        flex.cellEditEnded.addHandler(function (s, e) {
            if (_this.customValidation && !s.activeEditor) {
                _this.showErrors = true; // show errors so user knows what's going on
                _this.validateEdits = true; // customValidation (row) implies validateEdits (cell)
                var item = s.rows[e.row].dataItem;
                s.columns.forEach(function (col) {
                    if (s.collectionView.getError(item, col.binding)) {
                        s.startEditing(true, e.row, col.index);
                        return;
                    }
                });
            }
        });
    };
    // create some data for the sample  
    AppCmp.prototype._initData = function () {
        var data = [], countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), customers = [
            { id: 0, firstName: 'John', lastName: 'Lennon' },
            { id: 1, firstName: 'Paul', lastName: 'McCartney' },
            { id: 2, firstName: 'Ringo', lastName: 'Starr' },
            { id: 3, firstName: 'George', lastName: 'Harrison' },
        ];
        for (var i = 0; i < 10 * countries.length; i++) {
            data.push({
                customer: customers[i % customers.length],
                country: countries[i % countries.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                active: i % 2 == 0
            });
        }
        this.data = new wjcCore.CollectionView(data, {
            // initialize new items
            newItemCreator: function () {
                return {
                    customer: customers[0],
                    country: countries[0],
                    downloads: 0,
                    sales: 0,
                    expenses: 0,
                    active: false
                };
            },
            // validation code (logic only!)
            getError: function (item, property) {
                switch (property) {
                    case 'country':
                        return countries.indexOf(item.country) < 0
                            ? 'Invalid Country'
                            : null;
                    case 'downloads':
                    case 'sales':
                    case 'expenses':
                        return item[property] < 1000
                            ? 'Cannot be less than 1,000!'
                            : null;
                    case 'active':
                        return item.active && item.country.match(/US|UK/)
                            ? 'Active items are not allowed in the US or UK!'
                            : null;
                    case 'customer.firstName':
                        return item.customer.firstName.match(/^(John|Paul|Ringo|George)$/)
                            ? null
                            : 'That\'s not a Beatle!!';
                    case 'customer.lastName':
                        return item.customer.lastName.match(/^(Lennon|McCartney|Starr|Harrison)$/)
                            ? null
                            : 'That\'s not a Beatle!!';
                }
                return null;
            }
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