import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';

'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class ChartMultiSelectSvc {

    private rendered = false;
    private ctrlKey = 17;
    private ctrlDown = false;
    private selections = [];
    private chart = null;
    private mouseDown = false;
    private start = null;
    private end = null;
    private selector = null;
    private offset = null;

    private static isTouch = 'ontouchstart' in window;
    private static wjSelected = 'wj-state-selected';

    items = [];
    flexChart: wjcChart.FlexChart;

    initChartMultiSelect(chart: wjcChart.FlexChart,items:any) {
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
        } else {
            // *visually* restore selection after redraw (ex. resize browser, change chart type)
            this.restoreSelection();
        }
    }

    // finds selected plot elements after rendering and applies CSS to
    // visually represent selection
    restoreSelection() {
        var item, series, el;
        for (var i = 0; i < this.selections.length; i++) {
            item = this.selections[i];
            series = item.series;
            el = series.getPlotElement(item.pointIndex);

            if (el) {
                wjcCore.addClass(el, ChartMultiSelectSvc.wjSelected);
            }
        }
    }

    // helper for clearing chart selection
    clearSelection() {
        var item, series;
        for (var i = 0; i < this.selections.length; i++) {
            item = this.selections[i];
            series = item.series;
            var el = series.getPlotElement(item.pointIndex);
            if (el) {
                wjcCore.removeClass(el, ChartMultiSelectSvc.wjSelected);
            }
        }

        this.selections.length = 0;
    }

    // helper for adding chart selection
    addSelection(hti: any) {
        wjcCore.addClass(hti.series.getPlotElement(hti.pointIndex), ChartMultiSelectSvc.wjSelected);
        this.selections.push({
            series: hti.series,
            pointIndex: hti.pointIndex
        });
    }

    // helper for removing chart selection
    removeSelection(hti: any) {
        var items = this.selections.filter(function (item) {
            return item.series === hti.series && item.pointIndex === hti.pointIndex;
        }),
            idx = -1;

        if (items && items.length > 0) {
            idx = this.selections.indexOf(items[0]);
        }

        if (idx >= 0) {
            this.selections.splice(idx, 1);
            wjcCore.removeClass(hti.series.getPlotElement(hti.pointIndex), ChartMultiSelectSvc.wjSelected);
        }
    }

    selectValuesUnder500() {
        var len = 0,
            i = 0,
            j = 0,
            item,
            series,
            binding,
            chart = this.flexChart;

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
    }

    chartClick(e: any) {

        if ((this.mouseDown || !this.ctrlDown) && !ChartMultiSelectSvc.isTouch) {
            return;
        }
        var chart = this.flexChart,
            element = e.target,
            hti = chart.hitTest(e),
            selected = false,
            chartType = chart.chartType;

        selected = this.selections.some((item) => {
            return item.series === hti.series && item.pointIndex === hti.pointIndex;
        });

        if (hti && hti.series && !selected &&
            ((hti.distance <= 0 && (chartType == 0 || chartType == 1)) || hti.distance <= 15) &&
            (this.ctrlDown || ChartMultiSelectSvc.isTouch)) {
            // remove selection
            if (wjcCore.hasClass(element, ChartMultiSelectSvc.wjSelected)) {
                this.removeSelection(hti);
            }
            // add selection
            else {
                this.addSelection(hti);
            }
        } else if (selected && ((hti.distance <= 0 && (chartType == 0 || chartType == 1)) || hti.distance <= 15) &&
            (this.ctrlDown || ChartMultiSelectSvc.isTouch)) {
            this.removeSelection(hti);
        } else {
            this.clearSelection();
        }

        // update length for view
        this.items.length = 0;
        this.items.push.apply(this.items, this.selections);
    }

    // clear selection for button click
    clear() {
        this.clearSelection();

        // update length for view
        this.items.length = 0;
    }

    chartMouseDown(e: any) {
        if (this.ctrlDown) {
            return;
        }
        this.mouseDown = true;
        e.preventDefault();
    }

    chartMouseUp(e: any) {
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
    }

    // helper to hide the selector
    hideSelector() {
        wjcCore.setCss(this.selector, { visibility: 'hidden', width: 0, height: 0, left: 0, top: 0 });
    }

    // selects plot elements within drawn rectangle
    selectWithinRect(rect) {
        var chart = this.flexChart;
        if (!rect || !chart) {
            return;
        }

        var seriesCount = chart.series.length,
            pointCount,
            series,
            el,
            box;

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
    }

    // helper to determine if plot element is within the bounds
    // of the drawn rectangle
    elementInBounds(el: HTMLElement, rect: any) {
        var box = el.getBoundingClientRect();
        return !(box.left > rect.right || box.right < rect.left || box.top > rect.bottom || box.bottom < rect.top);
    }

    chartMouseMove(e: any) {
        if (!this.mouseDown) {
            return;
        }

        var pt = e instanceof MouseEvent ? new wjcCore.Point(e.pageX, e.pageY):
            new wjcCore.Point(e.changedTouches[0].pageX, e.changedTouches[0].pageY);            

        if (this.start !== null) {
            this.end = pt;

            // update selector rectangle
            var w = pt.x - this.start.x;
            var h = pt.y - this.start.y;

            if (w >= 0) {
                wjcCore.setCss(this.selector, { left: this.start.x - this.offset.left, width: w });
            } else {
                wjcCore.setCss(this.selector, { left: pt.x - this.offset.left, width: -w });
            }
            if (h >= 0) {
                wjcCore.setCss(this.selector, { top: this.start.y - this.offset.top, height: h });
            } else {
                wjcCore.setCss(this.selector, { top: pt.y - this.offset.top, height: -h });
            }
        } else {
            wjcCore.setCss(this.selector, { visibility: 'visible' });
            var eleRect = wjcCore.getElementRect(this.selector);
            this.offset = { left: eleRect.left, top: eleRect.top };

            this.start = pt;
        }

        e.preventDefault();
    }

    chartMouseLeave(e: any) {
        if (this.start) {
            this.start = this.end = null;
            this.mouseDown = false;
            this.hideSelector();
        }
    }

    chartKeyUp(e: any) {
        if (e.keyCode === this.ctrlKey) {
            this.ctrlDown = false;
        }
    }

    chartKeyDown(e: any) {
        if (e.keyCode === this.ctrlKey) {
            this.ctrlDown = true;
        }
    }
}




