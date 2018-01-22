import * as wjcInput from 'wijmo/wijmo.input';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { FormCmp } from './components/FormCmp';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    mainItem = {
        name: null,
        email: '',
        country: '',
        dateTime: null,
        quantity: null,
        discount: null,
        creditCard: '',
        favoriteColors: []
    };
    dlgItem = AppCmp.clone(this.mainItem);
    @ViewChild('modalDialog') modalDialog: wjcInput.Popup;

    constructor() {
    }

    // edit the item using a modal dialog
    editItem() {

        // save the original data to undo later if necessary
        var original = AppCmp.clone(this.dlgItem);

        // show the dialog
        // and undo changes if the user didn't click the OK button
        this.modalDialog.show(true, (e: any) => {
            if (e.dialogResult != 'wj-hide-ok') {
                for (var k in original) {
                    this.dlgItem[k] = original[k];
                }
            }
        });
    }

    // changes have been accepted, hide dialog
    submitForm(isValid: boolean) {
        if(isValid) {
            this.modalDialog.hide('wj-hide-ok');
        }
    }

    static clone(obj: any) {
        var c = {};
        for (var k in obj) {
            c[k] = obj[k];
        }
        return c;
    }
}


@NgModule({
    imports: [FormsModule, WjInputModule, BrowserModule ],
    declarations: [FormCmp, AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);