import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
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
    columnsAvailable: wjcCore.CollectionView;
    columns: wjcCore.CollectionView;

    @ViewChild('flex') flex: wjcGrid.FlexGrid;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        var data = dataSvc.getData(10000);
        this.data = new wjcCore.CollectionView(data);

        // build list of columns available
        var item = data[0];
        var fields = new wjcCore.ObservableArray();
        for (var key in item) {
            fields.push(key);
        }
        this.columnsAvailable = new wjcCore.CollectionView(fields);

        this.columns = new wjcCore.CollectionView();
        for (var i = 0; i < 3; i++) {
            this.columnsAvailable.moveCurrentToFirst();
            this.addColumn();
        }
    }


    // move item from columnsAvailable to columns
     addColumn() {
        var item = this.columnsAvailable.currentItem,
            index = this.columns.currentPosition;
        if (item) {
            this.columnsAvailable.remove(item);
            this.columns.sourceCollection.splice(Math.max(0, index), 0, item);
            this.columns.moveCurrentTo(item);
        }
}

    // move item from columns to columnsAvailable
     removeColumn() {
        var item = this.columns.currentItem,
            index = this.columnsAvailable.currentPosition;
        if (item) {
            this.columns.remove(item);
            this.columnsAvailable.sourceCollection.splice(Math.max(0, index), 0, item);
            this.columnsAvailable.moveCurrentTo(item);
        }
    }

    // move a column within the columns collection
     moveColumn(offset) {
        var item = this.columns.currentItem;
        if (item) {
            var arr = this.columns.sourceCollection,
                index = arr.indexOf(item),
                newIndex = index + offset;
            if (index > -1 && newIndex > -1) {
                arr.splice(index, 1);
                arr.splice(newIndex, 0, item);
                this.columns.moveCurrentTo(item);
            }
        }
     }

     // update columns array if the user moves a column
     // (the ng-repeat directive cannot do this)
     draggedColumn(s: wjcGrid.FlexGrid) {
         var columns = new wjcCore.ObservableArray();
         for (var i = 0; i < s.columns.length; i++) {
             columns.push(s.columns[i].binding);
         }
         this.columns.sourceCollection = columns;
     }
     
}

@NgModule({
    imports: [WjInputModule, WjGridModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
