"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
'use strict';
var core_1 = require("@angular/core");
// Common data service
var ChartMultiSelectSvc = /** @class */ (function () {
    function ChartMultiSelectSvc() {
        this.rendered = false;
        this.ctrlKey = 17;
        this.ctrlDown = false;
        this.selections = [];
        this.chart = null;
        this.mouseDown = false;
        this.start = null;
        this.end = null;
        this.selector = null;
        this.offset = null;
        this.items = [];
    }
    ChartMultiSelectSvc_1 = ChartMultiSelectSvc;
    ChartMultiSelectSvc.prototype.initChartMultiSelect = function (chart, items) {
        this.flexChart = chart;
        this.items = items;
        if (!this.rendered) {
            chart.hostElement.addEventListener('mousedown', this.chartMouseDown.bind(this));
            chart.hostElement.addEventListener('mousemove', this.chartMouseMove.bind(this));
            chart.hostElement.addEventListener('mouseup', this.chartMouseUp.bind(this));
            chart.hostElement.addEventListener('mouseleave', this.chartMouseLeave.bind(this));
            chart.hostElement.addEventListener('click', this.chartClick.bind(this));
            document.addEventListener('keydown', this.chartKeyDown.bind(this));
            document.addEventListener('keyup', this.chartKeyUp.bind(this));
            // boolean flag - don't re-add event listener after resize
            this.rendered = true;
            this.selector = document.getElementById('plotSelection');
        }
        else {
            // *visually* restore selection after redraw (ex. resize browser, change chart type)
            this.restoreSelection();
        }
    };
    // finds selected plot elements after rendering and applies CSS to
    // visually represent selection
    ChartMultiSelectSvc.prototype.restoreSelection = function () {
        var item, series, el;
        for (var i = 0; i < this.selections.length; i++) {
            item = this.selections[i];
            series = item.series;
            el = series.getPlotElement(item.pointIndex);
            if (el) {
                wjcCore.addClass(el, ChartMultiSelectSvc_1.wjSelected);
            }
        }
    };
    // helper for clearing chart selection
    ChartMultiSelectSvc.prototype.clearSelection = function () {
        var item, series;
        for (var i = 0; i < this.selections.length; i++) {
            item = this.selections[i];
            series = item.series;
            var el = series.getPlotElement(item.pointIndex);
            if (el) {
                wjcCore.removeClass(el, ChartMultiSelectSvc_1.wjSelected);
            }
        }
        this.selections.length = 0;
    };
    // helper for adding chart selection
    ChartMultiSelectSvc.prototype.addSelection = function (hti) {
        wjcCore.addClass(hti.series.getPlotElement(hti.pointIndex), ChartMultiSelectSvc_1.wjSelected);
        this.selections.push({
            series: hti.series,
            pointIndex: hti.pointIndex
        });
    };
    // helper for removing chart selection
    ChartMultiSelectSvc.prototype.removeSelection = function (hti) {
        var items = this.selections.filter(function (item) {
            return item.series === hti.series && item.pointIndex === hti.pointIndex;
        }), idx = -1;
        if (items && items.length > 0) {
            idx = this.selections.indexOf(items[0]);
        }
        if (idx >= 0) {
            this.selections.splice(idx, 1);
            wjcCore.removeClass(hti.series.getPlotElement(hti.pointIndex), ChartMultiSelectSvc_1.wjSelected);
        }
    };
    ChartMultiSelectSvc.prototype.selectValuesUnder500 = function () {
        var len = 0, i = 0, j = 0, item, series, binding, chart = this.flexChart;
        this.clear();
        for (i = 0; i < chart.series.length; i++) {
            series = chart.series[i];
            // internal helper method that gets the number of plot elements for sereis
            len = series._getLength();
            // get binding so we can use it when accessing data item
            binding = series._getBinding(0);
            for (j = 0; j < len; j++) {
                item = series._getItem(j); // internal helper method that
                // get's series data item by index
                if (item && item[binding] < 500) {
                    // while not a HitTestInfo object, we only need these two pieces
                    // of information
                    this.addSelection({
                        pointIndex: j,
                        series: series
                    });
                }
            }
        }
        // update length for view
        this.items.push.apply(this.items, this.selections);
    };
    ChartMultiSelectSvc.prototype.chartClick = function (e) {
        if ((this.mouseDown || !this.ctrlDown) && !ChartMultiSelectSvc_1.isTouch) {
            return;
        }
        var chart = this.flexChart, element = e.target, hti = chart.hitTest(e), selected = false, chartType = chart.chartType;
        selected = this.selections.some(function (item) {
            return item.series === hti.series && item.pointIndex === hti.pointIndex;
        });
        if (hti && hti.series && !selected &&
            ((hti.distance <= 0 && (chartType == 0 || chartType == 1)) || hti.distance <= 15) &&
            (this.ctrlDown || ChartMultiSelectSvc_1.isTouch)) {
            // remove selection
            if (wjcCore.hasClass(element, ChartMultiSelectSvc_1.wjSelected)) {
                this.removeSelection(hti);
            }
            else {
                this.addSelection(hti);
            }
        }
        else if (selected && ((hti.distance <= 0 && (chartType == 0 || chartType == 1)) || hti.distance <= 15) &&
            (this.ctrlDown || ChartMultiSelectSvc_1.isTouch)) {
            this.removeSelection(hti);
        }
        else {
            this.clearSelection();
        }
        // update length for view
        this.items.length = 0;
        this.items.push.apply(this.items, this.selections);
    };
    // clear selection for button click
    ChartMultiSelectSvc.prototype.clear = function () {
        this.clearSelection();
        // update length for view
        this.items.length = 0;
    };
    ChartMultiSelectSvc.prototype.chartMouseDown = function (e) {
        if (this.ctrlDown) {
            return;
        }
        this.mouseDown = true;
        e.preventDefault();
    };
    ChartMultiSelectSvc.prototype.chartMouseUp = function (e) {
        if (this.end) {
            var host = this.flexChart.hostElement;
            var eleRect = wjcCore.getElementRect(host);
            this.offset = { left: eleRect.left, top: eleRect.top };
            this.offset.left = this.offset.left + parseInt(host.style.paddingLeft);
            this.offset.top = this.offset.top + parseInt(host.style.paddingTop);
            this.end = this.start = null;
            this.clear();
            this.selectWithinRect(this.selector.getBoundingClientRect());
            // update length for view
            this.items.length = 0;
            this.items.push.apply(this.items, this.selections);
            e.preventDefault();
        }
        this.hideSelector();
        this.mouseDown = false;
    };
    // helper to hide the selector
    ChartMultiSelectSvc.prototype.hideSelector = function () {
        wjcCore.setCss(this.selector, { visibility: 'hidden', width: 0, height: 0, left: 0, top: 0 });
    };
    // selects plot elements within drawn rectangle
    ChartMultiSelectSvc.prototype.selectWithinRect = function (rect) {
        var chart = this.flexChart;
        if (!rect || !chart) {
            return;
        }
        var seriesCount = chart.series.length, pointCount, series, el, box;
        for (var i = 0; i < seriesCount; i++) {
            series = chart.series[i];
            pointCount = series._getLength();
            for (var j = 0; j < pointCount; j++) {
                el = series.getPlotElement(j);
                if (this.elementInBounds(el, rect)) {
                    this.addSelection({
                        series: series,
                        pointIndex: j
                    });
                }
            }
        }
    };
    // helper to determine if plot element is within the bounds
    // of the drawn rectangle
    ChartMultiSelectSvc.prototype.elementInBounds = function (el, rect) {
        var box = el.getBoundingClientRect();
        return !(box.left > rect.right || box.right < rect.left || box.top > rect.bottom || box.bottom < rect.top);
    };
    ChartMultiSelectSvc.prototype.chartMouseMove = function (e) {
        if (!this.mouseDown) {
            return;
        }
        var pt = e instanceof MouseEvent ? new wjcCore.Point(e.pageX, e.pageY) :
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        if (this.start !== null) {
            this.end = pt;
            // update selector rectangle
            var w = pt.x - this.start.x;
            var h = pt.y - this.start.y;
            if (w >= 0) {
                wjcCore.setCss(this.selector, { left: this.start.x - this.offset.left, width: w });
            }
            else {
                wjcCore.setCss(this.selector, { left: pt.x - this.offset.left, width: -w });
            }
            if (h >= 0) {
                wjcCore.setCss(this.selector, { top: this.start.y - this.offset.top, height: h });
            }
            else {
                wjcCore.setCss(this.selector, { top: pt.y - this.offset.top, height: -h });
            }
        }
        else {
            wjcCore.setCss(this.selector, { visibility: 'visible' });
            var eleRect = wjcCore.getElementRect(this.selector);
            this.offset = { left: eleRect.left, top: eleRect.top };
            this.start = pt;
        }
        e.preventDefault();
    };
    ChartMultiSelectSvc.prototype.chartMouseLeave = function (e) {
        if (this.start) {
            this.start = this.end = null;
            this.mouseDown = false;
            this.hideSelector();
        }
    };
    ChartMultiSelectSvc.prototype.chartKeyUp = function (e) {
        if (e.keyCode === this.ctrlKey) {
            this.ctrlDown = false;
        }
    };
    ChartMultiSelectSvc.prototype.chartKeyDown = function (e) {
        if (e.keyCode === this.ctrlKey) {
            this.ctrlDown = true;
        }
    };
    ChartMultiSelectSvc.isTouch = 'ontouchstart' in window;
    ChartMultiSelectSvc.wjSelected = 'wj-state-selected';
    ChartMultiSelectSvc = ChartMultiSelectSvc_1 = __decorate([
        core_1.Injectable()
    ], ChartMultiSelectSvc);
    return ChartMultiSelectSvc;
    var ChartMultiSelectSvc_1;
}());
exports.ChartMultiSelectSvc = ChartMultiSelectSvc;
//# sourceMappingURL=ChartMultiSelectSvc.js.map