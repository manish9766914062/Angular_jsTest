"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var FormCmp_1 = require("./components/FormCmp");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.mainItem = {
            name: null,
            email: '',
            country: '',
            dateTime: null,
            quantity: null,
            discount: null,
            creditCard: '',
            favoriteColors: []
        };
        this.dlgItem = AppCmp_1.clone(this.mainItem);
    }
    AppCmp_1 = AppCmp;
    // edit the item using a modal dialog
    AppCmp.prototype.editItem = function () {
        var _this = this;
        // save the original data to undo later if necessary
        var original = AppCmp_1.clone(this.dlgItem);
        // show the dialog
        // and undo changes if the user didn't click the OK button
        this.modalDialog.show(true, function (e) {
            if (e.dialogResult != 'wj-hide-ok') {
                for (var k in original) {
                    _this.dlgItem[k] = original[k];
                }
            }
        });
    };
    // changes have been accepted, hide dialog
    AppCmp.prototype.submitForm = function (isValid) {
        if (isValid) {
            this.modalDialog.hide('wj-hide-ok');
        }
    };
    AppCmp.clone = function (obj) {
        var c = {};
        for (var k in obj) {
            c[k] = obj[k];
        }
        return c;
    };
    __decorate([
        core_1.ViewChild('modalDialog')
    ], AppCmp.prototype, "modalDialog", void 0);
    AppCmp = AppCmp_1 = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        })
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
            imports: [forms_1.FormsModule, wijmo_angular2_input_1.WjInputModule, platform_browser_1.BrowserModule],
            declarations: [FormCmp_1.FormCmp, AppCmp],
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