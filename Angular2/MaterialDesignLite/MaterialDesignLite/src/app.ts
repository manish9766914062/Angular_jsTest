import * as wjcCore from 'wijmo/wijmo';
declare var componentHandler: any;
// Angular
import { Component, EventEmitter, AfterViewInit, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { ColorWheelCmp } from './components/ColorWheelCmp';
import { BootstrapWijmo } from './wijmo.material';
'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp implements AfterViewInit {

    static CSS_WIJMO = 'http://cdn.wijmo.com/5.latest/styles/themes/material/wijmo.theme.material.{colors}.min.css';
    static CSS_MDL = 'https://code.getmdl.io/1.1.1/material.{colors}.min.css';

    wijmoUrl: string;
    materialUrl: string;
    swijmoUrl: SafeResourceUrl;
    smaterialUrl: SafeResourceUrl;
    primary: string;
    accent: string;
    isEven = true;
    palette = [
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
    theNumber = 0;
    theGaugeValue = 80;
    theDateTime = new Date(2016, 2, 2, 13, 30);

    private _sanitizer: DomSanitizer;

    constructor(@Inject(DomSanitizer) sanitizer: DomSanitizer) {
        this._sanitizer = sanitizer;
    }

    ngAfterViewInit() {

        //// bootstrap Wijmo's MDL support when the document loads
        if (BootstrapWijmo) {
            new BootstrapWijmo();
        }
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }        
    }

    themeChanged(s:any) {
        if (s.primary && s.accent) {
            var colors = s.primary.toLowerCase().replace(/ /g, '_') + '-' + s.accent.toLowerCase().replace(/ /g, '_');
            this.wijmoUrl = AppCmp.CSS_WIJMO.replace('{colors}', colors);
            this.materialUrl = AppCmp.CSS_MDL.replace('{colors}', colors);
            this.swijmoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.wijmoUrl);
            this.smaterialUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.materialUrl);
            this.primary = s.primary;
            this.accent = s.accent;
        }
    }

    // download minified CSS for the current theme
    downloadCss():boolean {
        var a = document.createElement("a");
        a.download = 'wijmo.theme.material.min.css';
        a.href = this.wijmoUrl;
        a.click();
        return false;
    }

    checkEven(num: number) {
        if (num === undefined) {
            this.isEven = true;
        } else if (wjcCore.isNumber(num) && num % 2 == 0) {
            this.isEven = true;
        } else {
            this.isEven = false;
        }
    }

}


@NgModule({
    imports: [WjInputModule, WjGridModule, WjGridFilterModule, WjGaugeModule, BrowserModule, FormsModule],
    declarations: [ColorWheelCmp, AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);