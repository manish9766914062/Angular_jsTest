import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartAnnotation from 'wijmo/wijmo.chart.annotation';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { AxisScrollbar } from './AxisScrollbar';
import { Button,EditableAnnotationLayer } from './EditableAnnotationLayer';

'use strict';

// The application root component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    data: any[];
    
    @ViewChild('anChart') anChart: wjcChart.FlexChart;

    private axisScrollBar: AxisScrollbar;
    private al: EditableAnnotationLayer;
    private _isEditable = true;

    constructor() {
        this.data = this._getData();
    }

    get isEditable(): boolean {
        return this._isEditable;
    }
    set isEditable(value: boolean) {
        if (value != this._isEditable) {
            this._isEditable = value;
            this.al.isEditable = this._isEditable;
        }
    }

    chartRendered(chart: wjcChart.FlexChart) {
        // create Scrollbar
        this._createAxisScrollbar();
        // create EditableAnnotationLayer
        this._createEditableAnnotationLayer();

    }

    private _createAxisScrollbar() {
        if (!this.axisScrollBar) {
            this.axisScrollBar = new AxisScrollbar(this.anChart.axes[0]);

            window.setTimeout(() => {
                this.axisScrollBar.maxPos = 0.5;
            }, 20);
        }
    }

    private _createEditableAnnotationLayer() {
        if (!this.al) {
            this.al = new EditableAnnotationLayer(this.anChart);
            this.al.isEditable = this._isEditable;

            //add customize button
            var triangle, triangleBtn = new Button((engine)=> {
                var triangleIcon = new wjcChartAnnotation.Polygon({
                    tooltip: 'Custom Button - Triangle </br>Select to add Triangle Annotation.',
                    points: [{
                        x: 10, y: 5
                    }, {
                        x: 5, y: 15
                    }, {
                        x: 15, y: 15
                    }],
                    style: {
                        fill: 'yellow'
                    }
                });
                triangleIcon.render(engine);
                return triangleIcon._element;
            }, (point, isDataCoordinate)=> {
                var x = isDataCoordinate ? point.dx : point.x,
                    y = isDataCoordinate ? point.dy : point.y;
                triangle = new wjcChartAnnotation.Polygon({
                    attachment: isDataCoordinate ? wjcChartAnnotation.AnnotationAttachment.DataCoordinate : wjcChartAnnotation.AnnotationAttachment.Absolute,
                    tooltip: 'Customize Annotation - Triangle',
                    points: [{
                        x: x, y: y
                    }, {
                        x: x, y: y
                    }, {
                        x: x, y: y
                    }],
                    style: {
                        fill: 'yellow'
                    }
                });
                this.al.items.push(triangle);
            }, (originPoint, currentPoint, isDataCoordinate)=> {
                var ox = isDataCoordinate ? originPoint.dx : originPoint.x,
                    oy = isDataCoordinate ? originPoint.dy : originPoint.y,
                    cx = isDataCoordinate ? currentPoint.dx : currentPoint.x,
                    cy = isDataCoordinate ? currentPoint.dy : currentPoint.y,
                    offsetX = Math.abs(cx - ox),
                    offsetY = cy - oy,
                    isXDate = wjcCore.isDate(ox),
                    isYDate = wjcCore.isDate(oy),
                    oaDate = wjcChart.FlexChart._fromOADate;

                triangle.points.clear();
                triangle.points.push({ x: ox, y: isYDate ? oaDate(oy - offsetY) : oy - offsetY });
                triangle.points.push({ x: isXDate ? oaDate(ox - offsetX) : ox - offsetX, y: isYDate ? oaDate(oy - 0 + offsetY) : oy + offsetY });
                triangle.points.push({ x: isXDate ? oaDate(ox - 0 + offsetX) : ox + offsetX, y: isYDate ? oaDate(oy - 0 + offsetY) : oy + offsetY });
            });
            this.al.buttons.push(triangleBtn);

            //add pre-defined annotations.
            var watermarker = new wjcChartAnnotation.Text({
                position: wjcChartAnnotation.AnnotationPosition.Left | wjcChartAnnotation.AnnotationPosition.Top,
                attachment: wjcChartAnnotation.AnnotationAttachment.Relative,
                text: 'watermarker',
                tooltip: 'Text Watermarker',
                point: { x: 1, y: 1 },
                style: { 'fill': '#cccccc', 'font-size': '30px', opacity: 0.2 }
            });
            this.al.items.push(watermarker);

            var imgmarker = new wjcChartAnnotation.Image({
                position: wjcChartAnnotation.AnnotationPosition.Right | wjcChartAnnotation.AnnotationPosition.Top,
                attachment: wjcChartAnnotation.AnnotationAttachment.Relative,
                tooltip: 'Image Watermarker',
                point: { x: 0, y: 1 },
                width: 128,
                height: 33,
                href: 'resources/wijmo-logo-text.png',
                style: { opacity: 0.2 }

            });
            this.al.items.push(imgmarker);

            var centerHLine = new wjcChartAnnotation.Line({
                attachment: wjcChartAnnotation.AnnotationAttachment.DataCoordinate,
                position: wjcChartAnnotation.AnnotationPosition.Center,
                content: 'Vertical Center Line',
                start: { x: 50, y: 0 },
                end: { x: 50, y: 1000 },
                style: {
                    'stroke-width': '2px',
                    stroke: 'green'
                }
            });
            this.al.items.push(centerHLine);

            var centerVLine = new wjcChartAnnotation.Line({
                attachment: wjcChartAnnotation.AnnotationAttachment.Relative,
                position: wjcChartAnnotation.AnnotationPosition.Center,
                content: 'Horizontal Center Line',
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                style: {
                    'stroke-width': '2px',
                    stroke: 'red'
                }
            });
            this.al.items.push(centerVLine);

            var topRange = new wjcChartAnnotation.Polygon({
                attachment: wjcChartAnnotation.AnnotationAttachment.Relative,
                points: [{ x: 0, y: 0 }, { x: 0, y: 0.2 }, { x: 1, y: 0.2 }, { x: 1, y: 0 }],
                content: 'Top Range',
                style: { fill: '#FEF0DB', opacity: 0.5, stroke: '#FEF0DB' }
            });
            this.al.items.push(topRange);

            //flag
            var pointIndex = 10;
            ['black', 'blue', 'green', 'red', 'yellow'].forEach((v)=> {
                var flagSrc = 'resources/flag-' + v + '-icon.png';
                var flag = new wjcChartAnnotation.Image({
                    attachment: wjcChartAnnotation.AnnotationAttachment.DataIndex,
                    seriesIndex: 0,
                    pointIndex: pointIndex,
                    width: 24,
                    height: 24,
                    href: flagSrc

                });
                this.al.items.push(flag);
                pointIndex += 10;
            });

            var rect = new wjcChartAnnotation.Rectangle({
                attachment: wjcChartAnnotation.AnnotationAttachment.DataCoordinate,
                point: { x: 10, y: 650 },
                width: 120,
                height: 150,
                style: {
                    'stroke-dasharray': '4 4',
                    stroke: 'red'
                }
            });
            this.al.items.push(rect);

            var circle = new wjcChartAnnotation.Circle({
                seriesIndex: 0,
                attachment: wjcChartAnnotation.AnnotationAttachment.DataCoordinate,
                radius: 80,
                point: { x: 70, y: 350 },
                style: {
                    stroke: 'blue',
                    fill: 'blue',
                    opacity: 0.3
                }
            });
            this.al.items.push(circle);

        }
    }


    // create some data for the sample  
    private _getData() {
        var data = [],
            numCount = 100;

        for (var i = 0; i < numCount; i++) {
            data.push({
                x: this._getRandomValue(100),
                y: this._getRandomValue(1000)
            });
        }
        return data;
    }

    private _getRandomValue(max) {
        return Math.round(Math.random() * max);
    }
}


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartInteractionModule,BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);