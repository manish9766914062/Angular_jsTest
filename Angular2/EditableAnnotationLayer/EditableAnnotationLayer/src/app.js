"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcChart = require("wijmo/wijmo.chart");
var wjcChartAnnotation = require("wijmo/wijmo.chart.annotation");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_chart_1 = require("wijmo/wijmo.angular2.chart");
var wijmo_angular2_chart_interaction_1 = require("wijmo/wijmo.angular2.chart.interaction");
var AxisScrollbar_1 = require("./AxisScrollbar");
var EditableAnnotationLayer_1 = require("./EditableAnnotationLayer");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this._isEditable = true;
        this.data = this._getData();
    }
    Object.defineProperty(AppCmp.prototype, "isEditable", {
        get: function () {
            return this._isEditable;
        },
        set: function (value) {
            if (value != this._isEditable) {
                this._isEditable = value;
                this.al.isEditable = this._isEditable;
            }
        },
        enumerable: true,
        configurable: true
    });
    AppCmp.prototype.chartRendered = function (chart) {
        // create Scrollbar
        this._createAxisScrollbar();
        // create EditableAnnotationLayer
        this._createEditableAnnotationLayer();
    };
    AppCmp.prototype._createAxisScrollbar = function () {
        var _this = this;
        if (!this.axisScrollBar) {
            this.axisScrollBar = new AxisScrollbar_1.AxisScrollbar(this.anChart.axes[0]);
            window.setTimeout(function () {
                _this.axisScrollBar.maxPos = 0.5;
            }, 20);
        }
    };
    AppCmp.prototype._createEditableAnnotationLayer = function () {
        var _this = this;
        if (!this.al) {
            this.al = new EditableAnnotationLayer_1.EditableAnnotationLayer(this.anChart);
            this.al.isEditable = this._isEditable;
            //add customize button
            var triangle, triangleBtn = new EditableAnnotationLayer_1.Button(function (engine) {
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
            }, function (point, isDataCoordinate) {
                var x = isDataCoordinate ? point.dx : point.x, y = isDataCoordinate ? point.dy : point.y;
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
                _this.al.items.push(triangle);
            }, function (originPoint, currentPoint, isDataCoordinate) {
                var ox = isDataCoordinate ? originPoint.dx : originPoint.x, oy = isDataCoordinate ? originPoint.dy : originPoint.y, cx = isDataCoordinate ? currentPoint.dx : currentPoint.x, cy = isDataCoordinate ? currentPoint.dy : currentPoint.y, offsetX = Math.abs(cx - ox), offsetY = cy - oy, isXDate = wjcCore.isDate(ox), isYDate = wjcCore.isDate(oy), oaDate = wjcChart.FlexChart._fromOADate;
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
            ['black', 'blue', 'green', 'red', 'yellow'].forEach(function (v) {
                var flagSrc = 'resources/flag-' + v + '-icon.png';
                var flag = new wjcChartAnnotation.Image({
                    attachment: wjcChartAnnotation.AnnotationAttachment.DataIndex,
                    seriesIndex: 0,
                    pointIndex: pointIndex,
                    width: 24,
                    height: 24,
                    href: flagSrc
                });
                _this.al.items.push(flag);
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
    };
    // create some data for the sample  
    AppCmp.prototype._getData = function () {
        var data = [], numCount = 100;
        for (var i = 0; i < numCount; i++) {
            data.push({
                x: this._getRandomValue(100),
                y: this._getRandomValue(1000)
            });
        }
        return data;
    };
    AppCmp.prototype._getRandomValue = function (max) {
        return Math.round(Math.random() * max);
    };
    __decorate([
        core_1.ViewChild('anChart')
    ], AppCmp.prototype, "anChart", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        })
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_chart_1.WjChartModule, wijmo_angular2_chart_interaction_1.WjChartInteractionModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map