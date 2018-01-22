

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';

import { DataSvc } from './../../services/DataSvc';

//Markers sample component
@Component({
    selector: 'markers-cmp',
    templateUrl: 'src/components/interaction/MarkersCmp.html',
})

export class MarkersCmp {
    dataSvc: DataSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    isTouch: boolean;
    title: string;
    properties: any;
    snapping: boolean;
    pt;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('marker') marker: wjcChart.LineMarker;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.isTouch = 'ontouchstart' in window;
        this.title = 'Markers';
        this.properties = {
            interaction: 'Move',
            markerLines: 'Both',
            alignment: 2,
            snapping: false,
            content: () => {
                var retval = null, hti, item;
                if (this.chart && this.pt) {
                    // hit test
                    hti = this.chart.hitTest(this.pt);

                    // check hit test & use its values for LineMarker's content
                    if (hti && hti.item) {
                        item = hti.item;
                        retval =
                            'Date: ' + item.date + '<br />' +
                            'Open: ' + wjcCore.Globalize.format(item.open, 'n2') + '<br />' +
                            'High: ' + wjcCore.Globalize.format(item.high, 'n2') + '<br />' +
                            'Low: ' + wjcCore.Globalize.format(item.low, 'n2') + '<br />' +
                            'Close: ' + wjcCore.Globalize.format(item.close, 'n2');
                    }
                }

                // return content string
                return retval;
            }
        };
    }

    chartRendered() {
        // customize tooltips
        if (this.chart) {
            // handle custom "snapping" feature using the correct event (mousemove or touchmove)
            this.chart.hostElement.addEventListener('mousemove', this.snappingHandler.bind(this));
            this.chart.hostElement.addEventListener('touchmove', this.snappingHandler.bind(this));
        }
    }

    positionChanged(event) {
        this.pt = event;
    }

    snappingChanged() {
        var chart = this.chart,
            props = this.properties,
            snapping = props.snapping,
            marker = this.marker;

        if (!chart || !marker) {
            return;
        }
        // change marker settings based on snapping variable
        marker.horizontalPosition = null;
        marker.verticalPosition = null;
        if (snapping && chart && marker) {
            props.interaction = 'None';
            props.markerLines = 'Both';
            props.alignment = 2;//auto
        } else if (!snapping && chart && marker) {
            props.interaction = 'Move';
            marker.content = props.content;
            marker.isVisible = true;
        }
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data.splice(0, 20);
        });
    }
    
    private snappingHandler(e) {
        if (this.properties.snapping) {
            var chart = this.chart,
                marker = this.marker,
                ex, ey, pt;

            if (!wjcCore.hasClass(chart.hostElement, 'snapping')) {
                wjcCore.addClass(chart.hostElement, 'snapping');
            }

            // get points from event
            if (this.isTouch && e.touches && e.touches.length > 0) {
                e.preventDefault();
                pt = chart.pageToControl(new wjcCore.Point(e.touches[0].pageX, e.touches[0].pageY));
            } else {
                pt = chart.pageToControl(new wjcCore.Point(e.pageX, e.pageY));
            }
            ex = pt.x; ey = pt.y;

            var dp = chart.pointToData(ex, ey),
                idx = wjcCore.clamp(Math.round(dp.x), 0, this.data.length - 1),
                item = this.data[idx],
                ax = chart.axisX,
                ay = chart.axisY,
                x = wjcCore.clamp(((Math.round(dp.x) - ax.actualMin) / (ax.actualMax - ax.actualMin)) - 0.00275, 0, 1),
                y = wjcCore.clamp((ay.actualMax - dp.y) / (ay.actualMax - ay.actualMin), 0, 1);

            // marker content fn and give it access to current scope
            marker.content = function () {
                return 'Date: ' + item.date + '<br />' +
                        'Open: ' + wjcCore.Globalize.format(item.open, 'n2') + '<br />' +
                        'High: ' + wjcCore.Globalize.format(item.high, 'n2') + '<br />' +
                        'Low: ' + wjcCore.Globalize.format(item.low, 'n2') + '<br />' +
                        'Close: ' + wjcCore.Globalize.format(item.close, 'n2');
            }.bind(this);

            // set position and visibility
            marker.horizontalPosition = x;
            marker.verticalPosition = y;
            marker.isVisible = 0 < x && x < 1;
        } else {
            if (wjcCore.hasClass(this.chart.hostElement, 'snapping')) {
                wjcCore.removeClass(this.chart.hostElement, 'snapping');
            }
        }
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: MarkersCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule, WjChartModule, WjChartFinanceModule],
    declarations: [MarkersCmp],
})
export class MarkersModule {
}

