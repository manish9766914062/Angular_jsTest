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
var FrmCreateAccountCmp_1 = require("./components/FrmCreateAccountCmp");
var FrmEditAccountCmp_1 = require("./components/FrmEditAccountCmp");
var FrmLogInCmp_1 = require("./components/FrmLogInCmp");
var PopoverCmp_1 = require("./components/PopoverCmp");
var PopoverFormCmp_1 = require("./components/PopoverFormCmp");
var EqualValidator_1 = require("./validators/EqualValidator");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        // using the Popup control with Promises
        this.browserSupportsPromises = typeof Promise !== 'undefined';
    }
    // add/remove classes used for custom animation
    AppCmp.prototype.showingAnimated = function (popup) {
        setTimeout(function () {
            wjcCore.toggleClass(popup.hostElement, 'custom-animation-visible', true);
        });
    };
    AppCmp.prototype.hidingAnimated = function (popup) {
        setTimeout(function () {
            wjcCore.toggleClass(popup.hostElement, 'custom-animation-visible', false);
        });
    };
    AppCmp.prototype.submitAccountForm = function (arg, frmCreateAccount) {
        if (arg.valid) {
            frmCreateAccount.hide();
        }
    };
    AppCmp.prototype.popupPromise = function () {
        // get the promise
        var promise = this.getPopupPromise();
        // execute the promise
        promise.then(function (result) {
            console.log('** Promise was resolved, handle the dialog data');
        }, function (err) {
            console.log('** Promise was rejected, ignore the dialog data');
        });
    };
    // get a promise for a popup
    AppCmp.prototype.getPopupPromise = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            var popup = _this.frmLogIn;
            popup.show(true);
            popup.hidden.addHandler(function () {
                popup.hidden.removeAllHandlers();
                if (popup.dialogResult == 'wj-hide') {
                    reject(popup);
                }
                else {
                    resolve(popup);
                }
            });
        });
        return p;
    };
    __decorate([
        core_1.ViewChild('frmLogIn')
    ], AppCmp.prototype, "frmLogIn", void 0);
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
            imports: [wijmo_angular2_input_1.WjInputModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [FrmCreateAccountCmp_1.FrmCreateAccountCmp, FrmEditAccountCmp_1.FrmEditAccountCmp, FrmLogInCmp_1.FrmLogInCmp, PopoverCmp_1.PopoverCmp, PopoverFormCmp_1.PopoverFormCmp, EqualValidator_1.EqualValidator, AppCmp],
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