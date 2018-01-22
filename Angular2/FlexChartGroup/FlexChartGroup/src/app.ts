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

import { DataSvc } from './services/DataSvc';

'use strict';

// The FlexChartGroup application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})

export class AppCmp {
    protected dataSvc: DataSvc;
    groupBy: string;
    groupByText: string;
    aggregation: string;
    chartType: string;
    aggregationText: string;
    chartView: wjcCore.CollectionViewGroup[];
    itemsSource;
    palette;
    bindx: string;
    bindname: string;
    bindvalue: string;
    mainView: wjcCore.CollectionView;
    chartViewPath: (number | string)[];
    groupNamesMap;
    levelsColor: string[];
    byLabel: string;
    headerTitle: string;
    headerAnchorLevel2: string;
    headerAnchorLevel1: string;
    headerHref: string;
    @ViewChild('groupChart') groupChart: wjcChart.FlexChart;
    @ViewChild('groupPie') groupPie: wjcChart.FlexPie;

    constructor(@Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.mainView = new wjcCore.CollectionView(this.dataSvc.getData(500));
        this.chartView = null;
        this.groupBy = 'country,city';
        this.aggregation = 'Sum';
        this.chartType = 'chart';
        this.aggregationText = 'Sum';
        this.chartViewPath = [];
        this.groupNamesMap = { country: 'Country', date: 'Year', city: 'City' };
        this.levelsColor = ['rgba(136,189,230,0.7)', 'rgba(251,178,88,0.7)', 'rgba(144,205,151,0.7)'];
    }

    ngAfterViewInit() {
        if (this.groupChart && this.groupChart.hostElement) {
            this.chartClick(this.groupChart);
            this._disableTouchToolTip(this.groupChart);
        }
        if (this.groupPie && this.groupPie.hostElement) {
            this.chartClick(this.groupPie);
            this._disableTouchToolTip(this.groupPie);
            this._addLegendLinkStyle(this.groupPie);

        }
        this.groupByMenuChanged();
    }

    groupByMenuChanged(sender?: wjcInput.Menu) {
        let gd, groupName, groupNames = this.groupBy.split(',')

        gd = this.mainView.groupDescriptions;
        gd.clear();

        for (var i = 0; i < groupNames.length; i++) {
            groupName = groupNames[i];

            if (groupName == 'date') { // group dates by year
                var groupDesc = new wjcCore.PropertyGroupDescription(groupName, (item, prop) => {
                    return item.date.getFullYear();
                });
                gd.push(groupDesc);
            } else { // group country
                var groupDesc = new wjcCore.PropertyGroupDescription(groupName);
                gd.push(groupDesc);
            }
        }
        this.chartViewPath = [];
        this._setChartView(this.mainView.groups);
    };

    aggregationMenuChanged(sender: wjcInput.Menu) {
        this._updateChart();
    };

    chartTypeMenuChanged(sender: wjcInput.Menu) {
        this._updateChart();
    };

    chartClick(chart: wjcChart.FlexChart | wjcChart.FlexPie) {
        chart.hostElement.addEventListener('click', evt => {
            let ht = chart.hitTest(evt),
                clklgdOnPie = false,
                idx: number,
                selectedGroup: wjcCore.CollectionViewGroup;

            if (this.chartType === "pie" &&
                ht.chartElement == wjcChart.ChartElement.Legend) {
                clklgdOnPie = true;
            }

            idx = ht.pointIndex;
            if ((!clklgdOnPie && ht.distance !== 0) || idx < 0) {
                return;
            }

            // index is got here.
            selectedGroup = this.chartView[idx];
            if (!selectedGroup || (selectedGroup && selectedGroup.isBottomLevel)) {
                return;
            }
            this.chartViewPath.push(idx);
            this._setChartView(selectedGroup.groups);
        });
    };

