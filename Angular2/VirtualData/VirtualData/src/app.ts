
import * as wjcCore from 'wijmo/wijmo';
import * as wjcOData from 'wijmo/wijmo.oData';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';


// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    private _url = 'http://services.odata.org/V4/Northwind/Northwind.svc';

    constructor() {        
    }

    // initialize an ODataCollectionView and bind it to a grid
    initODataCollectionView(s: wjcGrid.FlexGrid) {

        // declare collection view
        var cv = new wjcOData.ODataCollectionView(this._url, 'Order_Details_Extendeds', {
            oDataVersion: 4
        });

        // use virtual collection as grid data source
        var flex = s;
        flex.itemsSource = cv;

        // show row indices in row header cells
        flex.formatItem.addHandler((s, e:any)=> {
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = e.row;
            }
        })

        // add a filter
        var filter = new wjcGridFilter.FlexGridFilter(flex);
    }

    // initialize an ODataVirtualCollectionView and bind it to a grid
    initODataVirtualCollectionView(s: wjcGrid.FlexGrid) {

        // declare virtual collection view
        var vcv = new wjcOData.ODataVirtualCollectionView(this._url, 'Order_Details_Extendeds', {
            oDataVersion: 4
        });

        // use virtual collection as grid data source
        var flex = s;
        flex.itemsSource = vcv;

        // update data window when the grid scrolls
        flex.scrollPositionChanged.addHandler(function () {
            var rng = flex.viewRange;
            vcv.setWindow(rng.row, rng.row2);
        });

        // show row indices in row header cells
        flex.formatItem.addHandler((s, e:any)=> {
            if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
                e.cell.textContent = e.row;
            }
        })

        // add a filter
        var filter = new wjcGridFilter.FlexGridFilter(flex);
    }

}


@NgModule({
    imports: [WjGridModule, WjGridFilterModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);