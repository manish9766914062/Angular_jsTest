import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';

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
        countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        data: { country: string, downloads: number, sales: number, expenses: number }[];
        simpleData;
        funnelData;
        rangeData;

        //chart properties
        chartType = 'Column';
        rangeChartType = 'Column';
        rangeDataType = 'num1,num2';
        gradientChartType = wjcChart.ChartType.Column;
        stacking = 'None';
        legendPosition = 'Right';
        rotated = false;
        header = 'Sample Chart';
        footer = 'copyright (c) ComponentOne';
        titleX = 'country';
        titleY = 'amount';
        tooltipContent = '<img src="resources/{x}.png" /> <b>{seriesName} </b><br/ > {y}';
        selectionMode = 'Series';
        trafficData: wjcCore.ObservableArray;
        series1Visible = wjcChart.SeriesVisibility.Visible;
        series2Visible = wjcChart.SeriesVisibility.Visible;
        series3Visible = wjcChart.SeriesVisibility.Visible;
        gradientFill: string;
        @ViewChild('funnelChart') funnelChart: wjcChart.FlexChart;
        @ViewChild('rangeChart') rangeChart: wjcChart.FlexChart;
        @ViewChild('boxChart') boxChart: wjcChart.FlexChart;
        @ViewChild('gradientColorChart') gradientColorChart: wjcChart.FlexChart;
        @ViewChild('gradientDirectionMenu') gradientDirectionMenu: wjcInput.Menu;
        @ViewChild('gradientTypeMenu') gradientTypeMenu: wjcInput.Menu;
        @ViewChild('predefinedColorMenu') predefinedColorMenu: wjcInput.Menu;
        @ViewChild('inputStartColor') startColor: wjcInput.InputColor;
        @ViewChild('inputStartOffset') startOffset: wjcInput.InputNumber;
        @ViewChild('inputStartOpacity') startOpacity: wjcInput.InputNumber;
        @ViewChild('inputEndColor') endColor: wjcInput.InputColor;
        @ViewChild('inputEndOffset') endOffset: wjcInput.InputNumber;
        @ViewChild('inputEndOpacity') endOpacity: wjcInput.InputNumber;
        predefinedColor = { fill: 'l(0,0,1,0)#89f7fe-#66a6ff' };

        //help
        _toAddData = null;
        _interval = null;

        protected dataSvc: DataSvc;

        constructor( @Inject(DataSvc) dataSvc: DataSvc) {
            this.dataSvc = dataSvc;
            this.data = this.dataSvc.getData(this.countries);
            this.funnelData = this.dataSvc.getFunnelData(this.countries);
            this.rangeData = this.dataSvc.getRangeData(this.countries);
            this.trafficData = new wjcCore.ObservableArray();
            this.setInterval(500);
        }

        ngAfterViewInit() {
            this.funnelChart.options = {
                funnel: {
                    neckWidth: 0.2,
                    neckHeight: 0.2,
                    type: 'default'
                }
            };
            this.rangeChart.tooltip.content = ht => {
                var str = ht.x + ': <br/>';
                var dataTypes = this.rangeDataType.split(',');
                var min = Math.min(ht.item[dataTypes[0]], ht.item[dataTypes[1]]);
                var max = Math.max(ht.item[dataTypes[0]], ht.item[dataTypes[1]]);
                if (wjcCore.isDate(ht.item[dataTypes[0]])) {
                    str += (new Date(min)).toLocaleDateString() + ' - ' + (new Date(max)).toLocaleDateString();
                } else {
                    str += Math.round(min) + ' - ' + Math.round(max);
                }
                return str;
            }
            this._applyGradientColor();
            this.predefinedColorMenu.selectedIndex = 0;
        }

        setInterval = (interval) => {
            if (this._toAddData) {
                clearTimeout(this._toAddData);
                this._toAddData = null;
            }
            this._interval = interval;
            if (interval) {
                this._toAddData = setTimeout(this._addTrafficItem);
            }
        }

        seriesVisible = (idx, checked) => {
            if (idx === 0) {
                this.series1Visible = checked ?
                    wjcChart.SeriesVisibility.Visible : wjcChart.SeriesVisibility.Hidden;
            } else if (idx === 1) {
                this.series2Visible = checked ?
                    wjcChart.SeriesVisibility.Visible : wjcChart.SeriesVisibility.Hidden;
            } else if (idx === 2) {
                this.series3Visible = checked ?
                    wjcChart.SeriesVisibility.Visible : wjcChart.SeriesVisibility.Hidden;
            }
        }

        private _addTrafficItem = () => {
            var len = this.trafficData.length,
                last = len ? this.trafficData[len - 1] : null,
                trucks = last ? last.trucks : 0,
                ships = last ? last.ships : 0,
                planes = last ? last.planes : 0;
            trucks = Math.max(0, trucks + Math.round(Math.random() * 50 - 25));
            ships = Math.max(0, ships + Math.round(Math.random() * 10 - 5));
            planes = Math.max(0, planes + Math.round(Math.random() * 10 - 5));

            // add random data, limit array length
            this.trafficData.push({ time: new Date(), trucks: trucks, ships: ships, planes: planes });
            if (this.trafficData.length > 200) {
                this.trafficData.splice(0, 1);
            }

            // keep adding
            if (this._interval) {
                this._toAddData = setTimeout(this._addTrafficItem, this._interval);
            }
        }

        neckWidthChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            if (!this.funnelChart.options) {
                return;
            }
            this.funnelChart.options.funnel.neckWidth = sender.value;
            this.funnelChart.refresh(true);
        };

        neckHeightChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            if (!this.funnelChart.options) {
                return;
            }
            this.funnelChart.options.funnel.neckHeight = sender.value;
            this.funnelChart.refresh(true);
        };

        funnelTypeChanged = (sender: wjcInput.Menu) => {
            if (!this.funnelChart.options) {
                return;
            }
            this.funnelChart.options.funnel.type = sender.selectedValue;
            this.funnelChart.refresh(true);
        };

        gradientChartTypeChanged = (sender: wjcInput.Menu) => {
            if (this.gradientColorChart == null) {
                return;
            }

            this.gradientColorChart.chartType = +sender.selectedValue;
        };

        gradientTypeChanged = (sender: wjcInput.Menu) => {
            this._applyGradientColor();
        };

        gradientDirectionChanged = (sender: wjcInput.Menu) => {
            this._applyGradientColor();
        };

        startColorChanged = (sender: wjcInput.InputColor) => {
            this._applyGradientColor();
        };

        startOffsetChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this._applyGradientColor();
        };

        startOpacityChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this._applyGradientColor();
        };

        endColorChanged = (sender: wjcInput.InputColor) => {
            this._applyGradientColor();
        };

        endOffsetChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this._applyGradientColor();
        };

        endOpacityChanged = (sender: wjcInput.InputNumber) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            this._applyGradientColor();
        };

        private _applyGradientColor = () => {
            if (this.gradientColorChart == null) {
                return;
            }

            var chart = this.gradientColorChart,
                color = '',
                type = this.gradientTypeMenu.selectedValue,
                direction = this.gradientDirectionMenu.selectedValue;

            color = type;
            if (type === 'l') {
                if (direction === 'horizontal') {
                    color += '(0, 0, 1, 0)';
                } else {
                    color += '(0, 0, 0, 1)';
                }
            } else {
                color += '(0.5, 0.5, 0.5)'
            }
            color += this.startColor.value;
            if (this.startOffset.value !== 0 || this.startOpacity.value !== 1) {
                color += ':' + this.startOffset.value;
            }
            if (this.startOpacity.value !== 1) {
                color += ':' + this.startOpacity.value;
            }
            color += '-' + this.endColor.value;
            if (this.endOffset.value !== 1 || this.endOpacity.value !== 1) {
                color += ':' + this.endOffset.value;
            }
            if (this.endOpacity.value !== 1) {
                color += ':' + this.endOpacity.value;
            }

            this.gradientFill = color;
            chart.series[0].style = {
                fill: color
            };
        }
}


    @NgModule({
        imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule, TabsModule],
        declarations: [AppCmp],
        providers: [DataSvc],
        bootstrap: [AppCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application with hash style navigation and global services.
    platformBrowserDynamic().bootstrapModule(AppModule);
