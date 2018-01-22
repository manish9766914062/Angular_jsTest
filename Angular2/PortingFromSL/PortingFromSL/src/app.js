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
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        var _this = this;
        // URL to Northwind service
        this.svcUrl = 'http://services.odata.org/Northwind/Northwind.svc';
        this.queryResources = [];
        // create customers, orders, details view
        this.customers = new wjcCore.CollectionView();
        this.orders = new wjcCore.CollectionView();
        this.details = new wjcCore.CollectionView();
        // when the current customer changes, get his orders
        this.customers.currentChanged.addHandler(function () {
            _this.orders.sourceCollection = [];
            _this.details.sourceCollection = [];
            var customer = _this.customers.currentItem;
            if (customer) {
                _this.loadData(_this.svcUrl, _this.orders, 'Customers(\'' + customer.CustomerID + '\')/Orders', {
                    OrderDate: wjcCore.DataType.Date,
                    RequiredDate: wjcCore.DataType.Date,
                    ShippedDate: wjcCore.DataType.Date,
                    Freight: wjcCore.DataType.Number
                });
            }
        });
        // when the current order changes, get the order details
        this.orders.currentChanged.addHandler(function () {
            _this.details.sourceCollection = [];
            var order = _this.orders.currentItem;
            if (order) {
                _this.loadData(_this.svcUrl, _this.details, 'Orders(' + order.OrderID + ')/Order_Details', {
                    UnitPrice: wjcCore.DataType.Number
                });
            }
        });
    }
    // handle clicks on the Start button
    AppCmp.prototype.startButton_Click = function () {
        // clear query history
        this.queryResources = [];
        // load the customers.
        this.loadData(this.svcUrl, this.customers, 'Customers');
    };
    // utility to load OData into a CollectionView
    AppCmp.prototype.loadData = function (baseUrl, view, table, types) {
        var _this = this;
        // build url
        var url = baseUrl + '/' + table;
        url += (url.indexOf('?') < 0) ? '?' : '&';
        url += '$format=json';
        // update query history
        this.queryResources.push({
            table: table.indexOf('/') > -1 ? table.split('/')[1] : table.split('?')[0],
            url: url
        });
        // go get the data
        wjcCore.httpRequest(url, {
            success: function (xhr) {
                // append new items
                var data = JSON.parse(xhr.response);
                for (var i = 0; i < data.value.length; i++) {
                    // convert data types (JSON doesn't do dates...)
                    var item = data.value[i];
                    if (types) {
                        for (var key in types) {
                            if (item[key]) {
                                item[key] = wjcCore.changeType(item[key], types[key], null);
                            }
                        }
                    }
                    // add item to collection
                    view.sourceCollection.push(item);
                }
                // continue loading more data or refresh and apply to update scope
                if (data['odata.nextLink']) {
                    _this.loadData(baseUrl, view, data['odata.nextLink']);
                }
                else {
                    view.refresh();
                    view.moveCurrentToFirst();
                }
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