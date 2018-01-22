import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html',
})

export class AppCmp {
    protected dataSvc: DataSvc;
    data: wjcCore.CollectionView;
    cvGroup: wjcCore.CollectionView;
    cvFilter: wjcCore.CollectionView;
    cvPaging: wjcCore.CollectionView;
    cvMaster: wjcCore.CollectionView;
    selectionMode = 'CellRange';
    treeData: [{}];

    //private
    private _groupBy = '';
    private _filter = '';
    private _toFilter: any;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvGroup = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvFilter = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvFilter.filter = this._filterFunction.bind(this);
        this.cvMaster = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvPaging = new wjcCore.CollectionView(this.dataSvc.getData(100));
        this.cvPaging.pageSize = 10;
        this.treeData = this.dataSvc.getTreeData();
    }

    get groupBy(): string {
        return this._groupBy;
    }
    set groupBy(value: string) {
        if (this._groupBy != value) {
            this._groupBy = value;
            this._applyGroupBy();
        }
    }

    get filter(): string {
        return this._filter;
    }
    set filter(value: string) {
        if (this._filter != value) {
            this._filter = value;
            if (this._toFilter) {
                clearTimeout(this._toFilter);
            }
            var self = this;
            this._toFilter = setTimeout(function () {
                self.cvFilter.refresh();
            }, 500);
        }
    }

    toggleFreeze(flex: wjcGrid.FlexGrid) {
        if (flex) {
            var frozenCount = flex.frozenRows == 0 ? 2 : 0;
            flex.frozenRows = frozenCount;
            flex.frozenColumns = frozenCount;
        }
    }

    getAmountColor(amount: number) {
        if (amount < 500) return 'darkred';
        if (amount < 2500) return 'black';
        return 'darkgreen';
    }

    sortedColumn(flex: wjcGrid.FlexGrid) {
        if (!flex) {
            return;
        }
        var view = flex.collectionView;
        if (view && flex.childItemsPath) {
            for (var i = 0; i < view.items.length; i++) {
                this._sortItem(view.items[i], <wjcCore.CollectionView>view, flex.childItemsPath);
            }
            view.refresh();
        }
    }

    private _applyGroupBy() {
        var cv = this.cvGroup;
        cv.beginUpdate();
        cv.groupDescriptions.clear();
        if (this.groupBy) {
            var groupNames = this.groupBy.split(',');
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == 'date') { // group dates by year
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName, function (item, prop) {
                        return item.date.getFullYear();
                    });
                    cv.groupDescriptions.push(groupDesc);
                } else if (groupName == 'amount') { // group amounts in ranges
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName, function (item, prop) {
                        return item.amount >= 5000 ? '> 5,000' : item.amount >= 500 ? '500 to 5,000' : '< 500';
                    });
                    cv.groupDescriptions.push(groupDesc);
                } else { // group everything else by value
                    var groupDesc = new wjcCore.PropertyGroupDescription(groupName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }
            cv.refresh();
        }
        cv.endUpdate();
    }

    private _filterFunction(item: any) {
        if (this._filter) {
            return item.country.toLowerCase().indexOf(this._filter.toLowerCase()) > -1;
        }
        return true;
    }

    private _sortItem(item: any, view: wjcCore.CollectionView, childItemsPath: any) {
        var children = item[childItemsPath];
        if (children && wjcCore.isArray(children)) {
            children.sort(view._compareItems());
            for (var i = 0; i < children.length; i++) {
                this._sortItem(children[i], view, childItemsPath);
            }
        }
    }
}

@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
