import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import * as wjcInput from 'wijmo/wijmo.input';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartHierarchicalModule } from 'wijmo/wijmo.angular2.chart.hierarchical';

import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

'use strict';

// The Explorer application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})


export class AppCmp {
    // generate some random data
    data;
    groupData;
    maxDepthData;
    palette1;
    palette2;

    //chart properties
    bindingName;
    // A local reference to the TreeMapType Enum, that allows to use the enum members in the 
    // template markup.
    TreeMapType = wjcChartHierarchical.TreeMapType;
    treeMapType = wjcChartHierarchical.TreeMapType.Squarified;
    maxDepth = 2;

    protected dataSvc: DataSvc;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getData();
        this.groupData = this.dataSvc.getGroupCVData();
        this.maxDepthData = this.dataSvc.getMaxDepthData();
        this.bindingName = ['category', 'subCategory'];
        this.palette1 = [{
            titleColor: '#00277d',
            maxColor: 'rgba(0,39,125,0.7)',
            minColor: 'rgba(168,187,230,0.7)'
        }, {
            titleColor: '#7d1f00',
            maxColor: 'rgba(125,21,0,0.7)',
            minColor: 'rgba(230,183,168,0.7)'
        }, {
            titleColor: '#007d27',
            maxColor: 'rgba(0,125,39,0.7)',
            minColor: 'rgba(168,230,188,0.7)'
        }, {
            titleColor: '#7d003c',
            maxColor: 'rgba(125,0,60,0.7)',
            minColor: 'rgba(230,168,198,0.7)'
        }, {
            titleColor: '#7d4300',
            maxColor: 'rgba(125,67,0,0.7)',
            minColor: 'rgba(230,201,168,0.7)'
        }, {
            titleColor: '#51007d',
            maxColor: 'rgba(81,0,125,0.7)',
            minColor: 'rgba(209,170,230,0.7)'
        }, {
            titleColor: '#7d7400',
            maxColor: 'rgba(125,116,0,0.7)',
            minColor: 'rgba(230,226,168,0.7)'
        }, {
            titleColor: '#970000',
            maxColor: 'rgba(151,0,0,0.7)',
            minColor: 'rgba(230,169,169,0.7)'
        }];
        this.palette2 = ['#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
    }

}


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartHierarchicalModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


//enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
