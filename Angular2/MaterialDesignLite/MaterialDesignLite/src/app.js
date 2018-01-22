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
var wjcCore = require("wijmo/wijmo");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
var ColorWheelCmp_1 = require("./components/ColorWheelCmp");
var wijmo_material_1 = require("./wijmo.material");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(sanitizer) {
        this.isEven = true;
        this.palette = [
            { name: 'Cyan', outer: 'rgb(0, 188, 212)', inner: 'rgb(0, 151, 167)' },
            { name: 'Teal', outer: 'rgb(0, 150, 136)', inner: 'rgb(0, 121, 107)' },
            { name: 'Green', outer: 'rgb(76, 175, 80)', inner: 'rgb(56, 142, 60)' },
            { name: 'Light Green', outer: 'rgb(139, 195, 74)', inner: 'rgb(104, 159, 56)' },
            { name: 'Lime', outer: 'rgb(205, 220, 57)', inner: 'rgb(175, 180, 43)' },
            { name: 'Yellow', outer: 'rgb(255, 235, 59)', inner: 'rgb(251, 192, 45)' },
            { name: 'Amber', outer: 'rgb(255, 193, 7)', inner: 'rgb(255, 160, 0)' },
            { name: 'Orange', outer: 'rgb(255, 152, 0)', inner: 'rgb(245, 124, 0)' },
            { name: 'Brown', outer: 'rgb(121, 85, 72)', inner: 'rgb(93, 64, 55)', primary: true },
            { name: 'Blue Grey', outer: 'rgb(96, 125, 139)', inner: 'rgb(69, 90, 100)', primary: true },
            { name: 'Grey', outer: 'rgb(158, 158, 158)', inner: 'rgb(97, 97, 97)', primary: true },
            { name: 'Deep Orange', outer: 'rgb(255, 87, 34)', inner: 'rgb(230, 74, 25)' },
            { name: 'Red', outer: 'rgb(244, 67, 54)', inner: 'rgb(211, 47, 47)' },
            { name: 'Pink', outer: 'rgb(233, 30, 99)', inner: 'rgb(194, 24, 91)' },
            { name: 'Purple', outer: 'rgb(156, 39, 176)', inner: 'rgb(123, 31, 162)' },
            { name: 'Deep Purple', outer: 'rgb(103, 58, 183)', inner: 'rgb(81, 45, 168)' },
            { name: 'Indigo', outer: 'rgb(63, 81, 181)', inner: 'rgb(48, 63, 159)' },
            { name: 'Blue', outer: 'rgb(33, 150, 243)', inner: 'rgb(25, 118, 210)' },
            { name: 'Light Blue', outer: 'rgb(3, 169, 244)', inner: 'rgb(2, 136, 209)' }
        ];
        // values input controls in the preview
        this.theNumber = 0;
        this.theGaugeValue = 80;
        this.theDateTime = new Date(2016, 2, 2, 13, 30);
        this._sanitizer = sanitizer;
    }
    AppCmp_1 = AppCmp;
    AppCmp.prototype.ngAfterViewInit = function () {
        //// bootstrap Wijmo's MDL support when the document loads
        if (wijmo_material_1.BootstrapWijmo) {
            new wijmo_material_1.BootstrapWijmo();
        }
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    };
    AppCmp.prototype.themeChanged = function (s) {
        if (s.primary && s.accent) {
            var colors = s.primary.toLowerCase().replace(/ /g, '_') + '-' + s.accent.toLowerCase().replace(/ /g, '_');
            this.wijmoUrl = AppCmp_1.CSS_WIJMO.replace('{colors}', colors);
            this.materialUrl = AppCmp_1.CSS_MDL.replace('{colors}', colors);
            this.swijmoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.wijmoUrl);
            this.smaterialUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.materialUrl);
            this.primary = s.primary;
            this.accent = s.accent;
        }
    };
    // download minified CSS for the current theme
    AppCmp.prototype.downloadCss = function () {
        var a = document.createElement("a");
        a.download = 'wijmo.theme.material.min.css';
        a.href = this.wijmoUrl;
        a.click();
        return false;
    };
    AppCmp.prototype.checkEven = function (num) {
        if (num === undefined) {
            this.isEven = true;
        }
        else if (wjcCore.isNumber(num) && num % 2 == 0) {
            this.isEven = true;
        }
        else {
            this.isEven = false;
        }
    };
    AppCmp.CSS_WIJMO = 'http://cdn.wijmo.com/5.latest/styles/themes/material/wijmo.theme.material.{colors}.min.css';
    AppCmp.CSS_MDL = 'https://code.getmdl.io/1.1.1/material.{colors}.min.css';
    AppCmp = AppCmp_1 = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(platform_browser_1.DomSanitizer))
    ], AppCmp);
    return AppCmp;
    var AppCmp_1;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, wijmo_angular2_gauge_1.WjGaugeModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [ColorWheelCmp_1.ColorWheelCmp, AppCmp],
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