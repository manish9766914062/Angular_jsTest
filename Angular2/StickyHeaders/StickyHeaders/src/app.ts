import * as wjcCore from 'wijmo/wijmo';
import * as wjcOdata from 'wijmo/wijmo.odata';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcGridGrouppanel from 'wijmo/wijmo.grid.grouppanel';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjGridGrouppanelModule } from 'wijmo/wijmo.angular2.grid.grouppanel';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {

    products: wjcOdata.ODataCollectionView;

    private _url = 'http://services.odata.org/V4/Northwind/Northwind.svc';

    constructor() {
        this.products = new wjcOdata.ODataCollectionView(this._url, 'Products', {
            sortOnServer: false,
            filterOnServer: false,
            loaded: (s, e)=> {
            }
        });
    }

    // initialize grid's sticky toolbar
    init(s: wjcGrid.FlexGrid) {

        // move header element into grid layout
        var host = s.hostElement as HTMLElement,
            hdr = document.querySelector('.grid-header') as HTMLElement;
        hdr.style.position = 'relative';
        hdr.style.zIndex = '10';
        host.insertBefore(hdr, host.children[0]);

        // adjust root element height to make room for the header
        var root = s.cells.hostElement.parentElement;
        s.updatingLayout.addHandler(() => {
            root.style.minHeight = '200px';
            root.style.height = 'calc(100% - ' + hdr.offsetHeight + 'px)';
        });

        // update header's stickiness (TFS 300181)
        s.updatedLayout.addHandler(() => {
            var sticky = s.columnHeaders.hostElement.parentElement,
                stickyClass = 'wj-state-sticky';
            hdr.style.top = sticky.style.top;
            root.parentElement.scrollTop = 0;
            wjcCore.toggleClass(hdr, stickyClass, wjcCore.hasClass(sticky, stickyClass));
        });
    }

    // toggle filter, group panel
    toggleFilter(filter: wjcGridFilter.FlexGridFilter) {
        filter.showFilterIcons = !filter.showFilterIcons;
    }

    toggleGroupPanel(theGroupPanel: wjcGridGrouppanel.GroupPanel, theGrid: wjcGrid.FlexGrid) {
        var style = theGroupPanel.hostElement.style;
        style.display = (style.display == 'none' ? '' : 'none');
        theGrid.invalidate(); // force layout update
        // wijmo.Control.invalidateAll(); also works, but less efficient...
    }
}


@NgModule({
    imports: [WjGridModule, WjGridFilterModule, WjGridGrouppanelModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);