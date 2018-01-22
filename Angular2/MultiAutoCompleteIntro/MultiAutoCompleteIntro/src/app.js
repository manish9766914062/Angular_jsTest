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
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("./services/DataSvc");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc) {
        this._cache = {};
        this.countries = dataSvc.getAllCountries();
        this.selectedCountries = ['Belgium', 'Vietnam'];
        this.items = dataSvc.getAllItems();
        // start service so there's no delay when the user starts typing
        var params = { query: 'start', max: 0 };
        $.getJSON('companycatalog.ashx', params);
        this.getCompanies = this._getCompaniesFunc.bind(this);
    }
    // function to retrieve companies using web service   
    AppCmp.prototype._getCompaniesFunc = function (query, max, callback) {
        var _this = this;
        // try getting the result from the cache
        var result = this._cache[query];
        if (result) {
            callback(result);
            return;
        }
        // not in cache, get from server
        var params = { query: query, max: max };
        $.getJSON('companycatalog.ashx', params, function (response) {
            // add 'SymbolName' property to result
            var items = [];
            for (var i = 0; i < response.length; i++) {
                var c = response[i];
                c.SymbolName = c.Symbol + ': ' + c.Name;
            }
            // store result in cache
            if (query !== '') {
                _this._cache[query] = response;
            }
            // and return the result
            callback(response);
        }).fail(function (error) {
            console.log('error: ' + error.responseText);
            _this._cache[query] = null; // << no point in trying this query again
            callback(null);
        });
    };
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
            imports: [wijmo_angular2_input_1.WjInputModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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