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
//var $: any;
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var wijmo_angular2_grid_multirow_1 = require("wijmo/wijmo.angular2.grid.multirow");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("./services/DataSvc");
var ExportSvc_1 = require("./services/ExportSvc");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(dataSvc, exportSvc) {
        this.routes = app_routing_1.routes;
        this.exportSvc = exportSvc;
        this.dataSvc = dataSvc;
        this.culture = 'en';
    }
    Object.defineProperty(AppCmp.prototype, "culture", {
        get: function () {
            return this._culture;
        },
        set: function (value) {
            if (this._culture != value) {
                this._culture = value;
                this._loadCulture(this._culture);
                this.exportSvc.culture = this._culture;
            }
        },
        enumerable: true,
        configurable: true
    });
    AppCmp.prototype._loadCulture = function (culture) {
        var _this = this;
        $.ajax({
            url: 'scripts/vendor/wijmo.culture.' + this._culture + '.js',
            dataType: 'script',
            success: function (data) {
                // culture applied, now load translations
                $.ajax({
                    url: 'src/translations/fields.' + _this._culture + '.js',
                    dataType: 'json',
                    async: false,
                    success: function (data) {
                        _this.fields = data;
                        _this.dataSvc.fields = data;
                    }
                });
            }
        });
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_multirow_1.WjGridMultirowModule, platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_1.routing],
            declarations: [AppCmp],
            providers: [DataSvc_1.DataSvc, ExportSvc_1.ExportSvc],
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