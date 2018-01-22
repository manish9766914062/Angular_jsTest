import * as wjcViewer from 'wijmo/wijmo.viewer';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjViewerModule } from 'wijmo/wijmo.angular2.viewer';
import { TabsModule } from './components/AppTab';

'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    serviceUrl = 'http://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/pdf';
    filePath = 'PdfRoot/DefaultDocument.pdf';
    fullScreen = false;
    mouseMode = wjcViewer.MouseMode.SelectTool;
    zoomFactor = 1;

    @ViewChild('pdfViewer') pdfViewer: wjcViewer.PdfViewer;

    private _continuousViewMode = false;

    constructor() {
    }

    get continuousViewMode(): boolean {
        return this._continuousViewMode;
    }
    set continuousViewMode(value: boolean) {
        if (this._continuousViewMode != value) {
            this._continuousViewMode = value;
            this.pdfViewer.viewMode = value ? wjcViewer.ViewMode.Continuous : wjcViewer.ViewMode.Single;
        }
    }
}


@NgModule({
    imports: [WjInputModule, WjGridModule, WjViewerModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
