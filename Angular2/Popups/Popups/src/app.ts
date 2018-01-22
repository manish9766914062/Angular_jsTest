import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { FrmCreateAccountCmp } from './components/FrmCreateAccountCmp';
import { FrmEditAccountCmp } from './components/FrmEditAccountCmp';
import { FrmLogInCmp } from './components/FrmLogInCmp';
import { PopoverCmp } from './components/PopoverCmp';
import { PopoverFormCmp } from './components/PopoverFormCmp';
import { EqualValidator } from './validators/EqualValidator';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    // using the Popup control with Promises
    browserSupportsPromises = typeof Promise !== 'undefined';
    @ViewChild('frmLogIn') frmLogIn: wjcInput.Popup;

    constructor() {
    }

    // add/remove classes used for custom animation
    showingAnimated(popup: any) {
        setTimeout(() => {
            wjcCore.toggleClass(popup.hostElement, 'custom-animation-visible', true);
        });
    }

    hidingAnimated(popup: any) {
        setTimeout(() => {
            wjcCore.toggleClass(popup.hostElement, 'custom-animation-visible', false);
        });
    }

    submitAccountForm(arg: any, frmCreateAccount: wjcInput.Popup) {
        if (arg.valid) {
            frmCreateAccount.hide();
        }
    }

    popupPromise() {

        // get the promise
        var promise = this.getPopupPromise();

        // execute the promise
        promise.then(
             (result)=> {
                console.log('** Promise was resolved, handle the dialog data');
            },
             (err)=> {
                console.log('** Promise was rejected, ignore the dialog data');
            });
    }

    // get a promise for a popup
    getPopupPromise() {
        var p = new Promise((resolve, reject) => {
            var popup = this.frmLogIn;
            popup.show(true);
            popup.hidden.addHandler(() => {
                popup.hidden.removeAllHandlers();
                if (popup.dialogResult == 'wj-hide') {
                    reject(popup);
                } else {                    
                    resolve(popup);
                }
            });
        });
        return p;
    }
}


@NgModule({
    imports: [WjInputModule, BrowserModule, FormsModule],
    declarations: [FrmCreateAccountCmp, FrmEditAccountCmp, FrmLogInCmp, PopoverCmp, PopoverFormCmp, EqualValidator, AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);