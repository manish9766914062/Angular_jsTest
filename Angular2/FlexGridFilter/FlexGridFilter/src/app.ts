import * as wjcCore from 'wijmo/wijmo';
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
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { DataSvc } from './services/DataSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {    
    data: wjcCore.CollectionView;
    countryMap: wjcGrid.DataMap;

    protected dataSvc: DataSvc;
    private _downloadsColumnFilterType = wjcGridFilter.FilterType.Condition;
    private _culture = 'en';

    @ViewChild('filter') filter: wjcGridFilter.FlexGridFilter;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData());
        this.countryMap = new wjcGrid.DataMap(new wjcCore.CollectionView(this.dataSvc.getCountryMap()), 'key', 'name');
    }

    get downloadsColumnFilterType(): wjcGridFilter.FilterType {
        return this._downloadsColumnFilterType;
    }
    set downloadsColumnFilterType(value: wjcGridFilter.FilterType) {
        if (this._downloadsColumnFilterType != value) {
            this._downloadsColumnFilterType = value;
            var f = this.filter;
            if (f) {
                var col = f.grid.columns.getColumn('downloads'),
                    cf = f.getColumnFilter(col, true);
                cf.filterType = this._downloadsColumnFilterType;
            }
        }
    }

    get culture(): string {
        return this._culture;
    }
    set culture(value: string) {
        if (this._culture != value) {
            this._culture = value;
            var self = this;
            // remove old localization reference
            $.ajax({
                url: 'scripts/vendor/wijmo.culture.' + self._culture + '.js',
                dataType: 'script',
                success: function (data) {
                    wjcCore.Control.invalidateAll(); // invalidate all controls to show new culture
                },
            });
        }
    }

    saveFilter() {
        localStorage['filter'] = this.filter.filterDefinition;
    }

    restoreFilter() {
        this.filter.filterDefinition = localStorage['filter'];
    }

    // create the filter and expose it to scope for customization
    initialized(s: wjcGrid.FlexGrid, e: any) {
        this.filter.filterChanging.addHandler(function () {
            console.log('filter changing');
        });
        this.filter.filterChanged.addHandler(function () {
            console.log('filter changed');
        });
        this.filter.filterApplied.addHandler(function () {
            console.log('filter applied');
        });
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule, WjGridFilterModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
