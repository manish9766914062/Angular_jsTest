import * as wjcCore from 'wijmo/wijmo';
import * as wjcOlap from 'wijmo/wijmo.olap';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjOlapModule, WjPivotPanel } from 'wijmo/wijmo.angular2.olap';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule } from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';


'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {

    theEngine: wjcOlap.PivotEngine;
    @ViewChild('pivotPnl') pivotPnl: WjPivotPanel;

    constructor() {

        // create and initialize pivot engine used by all controls on the page
        var ng = new wjcOlap.PivotEngine();
        this.theEngine = ng;
        // give the engine a data source and some fields
        ng.autoGenerateFields = false;
        ng.itemsSource = this.getData(20000);
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.name', 'Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.first', 'First Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.last', 'Last Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'timeInHours', 'Time (hrs)', { format: 'n3', dataType: wjcCore.DataType.Number, aggregate: 'Sum' }));
        ng.fields.push(new wjcOlap.PivotField(ng, 'bug.fogbugzId', 'Fogbugz #', { format: 'f0', dataType: wjcCore.DataType.Number }));
        ng.fields.push(new wjcOlap.PivotField(ng, 'bug.severity', 'Severity', { format: 'f0', dataType: wjcCore.DataType.Number }));

        // build the initial view
        ng.rowFields.push('Last Name');
        ng.columnFields.push('Severity');
        ng.valueFields.push('Time (hrs)');
    }

    refresh() {
        window.setTimeout(() => {
            this.pivotPnl.refresh();
        }, 200);
    }

    // sample data
    private getData(cnt: number): any[] {
        var data = [];
        for (var i = 0; i < cnt; i++) {
            var minutes = Math.round(Math.random() * 160);
            var firstNames = 'Liam,Dylan,Jacob,Noah,Jayden,Ethan,Matthew,Sebastian,Alexander,Daniel,Angel'.split(',');
            var lastNames = 'Smith,Lam,Martin,Brown,Roy,Tremblay,Lee,Gagnon,Wilson,Navin'.split(',');
            data.push({
                id: i,
                person: this.getPerson(i, firstNames, lastNames),
                bug: this.getBug(i),
                timeInMinutes: minutes,
                timeInHours: minutes / 60,
            });
        }
        return data;
    }
    private getPerson(i: number, firstNames: string[], lastNames: string[]): any {
        var first = firstNames[i % firstNames.length];
        var last = lastNames[i % lastNames.length];
        return {
            id: i,
            name: first + ' ' + last,
            first: first,
            last: last,
            email: first[0] + last + '@componentone.com',
            value: Math.random() * 400
        }
    }
    private getBug(i: number): any {
        return {
            id: i,
            fogbugzId: Math.round(100000 + Math.random() * 200000),
            severity: i % 4 == 0 ? 'High' : i % 4 == 1 ? 'Average' : 'Low'
        }
    }
}


@NgModule({
    imports: [WjInputModule, WjOlapModule, WjGridModule, WjGridFilterModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
