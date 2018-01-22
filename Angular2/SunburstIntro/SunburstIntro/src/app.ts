import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule} from 'wijmo/wijmo.angular2.chart';
import { WjChartHierarchicalModule } from 'wijmo/wijmo.angular2.chart.hierarchical';
import { WjInputModule} from 'wijmo/wijmo.angular2.input';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';
import * as wijmo from 'wijmo/wijmo';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })

    export class AppCmp {
        // generate some random data
        protected dataSvc: DataSvc;
        data: any[];
        hierarchicalData: any[];
        groupCVData: wijmo.CollectionView;
        themingData: any[];
        header = 'Sales';
        footer = 'GrapeCity, inc.';
        legendPosition = 'Right';
        innerRadius = 0;
        offset = 0;
        startAngle = 0;
        reversed = false;
        palette = 'standard';
        palettes = ['standard', 'cocoa', 'coral', 'dark', 'highcontrast', 'light', 'midnight', 'minimal', 'modern', 'organic', 'slate'];
        bindingName = ['year', 'quarter', 'month'];
        childItemsPath = 'items';
        selectedPosition = 'Top';
        selectedOffset = 0;
        isAnimated = true;
        chartPalette: wjcChart.Palettes;

        constructor( @Inject(DataSvc) dataSvc: DataSvc) {
            this.dataSvc = dataSvc;
            this.data = this.dataSvc.getData();
            this.hierarchicalData = this.dataSvc.getHierarchicalData();
            this.groupCVData = this.dataSvc.getGroupCVData();
            this.themingData = this.dataSvc.getThemingData();
        }

        paletteChanged = (sender: wjcInput.Menu) => {
            var p = this.palettes[sender.selectedIndex];
            this.palette = p;
            this.chartPalette = wjcChart.Palettes[p];
        };

        innerRadiusChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this.innerRadius = sender.value;
        };

        offsetChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this.offset = sender.value;
        };

        startAngleChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this.startAngle = sender.value;
        };

        selectedOffsetChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this.selectedOffset = sender.value;
        };
}


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartHierarchicalModule, TabsModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