    changeChartView(level: number) {
        let paths: string[], //chartView = this.mainView,
            l = this.chartViewPath.length;

        this.chartViewPath = [];
        if (l === level) {
            this._setChartView(this.mainView.groups);
            this.palette = [this.levelsColor[this.chartViewPath.length]];
            return;
        }

        paths = this.headerHref.toString().split(',');
        if (paths.length <= 0) {
            return;
        }
        let chartView = this.mainView.groups;
        for (var i = 0; i < paths.length; i++) {
            chartView = chartView[paths[i]].groups;
            this.chartViewPath.push(paths[i]);
        }
        this._setChartView(chartView);
    };

    _setChartView(view: wjcCore.CollectionViewGroup[]) {
        this.chartView = view;
        this._updateChart();
    };

    _updateChart() {
        var groups = this.chartView;

        if (groups && groups.length > 0) {
            this._updateChartItemsSource();
            this._updateHeader();
            this.palette = [this.levelsColor[this.chartViewPath.length]];
        }
    };

    _updateChartItemsSource() {
        var groups = this.chartView, groupItems = [],
            sereiesName = this.aggregation;

        if (groups && groups.length > 0) {
            //for year to string: sort the group item(year)
            groups.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            });

            this.bindname = this.bindvalue = sereiesName;

            groups.forEach((group, idx) => {
                var groupName = (<wjcCore.PropertyGroupDescription>group.groupDescription).propertyName,
                    groupItem = {},
                    aggregateVal = group.getAggregate(wjcCore.Aggregate[this.aggregation], 'amount');

                if (idx === 0) {
                    this.bindx = groupName;
                }
                groupItem[groupName] = group.name.toString();
                groupItem[sereiesName] = aggregateVal;
                groupItems.push(groupItem);
            });
            this.itemsSource = groupItems;
        }
    }; 

    _updateHeader() {
        var level = this.chartViewPath.length,
            groups = this.mainView.groups,
            currentGroupDescName = this.groupNamesMap[this.mainView.groupDescriptions[0].propertyName],
            headerEle = document.querySelector('h3'),
            header = this.aggregationText + ' By ' + this.groupNamesMap[this.mainView.groupDescriptions[level].propertyName],
            headerLinkTxt, groupIndex, groupName: string;

        //change header
        if (level > 0) {
            for (var i = 0; i < level; i++) {
                groupIndex = this.chartViewPath[i];
                groupName = groups[groupIndex].name;
                if (i === level - 1) {
                    //headerLinkTxt += groupName + ' - ';
                    this.headerTitle = groupName;
                } else {
                    this.headerHref = this.chartViewPath.slice(0, i + 1).join(',');
                }
                if (level - i === 1) {
                    this.headerAnchorLevel1 = groupName;
                } else if (level - i === 2) {
                    this.headerAnchorLevel2 = groupName;
                }
                groups = groups[groupIndex].groups;
            }
            //header = headerLinkTxt + header;
        }
        this.byLabel = header;
    };

    _disableTouchToolTip(chart: wjcChart.FlexChart | wjcChart.FlexPie) {
        if (chart.tooltip) {
            chart.tooltip.content = ht => {
                if (chart.isTouching) {
                    return null; // no tooltip
                } else if (ht.series) { // column chart
                    if (ht.item) {
                        return '<b>' + ht.series.name + '</b><br/>' + ht.x + ' ' + ht.y.toFixed();
                    } else {
                        return null;
                    }
                } else {
                    return '<b>' + ht.name + '</b><br/>' + ht.value.toFixed();
                }
            };
        }
    }

    _addLegendLinkStyle(chart: wjcChart.FlexPie) {
        var level, labels, cvpLength;

        if (!chart || (chart && chart.legend && chart.legend.position === wjcChart.Position.None)) {
            return;
        }

        //add hover style to pie legend
        chart.rendered.addHandler(() => {
            cvpLength = this.chartViewPath.length;
            level = this.mainView.groupDescriptions.length;
            if (cvpLength >= 0 && cvpLength < level - 1) {
                labels = chart.hostElement.querySelectorAll('.wj-legend .wj-label');
                [].forEach.call(labels, label => {
                    wjcCore.addClass(label, "labellink");
                });
            }
        });
    };
}


@NgModule({
    imports: [WjInputModule, WjChartModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);

