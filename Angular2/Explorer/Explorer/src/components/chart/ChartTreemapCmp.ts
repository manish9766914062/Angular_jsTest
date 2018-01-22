

import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';

'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, AfterViewInit, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartHierarchicalModule } from 'wijmo/wijmo.angular2.chart.hierarchical';
import { DataSvc } from '../../services/DataSvc';

// Chart TreeMap component
@Component({
    selector: 'chart-tree-map-cmp',
    templateUrl: 'src/components/chart/chartTreeMapCmp.html'
})

export class ChartTreeMapCmp  {

    // generate some random data
    protected dataSvc: DataSvc;
    data: any[];
    maxDepth = 2;
    palettes = [null, [{
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
        titleColor: '#51007d',
        maxColor: 'rgba(81,0,125,0.7)',
        minColor: 'rgba(209,170,230,0.7)'
    }, {
        titleColor: '#7d7400',
        maxColor: 'rgba(125,116,0,0.7)',
        minColor: 'rgba(230,226,168,0.7)'
    }], ['#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7']];
    chartPalette = null;
    palette = 'Default';
    TreeMapType = wjcChartHierarchical.TreeMapType;
    type = wjcChartHierarchical.TreeMapType.Squarified;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.data = this.dataSvc.getTreeMapData();
    }

    paletteChanged(sender: wjcInput.Menu) {
        this.chartPalette = this.palettes[sender.selectedIndex];
    };
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: ChartTreeMapCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjChartModule, WjInputModule, WjChartHierarchicalModule],
    declarations: [ChartTreeMapCmp],
})
export class ChartTreeMapModule {
}
