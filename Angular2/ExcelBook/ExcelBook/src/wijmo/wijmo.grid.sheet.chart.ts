import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcChart from 'wijmo/wijmo.chart';

import * as wjcSelf from './wijmo.grid.sheet.chart';
window['wijmo'] = window['wijmo'] || {};
window['wijmo']['grid'] = window['wijmo']['grid'] || {};
window['wijmo']['grid']['sheet'] = window['wijmo']['grid']['sheet'] || {};
window['wijmo']['grid']['sheet']['chart'] = wjcSelf;

'use strict';

/*
 * Defines the _ChartInsertAction class.
 *
 * It deals with the undo\redo for inserting chart in the @see:FlexSheet control.
 */
export class _ChartInsertAction extends wjcGridSheet._UndoAction {
    private _chartEngine: ChartEngine;
    private _chartType: wjcChart.ChartType;
    private _data: any[];
    private _chartRect: wjcCore.Rect;
    private _chartContainerRect: wjcCore.Rect;
    private _cellRnages: wjcGrid.CellRange[];

    /*
     * Initializes a new instance of the @see:_ChartInsertAction class.
     *
     * @param chartEngine The @see: ChartEngine the engine to handle the @see:FlexChart in the @see:FlexSheet control.
     * @param chartType the type of the chart.
     * @param data the data used to render the chart.
     * @param chartRect the bounds rectangle to locate the chart.
     * @param cellRanges the cells to generate the @see:FlexChart in the @see:FlexSheet control.
     */
    constructor(chartEngine: ChartEngine, chartType: wjcChart.ChartType, data: any[], chartRect: wjcCore.Rect, cellRanges: wjcGrid.CellRange[]) {
        super(chartEngine._owner);

        this._chartEngine = chartEngine;
        this._chartType = chartType;
        this._data = data;
        this._chartRect = chartRect;
        this._cellRnages = cellRanges;
    }

    /*
     * Overrides the undo method of its base class @see:_UndoAction.
     */
    undo() {
        var chart: wjcChart.FlexChart,
            chartHost: HTMLElement,
            chartContainer: HTMLElement,
            chartCnt = this._chartEngine._charts.length;

        if (chartCnt > 0) {
            chart = this._chartEngine._charts[chartCnt - 1].chart;
            chartHost = chart.hostElement;
            chartContainer = chartHost.parentElement;
            this._chartEngine._undoing = true;
            this._chartRect = new wjcCore.Rect(chartHost.offsetLeft, chartHost.offsetTop, chartHost.offsetWidth, chartHost.offsetHeight);
            this._chartContainerRect = new wjcCore.Rect(chartContainer.offsetLeft, chartContainer.offsetTop, chartContainer.offsetWidth, chartContainer.offsetHeight);
            if (chart === this._chartEngine._selectedChart) {
                this._chartEngine._selectedChart = null;
            }
            this._chartEngine.removeChart(chart);
            this._chartEngine._undoing = false;
        }
    }

    /*
     * Overrides the redo method of its base class @see:_UndoAction.
     */
    redo() {
        var chartObj: IChartObject,
            chart: wjcChart.FlexChart,
            chartContainer: HTMLElement;

        this._chartEngine._undoing = true;
        chartObj = this._chartEngine.addChart(this._chartType, this._data, this._chartRect);
        chartObj.cellRanges = this._cellRnages;
        chart = chartObj.chart;
        chartContainer = chart.hostElement.parentElement;

        wjcCore.setCss(chartContainer, {
            top: this._chartContainerRect.top + 'px',
            left: this._chartContainerRect.left + 'px',
            height: this._chartContainerRect.height + 'px',
            width: this._chartContainerRect.width + 'px'
        });

        this._chartEngine._undoing = false;
    }
}

/*
 * Defines the _ChartRemoveAction class.
 *
 * It deals with the undo\redo for removing chart in the @see:FlexSheet control.
 */
export class _ChartRemoveAction extends wjcGridSheet._UndoAction {
    private _chartEngine: ChartEngine;
    private _chartType: wjcChart.ChartType;
    private _data: any;
    private _cellRnages: wjcGrid.CellRange[];
    private _chartRect: wjcCore.Rect;
    private _chartContainerRect: wjcCore.Rect;

    /*
     * Initializes a new instance of the @see:_ChartRemoveAction class.
     *
     * @param chartEngine The @see: ChartEngine the engine to handle the @see:FlexChart in the @see:FlexSheet control.
     * @param chartObj contains related information of the @see:FlexChart in the @see:FlexSheet control.
     */
    constructor(chartEngine: ChartEngine, chartObj: IChartObject) {
        super(chartEngine._owner);

        var chart = chartObj.chart,
            chartHost = chartObj.chart.hostElement,
            chartContainer = chartHost.parentElement;

        this._chartEngine = chartEngine;
        this._chartType = chart.chartType;
        this._data = chart.itemsSource;
        this._cellRnages = chartObj.cellRanges;
        this._chartRect = new wjcCore.Rect(chartHost.offsetLeft, chartHost.offsetTop, chartHost.offsetWidth, chartHost.offsetHeight);
        this._chartContainerRect = new wjcCore.Rect(chartContainer.offsetLeft, chartContainer.offsetTop, chartContainer.offsetWidth, chartContainer.offsetHeight);
    }

    /*
     * Overrides the undo method of its base class @see:_UndoAction.
     */
    undo() {
        var chartObj: IChartObject,
            chart: wjcChart.FlexChart,
            chartContainer: HTMLElement;

        this._chartEngine._undoing = true;
        chartObj = this._chartEngine.addChart(this._chartType, this._data, this._chartRect);
        chartObj.cellRanges = this._cellRnages;
        chart = chartObj.chart;
        chartContainer = chart.hostElement.parentElement;

        wjcCore.setCss(chartContainer, {
            top: this._chartContainerRect.top + 'px',
            left: this._chartContainerRect.left + 'px',
            height: this._chartContainerRect.height + 'px',
            width: this._chartContainerRect.width + 'px'
        });

        this._chartEngine._undoing = false;
    }

    /*
     * Overrides the redo method of its base class @see:_UndoAction.
     */
    redo() {
        var chart: wjcChart.FlexChart,
            chartCnt = this._chartEngine._charts.length;

        if (chartCnt > 0) {
            chart = this._chartEngine._charts[chartCnt - 1].chart;
            this._chartEngine._undoing = true;
            if (chart === this._chartEngine._selectedChart) {
                this._chartEngine._selectedChart = null;
            }
            this._chartEngine.removeChart(chart);
            this._chartEngine._undoing = false;
        }
    }
}

/*
 * Defines the _ChartColumnsChangedAction class.
 *
 * It deals with the undo\redo for insert or delete column of the flexsheet.
 */
export class _ChartColumnsChangedAction extends  wjcGridSheet._ColumnsChangedAction {
    private _chartEngine: ChartEngine;
    private _oldCharts: IChartSetting[];
    private _newCharts: IChartSetting[];

    /*
     * Initializes a new instance of the @see:_ChartColumnsChangedAction class.
     *
     * @param chartEngine The @see: ChartEngine that the _ChartColumnsChangedAction works for.
     */
    constructor(chartEngine: ChartEngine) {
        super(chartEngine._owner);

        this._chartEngine = chartEngine;
        this._oldCharts = chartEngine._getChartSettings();
    }

    /*
     * Overrides the undo method of its base class @see:_ColumnsChangedAction.
     */
    undo() {
        var chartObj: IChartObject,
            chartSetting: IChartSetting,
            data: any[],
            i: number;

        this._chartEngine._undoing = true;
        super.undo();

        i = this._chartEngine._charts.length - 1;
        for (; i >= 0; i--) {
            chartObj = this._chartEngine._charts[i];
            if (chartObj.sheetIndex === this['_sheetIndex']) {
                this._chartEngine.removeChart(chartObj.chart);
            }
        }
        for (i = 0; i < this._oldCharts.length; i++) {
            chartSetting = this._oldCharts[i];
            if (chartSetting.sheetIndex === this['_sheetIndex']) {
                data = this._chartEngine._generateChartData(chartSetting.chartType, chartSetting.cellRanges);
                chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                chartObj.cellRanges = chartSetting.cellRanges;

                wjcCore.setCss(chartObj.chart.hostElement.parentElement, {
                    top: chartSetting.chartContainerRect.top + 'px',
                    left: chartSetting.chartContainerRect.left + 'px',
                    height: chartSetting.chartContainerRect.height + 'px',
                    width: chartSetting.chartContainerRect.width + 'px'
                });
            }

        }
        this._chartEngine._undoing = false;
    }

    /*
     * Overrides the redo method of its base class @see:_ColumnsChangedAction.
     */
    redo() {
        var chartObj: IChartObject,
            chartSetting: IChartSetting,
            data: any[],
            i: number;

        this._chartEngine._undoing = true;
        super.redo();

        i = this._chartEngine._charts.length - 1;
        for (; i >= 0; i--) {
            chartObj = this._chartEngine._charts[i];
            if (chartObj.sheetIndex === this['_sheetIndex']) {
                this._chartEngine.removeChart(chartObj.chart);
            }
        }
        for (i = 0; i < this._newCharts.length; i++) {
            chartSetting = this._newCharts[i];
            if (chartSetting.sheetIndex === this['_sheetIndex']) {
                data = this._chartEngine._generateChartData(chartSetting.chartType, chartSetting.cellRanges);
                chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                chartObj.cellRanges = chartSetting.cellRanges;

                wjcCore.setCss(chartObj.chart.hostElement.parentElement, {
                    top: chartSetting.chartContainerRect.top + 'px',
                    left: chartSetting.chartContainerRect.left + 'px',
                    height: chartSetting.chartContainerRect.height + 'px',
                    width: chartSetting.chartContainerRect.width + 'px'
                });
            }

        }
        this._chartEngine._undoing = false;
    }

    /*
     * Overrides the saveNewState method of its base class @see:_ColumnsChangedAction.
     */
    saveNewState(): boolean {
        this._newCharts = this._chartEngine._getChartSettings();
        return super.saveNewState();
    }
}

/*
 * Defines the _ChartRowsChangedAction class.
 *
 * It deals with the undo\redo for insert or delete column of the flexsheet.
 */
export class _ChartRowsChangedAction extends wjcGridSheet._RowsChangedAction {
    private _chartEngine: ChartEngine;
    private _oldCharts: IChartSetting[];
    private _newCharts: IChartSetting[];

    /*
     * Initializes a new instance of the @see:_ChartRowsChangedAction class.
     *
     * @param chartEngine The @see: ChartEngine that the _ChartRowsChangedAction works for.
     */
    constructor(chartEngine: ChartEngine) {
        super(chartEngine._owner);

        this._chartEngine = chartEngine;
        this._oldCharts = chartEngine._getChartSettings();
    }

    /*
     * Overrides the undo method of its base class @see:_RowsChangedAction.
     */
    undo() {
        var chartObj: IChartObject,
            chartSetting: IChartSetting,
            data: any[],
            i: number;

        this._chartEngine._undoing = true;
        super.undo();

        i = this._chartEngine._charts.length - 1;
        for (; i >= 0; i--) {
            chartObj = this._chartEngine._charts[i];
            if (chartObj.sheetIndex === this['_sheetIndex']) {
                this._chartEngine.removeChart(chartObj.chart);
            }
        }
        for (i = 0; i < this._oldCharts.length; i++) {
            chartSetting = this._oldCharts[i];
            if (chartSetting.sheetIndex === this['_sheetIndex']) {
                data = this._chartEngine._generateChartData(chartSetting.chartType, chartSetting.cellRanges);
                chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                chartObj.cellRanges = chartSetting.cellRanges;

                wjcCore.setCss(chartObj.chart.hostElement.parentElement, {
                    top: chartSetting.chartContainerRect.top + 'px',
                    left: chartSetting.chartContainerRect.left + 'px',
                    height: chartSetting.chartContainerRect.height + 'px',
                    width: chartSetting.chartContainerRect.width + 'px'
                });
            }

        }
        this._chartEngine._undoing = false;
    }

    /*
     * Overrides the redo method of its base class @see:_RowsChangedAction.
     */
    redo() {
        var chartObj: IChartObject,
            chartSetting: IChartSetting,
            data: any[],
            i: number;

        this._chartEngine._undoing = true;
        super.redo();

        i = this._chartEngine._charts.length - 1;
        for (; i >= 0; i--) {
            chartObj = this._chartEngine._charts[i];
            if (chartObj.sheetIndex === this['_sheetIndex']) {
                this._chartEngine.removeChart(chartObj.chart);
            }
        }
        for (i = 0; i < this._newCharts.length; i++) {
            chartSetting = this._newCharts[i];
            if (chartSetting.sheetIndex === this['_sheetIndex']) {
                data = this._chartEngine._generateChartData(chartSetting.chartType, chartSetting.cellRanges);
                chartObj = this._chartEngine.addChart(chartSetting.chartType, data, chartSetting.chartRect);
                chartObj.cellRanges = chartSetting.cellRanges;

                wjcCore.setCss(chartObj.chart.hostElement.parentElement, {
                    top: chartSetting.chartContainerRect.top + 'px',
                    left: chartSetting.chartContainerRect.left + 'px',
                    height: chartSetting.chartContainerRect.height + 'px',
                    width: chartSetting.chartContainerRect.width + 'px'
                });
            }

        }
        this._chartEngine._undoing = false;
    }

    /*
     * Overrides the saveNewState method of its base class @see:_RowsChangedAction.
     */
    saveNewState(): boolean {
        this._newCharts = this._chartEngine._getChartSettings();
        return super.saveNewState();
    }
}

/*
 * Resize mode for the chart.
 */
enum ResizeMode {
    /* No resizing */
    none = 0,
    /* Resizing towards left */
    left = 2,
    /* Resizing towards top */
    top = 4,
    /* Resizing towards right */
    right = 8,
    /* Resizing towards bottom */
    bottom = 16,
    /* Resizing towards left and top */
    leftTop = left | top,
    /* Resizing towards left and bottom */
    leftBottom = left | bottom,
    /* Resizing towards right and top */
    rightTop = right | top,
    /* Resizing towards right and bottom */
    rightBottom = right | bottom
}

/**
 * Defines the @see:ChartEngine class.
 *
 * The @see:ChartEngine class processes the @see:FlexChart for the @see:FlexSheet control.
 */
export class ChartEngine {
    _owner: wjcGridSheet.FlexSheet;
    _charts: IChartObject[] = [];
    private _chartMousePosition: wjcCore.Point = new wjcCore.Point();;
    private _chartOriginalBounds: wjcCore.Rect = new wjcCore.Rect(0, 0, 0, 0);
    private _containerOriginalBounds: wjcCore.Rect = new wjcCore.Rect(0, 0, 0, 0);
    private _containerRect: wjcCore.Rect;
    private _movingChart: boolean = false;
    _selectedChart: wjcChart.FlexChart;
    private _resizeMode: ResizeMode;
    private _resizingChart: boolean = false;
    private _chartHost: HTMLDivElement;
    _lastScrollPosition: wjcCore.Point = new wjcCore.Point();
    private _currentSheetIndex: number;
    private _toRefresh: number;
    _undoing: boolean = false;
    private _undoAction: wjcGridSheet._UndoAction;

    /**
     * Initializes a new instance of the @see:ChartEngine class.
     *
     * @param owner The @see: FlexSheet control that the <b>ChartEngine</b> works for.
     */
    constructor(owner: wjcGridSheet.FlexSheet) {
        this._owner = owner;

        this._init();
    }

    /**
     *  Add chart into FlexSheet
     *
     * @param chartType the type of the chart.
     * @param data the data used to render the chart.
     * @param chartRect the bounds rectangle to locate the chart.
     */
    addChart(chartType?: wjcChart.ChartType, data?: any[], chartRect?: wjcCore.Rect): IChartObject {
        if (chartType == null) {
            chartType = wjcChart.ChartType.Column;
        }
        if (chartRect == null) {
            chartRect = this._getChartRect();
        }
        return this._appendChart(chartType, data, chartRect);
    }

    /**
     * Remove the specified chart in the FlexSheet.
     * If the chart is not specified, it will remove the selected chart in FlexSheet. 
     *
     * @param chart The specified chart to remove.
     */
    removeChart(chart?: wjcChart.FlexChart) {
        var delChart = chart ? chart : this._selectedChart,
            chartObj: IChartObject,
            i: number,
            undoAction: _ChartRemoveAction;

        if (delChart && this._charts.length > 0) {
            for (i = 0; i < this._charts.length; i++) {
                chartObj = this._charts[i];
                if (delChart === chartObj.chart) {
                    if (!this._undoing) {
                        undoAction = new _ChartRemoveAction(this, chartObj);
                        this._owner.undoStack._addAction(undoAction);
                    }
                    this._charts.splice(i, 1);
                    this._chartHost.removeChild(delChart.hostElement.parentElement);
                    delChart._hideToolTip();
                    delChart.dispose();
                    delChart = null;
                    break;
                }
            }
        }

        this._owner.hostElement.focus();
    }

    // Initialize the chart engine.
    private _init() {
        var self = this;

        self._currentSheetIndex = self._owner.selectedSheetIndex;
        self._chartHost = document.createElement('div');
        wjcCore.setCss(self._chartHost, {
            position: 'relative',
            zIndex: 100,
            top: '0px',
            left: '0px',
            height: '0px'
        });
        self._owner.hostElement.insertBefore(self._chartHost, self._owner.hostElement.firstChild);

        self._owner.selectedSheetChanged.addHandler(() => {
            var chartObj: IChartObject;

            // Show/hide chart for current sheet
            for (var i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                    chartObj.chart.hostElement.parentElement.style.display = 'inline';
                    chartObj.chart.refresh();
                } else {
                    chartObj.chart.hostElement.parentElement.style.display = 'none';
                }
            }

            self._lastScrollPosition = self._owner.selectedSheet._scrollPosition;
            self._currentSheetIndex = self._owner.selectedSheetIndex;
        });

        self._owner.cellEditEnded.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
            var chartObj: IChartObject,
                cellRange: wjcGrid.CellRange;

            if (args.data && (args.data.keyCode === 46 || args.data.keyCode === 8)) {
                return;
            }
            // Updated the charts the cell ranges contains the editted cell.
            for (var i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                    for (var j = 0; j < chartObj.cellRanges.length; j++) {
                        cellRange = chartObj.cellRanges[j];
                        if (cellRange.contains(args.range)) {
                            self._updateChart(chartObj);
                            break;
                        }
                    }
                }
            }
        });

        // Adjust the position of the charts in current sheet after scrolling current sheet.
        self._owner.scrollPositionChanged.addHandler(() => {
            var deltaScrollX = self._owner.scrollPosition.x - self._lastScrollPosition.x,
                deltaScrollY = self._owner.scrollPosition.y - self._lastScrollPosition.y,
                chartObj: IChartObject,
                i: number;

            if (self._currentSheetIndex !== self._owner.selectedSheetIndex) {
                return;
            }

            for (i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                    self._scrollChart(chartObj.chart, deltaScrollX, deltaScrollY);
                }
            }

            self._lastScrollPosition = self._owner.scrollPosition;
        });

        // Clear all the charts when the FlexSheet was cleared.
        self._owner.sheetCleared.addHandler(() => {
            var chartObj: IChartObject,
                delChart: wjcChart.FlexChart,
                i: number;

            for (i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                delChart = chartObj.chart;
                self._chartHost.removeChild(delChart.hostElement.parentElement);
                delChart._hideToolTip();
                delChart.dispose();
                delChart = null;
            }
            self._charts.splice(0, self._charts.length);
        });

        self._owner.updatedView.addHandler(() => {
            if (self._toRefresh) {
                clearTimeout(self._toRefresh);
                self._toRefresh = null;
            }
            self._toRefresh = setTimeout(() => {
                var chartObj: IChartObject;

                // Updated the charts after refreshing current sheet.
                for (var i = 0; i < self._charts.length; i++) {
                    chartObj = self._charts[i];
                    if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                        self._updateChart(chartObj);
                    }
                }
            }, 100);
        });

        self._owner.prepareChangingRow.addHandler(() => {
            self._undoAction = new _ChartRowsChangedAction(self);
        });

        self._owner.rowChanged.addHandler((sender: any, args: wjcGridSheet.RowColumnChangedEventArgs) => {
            var chartObj: IChartObject,
                currentAction: wjcGridSheet._UndoAction;

            for (var i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                    self._updateChartRange(chartObj, args.index, args.count, args.added, true);
                }
            }

            currentAction = self._owner.undoStack._pop();
            if (currentAction instanceof wjcGridSheet._RowsChangedAction) {
                (<_ChartRowsChangedAction>self._undoAction)._affectedFormulas = currentAction._affectedFormulas;
                (<_ChartRowsChangedAction>self._undoAction)._affectedDefinedNameVals = currentAction._affectedDefinedNameVals;
                (<_ChartRowsChangedAction>self._undoAction)._deletedTables = currentAction._deletedTables;
                self._undoAction.saveNewState();
                self._owner.undoStack._addAction(self._undoAction);
                self._undoAction = null;
            } else {
                self._owner.undoStack._addAction(currentAction);
            }
        });

        self._owner.prepareChangingColumn.addHandler(() => {
            self._undoAction = new _ChartColumnsChangedAction(self);
        });

        self._owner.columnChanged.addHandler((sender: any, args: wjcGridSheet.RowColumnChangedEventArgs) => {
            var chartObj: IChartObject,
                currentAction: wjcGridSheet._UndoAction;

            for (var i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.sheetIndex === self._owner.selectedSheetIndex) {
                    self._updateChartRange(chartObj, args.index, args.count, args.added, false);
                }
            }

            currentAction = self._owner.undoStack._pop();
            if (currentAction instanceof wjcGridSheet._ColumnsChangedAction) {
                (<_ChartColumnsChangedAction>self._undoAction)._affectedFormulas = currentAction._affectedFormulas;
                (<_ChartColumnsChangedAction>self._undoAction)._affectedDefinedNameVals = currentAction._affectedDefinedNameVals;
                (<_ChartColumnsChangedAction>self._undoAction)._deletedTables = currentAction._deletedTables;
                self._undoAction.saveNewState();
                self._owner.undoStack._addAction(self._undoAction);
                self._undoAction = null;
            } else {
                self._owner.undoStack._addAction(currentAction);
            }
        });

        document.addEventListener('mousedown', () => {
            if (self._selectedChart && !self._movingChart && !self._resizingChart) {
                self._selectedChart.hostElement.style.borderStyle = 'none';
                self._selectedChart = null;
            }
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (self._selectedChart && e.keyCode === 46) {
                self.removeChart();
                self._selectedChart = null;
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    // Generate the data for the adding chart
    _generateChartData(chartType: wjcChart.ChartType, cellRanges?: wjcGrid.CellRange[]) {
        var selections = <wjcGrid.CellRange[]>(cellRanges ? cellRanges : this._owner.selectedSheet.selectionRanges),
            selection: wjcGrid.CellRange,
            datas: any[],
            index: number,
            startRowIndex: number,
            item: any,
            seriesBinding: any,
            seriesIndex: number,
            lastSeriesIndex: number,
            needSeriesBinding: boolean,
            xIndex: number,
            mergedCells: wjcGrid.CellRange,
            cellVal: any;

        if (this._owner.rows.length === 0 || this._owner.columns.length === 0) {
            return null;
        }
        datas = [];
        seriesIndex = 0;
        selections = selections.length > 0 ? selections : [this._owner.selection]
        needSeriesBinding = this._checkSeriesBinding(selections);
        xIndex = this._checkBindingX(needSeriesBinding, selections, chartType);
        for (var i = 0; i < selections.length; i++) {
            selection = selections[i];
            if (!selection.isValid) {
                continue;
            }
            startRowIndex = selection.topRow + (needSeriesBinding ? 1 : 0);
            index = 0;
            lastSeriesIndex = seriesIndex;
            for (var rowIndex = startRowIndex; rowIndex <= selection.bottomRow; rowIndex++) {
                if (this._owner.rows[rowIndex].visible) {
                    seriesIndex = lastSeriesIndex;
                    if (!datas[index]) {
                        item = {}
                        datas[index] = item;
                    } else {
                        item = datas[index];
                    }
                    for (var colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                        if (this._owner.columns[colIndex].visible) {
                            mergedCells = this._owner.getMergedRange(this._owner.cells, rowIndex, colIndex);
                            if (colIndex === xIndex) {
                                if (mergedCells == null || (rowIndex === mergedCells.topRow && colIndex === mergedCells.leftCol)) {
                                    if (chartType === wjcChart.ChartType.Scatter) {
                                        if (!wjcCore.isNumber(this._owner.getCellValue(rowIndex, colIndex))) {
                                            item.x = index + 1;
                                        } else {
                                            item.x = this._owner.getCellValue(rowIndex, colIndex, true);
                                        }
                                    } else {
                                        item.x = this._owner.getCellValue(rowIndex, colIndex, true);
                                    }
                                } else {
                                    if (chartType === wjcChart.ChartType.Scatter) {
                                        item = null;
                                    } else {
                                        item.x = '';
                                    }
                                }
                            } else if (item) {
                                if (mergedCells == null || (rowIndex === mergedCells.topRow && colIndex === mergedCells.leftCol)) {
                                    cellVal = this._owner.getCellValue(rowIndex, colIndex);
                                } else {
                                    if (chartType === wjcChart.ChartType.Scatter) {
                                        cellVal = null;
                                    } else {
                                        cellVal = 0;
                                    }
                                }
                                if (cellVal != null && !wjcCore.isNumber(cellVal)) {
                                    cellVal = 0;
                                }
                                if (needSeriesBinding) {
                                    seriesBinding = this._owner.getCellValue(startRowIndex - 1, colIndex);
                                    item[seriesBinding] = cellVal;
                                } else {
                                    seriesIndex++;
                                    item['series' + seriesIndex] = cellVal;
                                }
                            }
                        }
                    }
                    if (item && !item.x && xIndex !== -1) {
                        item.x = '';
                    }
                    index++;
                }
            }
        }

        return datas;
    }

    // Gets the rectangle for the adding chart.
    private _getChartRect(): wjcCore.Rect {
        var root = this._owner['_root'],
            cells = this._owner['_eCt'],
            rect = new wjcCore.Rect(0, 0, 468, 284),
            elementWidth: number,
            elementHeight: number;

        elementWidth = root.clientWidth > cells.clientWidth ? cells.clientWidth : root.clientWidth;
        elementHeight = root.clientHeight > cells.clientHeight ? cells.clientHeight : root.clientHeight;
        rect.left = cells.offsetLeft + (elementWidth - rect.width) / 2;
        rect.top = cells.offsetTop + (elementHeight - rect.height) / 2;
        return rect;
    }

    // Appends the chart into FlexSheet.
    private _appendChart(chartType: wjcChart.ChartType, data: any[], chartRect: wjcCore.Rect): IChartObject {
        var self = this,
            chartContainer = document.createElement('div'),
            hostElement = document.createElement('div'),
            mouseUp = () => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
                self._mouseUp();
            },
            mouseMove = (e: MouseEvent) => {
                self._mouseMove(e);
            },
            cellRanges: wjcGrid.CellRange[],
            range: wjcGrid.CellRange,
            chart: wjcChart.FlexChart,
            undoAction: _ChartInsertAction,
            chartObj: IChartObject;

        if (data == null) {
            data = self._generateChartData(chartType);
            if (!data || data.length === 0) {
                return;
            }
            cellRanges = [];
            for (var i = 0; i < self._owner.selectedSheet.selectionRanges.length; i++) {
                range = self._owner.selectedSheet.selectionRanges[i];
                cellRanges.push(range.clone());
            }
        }

        wjcCore.setCss(hostElement, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            height: chartRect.height + 'px',
            width: chartRect.width + 'px',
            borderWidth: '2px',
            borderStyle: 'dashed'
        });
        hostElement.focus();
        chartContainer.appendChild(hostElement);

        wjcCore.setCss(chartContainer, {
            position: 'absolute',
            display: 'inline',
            overflow: 'hidden',
            zIndex: '1',
            top: chartRect.top + 'px',
            left: chartRect.left + 'px',
            height: chartRect.height + 'px',
            width: chartRect.width + 'px'
        });
        self._chartHost.appendChild(chartContainer);

        chart = new wjcChart.FlexChart(hostElement);
        chart.chartType = chartType;
        chart.itemsSource = data;

        hostElement.addEventListener('mousedown', (e) => {
            var i: number,
                chartObj: IChartObject;

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            self._mouseDown(e, hostElement);

            self._selectedChart = chart;
            for (i = 0; i < self._charts.length; i++) {
                chartObj = self._charts[i];
                if (chartObj.chart !== self._selectedChart) {
                    chartObj.chart.hostElement.style.borderStyle = 'none';
                }
            }
            e.preventDefault();
        }, true);

        hostElement.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        hostElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        hostElement.addEventListener('mousemove', (e) => {
            if (self._resizingChart || self._movingChart) {
                return;
            }
            self._hoverChart(e, chart);
        });

        if (data && data.length > 0) {
            self._setChartSeries(chart, data[0]);
        }

        self._selectedChart = chart;

        if (!self._undoing) {
            undoAction = new _ChartInsertAction(self, chartType, data, chartRect, cellRanges);
            self._owner.undoStack._addAction(undoAction);
        }

        chartObj = {
            sheetIndex: self._owner.selectedSheetIndex,
            cellRanges: cellRanges,
            chart: chart
        };

        self._charts.push(chartObj);

        self._owner.hostElement.focus();

        return chartObj;
    }

    // Check whether the chart data contains series binding.
    private _checkSeriesBinding(selections: wjcGrid.CellRange[]): boolean {
        var selection: wjcGrid.CellRange,
            startRowIndex: number,
            cellData: any,
            needSeriesBinding = true;

        for (var i = 0; i < selections.length; i++) {
            selection = selections[i];
            if (selection.isValid) {
                startRowIndex = selection.topRow;
                for (var colIndex = selection.leftCol; colIndex <= selection.rightCol; colIndex++) {
                    cellData = this._owner.getCellValue(startRowIndex, colIndex);
                    if (!wjcCore.isString(cellData) || !cellData) {
                        needSeriesBinding = false;
                        break;
                    }
                }
            } else {
                needSeriesBinding = false;
            }
        }

        return needSeriesBinding;
    }

    // Check whether the chart data contains binding x.
    private _checkBindingX(needSeriesBinding: boolean, selections: wjcGrid.CellRange[], chartType: wjcChart.ChartType): number {
        var xIndex = -1,
            selection: wjcGrid.CellRange,
            colIndex: number,
            startRowIndex: number,
            cellData: any;

        selectionLoop:
        for (var i = 0; i < selections.length; i++) {
            selection = selections[i];
            if (selection.isValid) {
                colIndex = selection.leftCol;
                if (this._owner.columns[colIndex].dataMap != null) {
                    if (xIndex === -1 || xIndex < colIndex) {
                        xIndex = colIndex;
                    }
                } else {
                    startRowIndex = selection.topRow + (needSeriesBinding ? 1 : 0);
                    for (var rowIndex = startRowIndex; rowIndex <= selection.bottomRow; rowIndex++) {
                        cellData = this._owner.getCellValue(rowIndex, colIndex);
                        if (((typeof cellData === 'string' && !!cellData) || cellData instanceof Date) && (xIndex === -1 || xIndex < colIndex)) {
                            xIndex = colIndex;
                            continue selectionLoop;
                        }
                    }
                }
            }
        }

        if (chartType === wjcChart.ChartType.Scatter && xIndex === -1) {
            for (var j = 0; j < selections.length; j++) {
                selection = selections[j];
                if (selection.isValid) {
                    if (xIndex === -1 || xIndex > selection.leftCol) {
                        xIndex = selection.leftCol;
                    }
                }
            }
        }

        return xIndex;
    };

    // Set the series for the adding/updating chart.
    private _setChartSeries(chart: wjcChart.FlexChart, item: any) {
        Object.keys(item).forEach((key) => {
            var series = new wjcChart.Series();
            if (key === 'x') {
                chart.bindingX = key;
            } else {
                series.name = key;
                series.binding = key;
                chart.series.push(series);
            }
        });
    }

    // Update the chart in the FlexSheet.
    private _updateChart(chartObj: IChartObject) {
        if (!!chartObj.cellRanges) {
            var data = this._generateChartData(chartObj.chart.chartType, chartObj.cellRanges);
            chartObj.chart.itemsSource = data;
            chartObj.chart.series.clear();
            if (data && data.length > 0) {
                this._setChartSeries(chartObj.chart, data[0]);
            }
        }
    }

    // Indicates resize mode for the chart.
    private _hoverChart(e: MouseEvent, chart: wjcChart.FlexChart) {
        var hostElement = chart.hostElement,
            offset = this._cumulativeOffset(hostElement),
            right = offset.x + hostElement.clientWidth,
            bottom = offset.y + hostElement.clientHeight;

        if (chart !== this._selectedChart) {
            hostElement.style.cursor = 'move';
            return;
        }

        this._resizeMode = ResizeMode.none;
        hostElement.style.cursor = 'move';
        if (e.clientX < offset.x || e.clientX > right || e.clientY < offset.y || e.clientY > bottom) {
            return;
        }

        if (e.clientX > offset.x && e.clientX <= offset.x + 10) {
            this._resizeMode = this._resizeMode | ResizeMode.left;
        }
        if (e.clientX >= right - 10 && e.clientX < right) {
            this._resizeMode = this._resizeMode | ResizeMode.right;
        }
        if (e.clientY > offset.y && e.clientY <= offset.y + 10) {
            this._resizeMode = this._resizeMode | ResizeMode.top;
        }
        if (e.clientY >= bottom - 10 && e.clientY < bottom) {
            this._resizeMode = this._resizeMode | ResizeMode.bottom;
        }

        if (this._resizeMode & ResizeMode.right) {
            if (this._resizeMode & ResizeMode.bottom) {
                hostElement.style.cursor = 'se-resize';
            } else if (this._resizeMode & ResizeMode.top) {
                hostElement.style.cursor = 'ne-resize';
            } else {
                hostElement.style.cursor = 'e-resize';
            }
            return;
        }
        if (this._resizeMode & ResizeMode.left) {
            if (this._resizeMode & ResizeMode.bottom) {
                hostElement.style.cursor = 'sw-resize';
            } else if (this._resizeMode & ResizeMode.top) {
                hostElement.style.cursor = 'nw-resize';
            } else {
                hostElement.style.cursor = 'w-resize';
            }
            return;
        }
        if (this._resizeMode & ResizeMode.bottom) {
            hostElement.style.cursor = 's-resize';
        } else if (this._resizeMode & ResizeMode.top) {
            hostElement.style.cursor = 'n-resize';
        }
    }

    // Event handler for mouse move event to indicate to move chart or reszie chart.
    private _mouseMove(e: MouseEvent) {
        var hostEle: HTMLElement,
            deltaX: number,
            deltaY: number,
            left: number,
            top: number;

        if (!this._selectedChart) {
            return;
        }

        hostEle = this._selectedChart.hostElement;
        deltaX = e.clientX - this._chartMousePosition.x;
        deltaY = e.clientY - this._chartMousePosition.y;
        left = this._containerOriginalBounds.left + deltaX;
        top = this._containerOriginalBounds.top + deltaY;

        this._owner.hostElement.style.cursor = '';
        if (this._movingChart) {
            this._moveChart(e, left, top, deltaX, deltaY);
        } else if (this._resizingChart) {
            this._owner.hostElement.style.cursor = hostEle.style.cursor;
            this._resizeChart(e, left, top, deltaX, deltaY);
            this._selectedChart.refresh();
        }
    }

    // Event handler for mouse down event.
    private _mouseDown(e: MouseEvent, hostElement: HTMLElement) {
        var root = this._owner['_root'],
            cells = this._owner['_eCt'],
            rowHeader = this._owner['_eRHdr'],
            columnHeader = this._owner['_eCHdr'];

        hostElement.style.borderStyle = 'dashed';
        hostElement.focus();

        this._containerRect = new wjcCore.Rect(cells.offsetLeft, cells.offsetTop,
            root.clientWidth > cells.clientWidth ? cells.clientWidth : (root.clientWidth - rowHeader.clientWidth),
            root.clientHeight > cells.clientHeight ? cells.clientHeight : (root.clientHeight - columnHeader.clientHeight));

        this._chartMousePosition.x = e.clientX;
        this._chartMousePosition.y = e.clientY;

        this._containerOriginalBounds.left = hostElement.parentElement.offsetLeft;
        this._containerOriginalBounds.top = hostElement.parentElement.offsetTop;
        this._containerOriginalBounds.width = hostElement.parentElement.offsetWidth;
        this._containerOriginalBounds.height = hostElement.parentElement.offsetHeight;

        this._chartOriginalBounds.left = hostElement.offsetLeft;
        this._chartOriginalBounds.top = hostElement.offsetTop;
        this._chartOriginalBounds.width = hostElement.offsetWidth;
        this._chartOriginalBounds.height = hostElement.offsetHeight;

        if (hostElement.style.cursor === 'move') {
            this._movingChart = true;
        } else if (this._resizeMode !== ResizeMode.none) {
            this._resizingChart = true;
        }
    }

    // Event handler for mouse up event to reset the move chart and resize chart status.
    private _mouseUp() {
        this._movingChart = false;
        this._resizingChart = false;
        this._resizeMode = ResizeMode.none;
    }

    // Move the chart in the FlexSheet.
    private _moveChart(e: MouseEvent, left: number, top: number, deltaX: number, deltaY: number) {
        var hostElement = this._selectedChart.hostElement,
            container = hostElement.parentElement,
            width = 0,
            height = 0,
            innerDelta: number;

        // Adjust the horizontal postion and width of the chart, if the horizontal part of the chart is partial visible with the sheet scrolling.
        if (this._containerOriginalBounds.width < this._chartOriginalBounds.width) {
            if (hostElement.offsetLeft < 0) {
                //Adjust the chart if the left part of the chart is invisible.
                if (deltaX > 0) {
                    innerDelta = this._chartOriginalBounds.left + deltaX;
                    if (innerDelta > 0) {
                        width = this._chartOriginalBounds.width;
                        hostElement.style.left = '0px';
                        left = innerDelta;
                        this._chartOriginalBounds.left = 0;
                        this._containerOriginalBounds.width = width;
                        this._chartMousePosition.x = e.clientX;
                    } else {
                        width = this._containerOriginalBounds.width + deltaX;
                        hostElement.style.left = innerDelta + 'px';
                        left = 0;
                    }
                }
            } else {
                //Adjust the chart if the right part of the chart is invisible.
                if (deltaX < 0) {
                    if (this._containerOriginalBounds.width - deltaX > this._chartOriginalBounds.width) {
                        width = this._chartOriginalBounds.width;
                        this._containerOriginalBounds.width = width;
                    } else {
                        width = this._containerOriginalBounds.width - deltaX;
                    }
                }
            }
        }

        // Adjust the vertical postion and height of the chart, if the vertical part of the chart is partial visible with the sheet scrolling.
        if (this._containerOriginalBounds.height < this._chartOriginalBounds.height) {
            if (hostElement.offsetTop < 0) {
                //Adjust the chart if the top part of the chart is invisible.
                if (deltaY > 0) {
                    innerDelta = this._chartOriginalBounds.top + deltaY;
                    if (innerDelta > 0) {
                        height = this._chartOriginalBounds.height;
                        hostElement.style.top = '0px';
                        top = innerDelta;
                        this._chartOriginalBounds.top = 0;
                        this._containerOriginalBounds.height = height;
                        this._chartMousePosition.y = e.clientY;
                    } else {
                        height = this._containerOriginalBounds.height + deltaY;
                        hostElement.style.top = innerDelta + 'px';
                        top = 0;
                    }
                }
            } else {
                //Adjust the chart if the bottom part of the chart is invisible.
                if (deltaY < 0) {
                    if (this._containerOriginalBounds.height - deltaY > this._chartOriginalBounds.height) {
                        height = this._chartOriginalBounds.height;
                        this._containerOriginalBounds.height = height;
                    } else {
                        height = this._containerOriginalBounds.height - deltaY;
                    }
                }
            }
        }

        if (left < this._containerRect.left) {
            left = this._containerRect.left;
        } else if (left + container.clientWidth > this._containerRect.left + this._containerRect.width) {
            left = this._containerRect.left + this._containerRect.width - container.clientWidth;
        }
        if (top < this._containerRect.top) {
            top = this._containerRect.top;
        } else if (top + container.clientHeight > this._containerRect.top + this._containerRect.height) {
            top = this._containerRect.top + this._containerRect.height - container.clientHeight;
        }

        if (width > 0) {
            container.style.width = width + 'px';
        }
        if (height > 0) {
            container.style.height = height + 'px';
        }
        container.style.left = left + 'px';
        container.style.top = top + 'px';
    }

    // Resize the chart in the FlexSheet.
    private _resizeChart(e: MouseEvent, left: number, top: number, deltaX: number, deltaY: number) {
        var hostEle = this._selectedChart.hostElement,
            container = hostEle.parentElement,
            cells = this._owner['_eCt'],
            offset = this._cumulativeOffset(cells);

        if (!!(this._resizeMode & ResizeMode.right) && e.clientX < offset.x + this._containerRect.width) {
            hostEle.style.width = this._chartOriginalBounds.width + deltaX + 'px';
            container.style.width = this._containerOriginalBounds.width + deltaX + 'px';
        }
        if (!!(this._resizeMode & ResizeMode.left) && e.clientX >= offset.x) {
            container.style.left = left + 'px';
            hostEle.style.width = this._chartOriginalBounds.width - deltaX + 'px';
            container.style.width = this._containerOriginalBounds.width - deltaX + 'px';
        }
        if (!!(this._resizeMode & ResizeMode.bottom) && e.clientY < offset.y + this._containerRect.height) {
            hostEle.style.height = this._chartOriginalBounds.height + deltaY + 'px';
            container.style.height = this._containerOriginalBounds.height + deltaY + 'px';
        }
        if (!!(this._resizeMode & ResizeMode.top) && e.clientY >= offset.y) {
            container.style.top = top + 'px';
            hostEle.style.height = this._chartOriginalBounds.height - deltaY + 'px';
            container.style.height = this._containerOriginalBounds.height - deltaY + 'px';
        }
    }

    // Adjust the position of chart with scrolling.
    private _scrollChart(chart: wjcChart.FlexChart, deltaScrollX: number, deltaScrollY: number) {
        var hostElement = chart.hostElement,
            container = hostElement.parentElement;

        if (deltaScrollX < 0) {
            this._scrollRightDownChart(hostElement, container, deltaScrollX, true);
            return;
        }
        if (deltaScrollY < 0) {
            this._scrollRightDownChart(hostElement, container, deltaScrollY);
            return;
        }
        if (deltaScrollX > 0) {
            this._scrollLeftUpChart(hostElement, container, deltaScrollX, true);
            return;
        }
        if (deltaScrollY > 0) {
            this._scrollLeftUpChart(hostElement, container, deltaScrollY);
            return;
        }
    }

    // Adjust the position of the chart with right\down scroll direction.
    private _scrollRightDownChart(hostElement: HTMLElement, container: HTMLElement, delta: number, isHorizontal: boolean = false) {
        var root = this._owner['_root'],
            cells = this._owner['_eCt'],
            direction = isHorizontal ? 'Left' : 'Top',
            widthOrHeight = isHorizontal ? 'Width' : 'Height',
            containerSize = container['offset' + widthOrHeight],
            chartSize = hostElement['offset' + widthOrHeight],
            innerDelta = 0,
            pos: number;

        if (container['offset' + direction] === root['offset' + direction] + root['client' + widthOrHeight]) {
            innerDelta = hostElement['offset' + direction] + delta;
            if (innerDelta > 0) {
                hostElement.style[direction.toLowerCase()] = innerDelta + 'px';
                pos = container['offset' + direction];
            } else {
                hostElement.style[direction.toLowerCase()] = '0px';
                container.style[widthOrHeight.toLowerCase()] = containerSize - innerDelta + 'px';
                pos = container['offset' + direction] + innerDelta;
            }
        } else {
            pos = container['offset' + direction] + delta;
            if (containerSize < chartSize && container['offset' + direction] !== cells['offset' + direction]) {
                innerDelta = containerSize - delta;
                if (innerDelta > chartSize) {
                    container.style[widthOrHeight.toLowerCase()] = chartSize + 'px';
                } else {
                    container.style[widthOrHeight.toLowerCase()] = innerDelta + 'px';
                }
            } else {
                if (pos < cells['offset' + direction]) {
                    innerDelta = cells['offset' + direction] - pos;
                    pos = cells['offset' + direction];
                }
                if (innerDelta > 0) {
                    if (innerDelta <= container['offset' + widthOrHeight]) {
                        container.style[widthOrHeight.toLowerCase()] = container['offset' + widthOrHeight] - innerDelta + 'px';
                    } else {
                        container.style[widthOrHeight.toLowerCase()] = '0px';
                    }
                    hostElement.style[direction.toLowerCase()] = hostElement['offset' + direction] - innerDelta + 'px';
                }
            }
        }

        container.style[direction.toLowerCase()] = pos + 'px';
    }

    // Adjust the position of the chart with left\up scroll direction.
    private _scrollLeftUpChart(hostElement: HTMLElement, container: HTMLElement, delta: number, isHorizontal: boolean = false) {
        var root = this._owner['_root'],
            cells = this._owner['_eCt'],
            direction = isHorizontal ? 'Left' : 'Top',
            widthOrHeight = isHorizontal ? 'Width' : 'Height',
            containerSize = container['offset' + widthOrHeight],
            chartSize = hostElement['offset' + widthOrHeight],
            innerDelta = 0,
            pos: number;

        if (container['offset' + direction] === cells['offset' + direction]) {
            if (containerSize < chartSize) {
                innerDelta = hostElement['offset' + direction] + delta;
                if (innerDelta < 0) {
                    if (chartSize + innerDelta > 0) {
                        container.style[widthOrHeight.toLowerCase()] = chartSize + innerDelta + 'px';
                    }
                    hostElement.style[direction.toLowerCase()] = innerDelta + 'px';
                    pos = cells['offset' + direction];
                } else {
                    hostElement.style[direction.toLowerCase()] = '0px';
                    container.style[widthOrHeight.toLowerCase()] = chartSize + 'px';
                    pos = cells['offset' + direction] + innerDelta;
                }
            } else {
                pos = container['offset' + direction] + delta;
            }
        } else if (container['offset' + direction] === root['offset' + direction] + root['client' + widthOrHeight]) {
            hostElement.style[direction.toLowerCase()] = hostElement['offset' + direction] + delta + 'px';
            pos = root['offset' + direction] + root['client' + widthOrHeight];
        } else {
            pos = container['offset' + direction] + delta;
            if (pos + containerSize > root['offset' + direction] + root['client' + widthOrHeight]) {
                innerDelta = pos + containerSize - root['offset' + direction] - root['client' + widthOrHeight];
                if (innerDelta > containerSize) {
                    pos = root['offset' + direction] + root['client' + widthOrHeight];
                    container.style[widthOrHeight.toLowerCase()] = '0px';
                    hostElement.style[direction.toLowerCase()] = hostElement['offset' + direction] + innerDelta - containerSize + 'px';
                } else {
                    container.style[widthOrHeight.toLowerCase()] = container['offset' + widthOrHeight] - innerDelta + 'px';
                }
            }
        }

        container.style[direction.toLowerCase()] = pos + 'px';
    }

    // Gets the absolute offset for the element.
    private _cumulativeOffset(element: any): wjcCore.Point {
        var top = 0, left = 0;

        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return new wjcCore.Point(left, top);
    }

    // Update the cell range of the chart.
    private _updateChartRange(chartObj: IChartObject, index: number, count: number, isAdd: boolean, isRow: boolean) {
        var selection: wjcGrid.CellRange,
            max: number,
            min: number;

        for (var i = 0; i < chartObj.cellRanges.length; i++) {
            selection = chartObj.cellRanges[i];
            if (!selection.isValid) {
                continue;
            }
            if (isAdd) {
                if (isRow) {
                    if (index <= selection.bottomRow) {
                        selection.row2 += count;
                        if (index <= selection.topRow) {
                            selection.row += count;
                        }
                    }
                } else {
                    if (index <= selection.rightCol) {
                        selection.col2 += count;
                        if (index <= selection.leftCol) {
                            selection.col += count;
                        }
                    }
                }
            } else {
                if (isRow) {
                    if (index <= selection.bottomRow) {
                        if (index + count <= selection.bottomRow) {
                            max = selection.bottomRow - count;
                        } else {
                            max = index - 1;
                        }
                        min = selection.topRow;
                        if (index <= selection.topRow) {
                            if (index + count <= selection.topRow) {
                                min = selection.topRow - count;
                            } else {
                                min = index;
                            }
                        }
                        if (max < min) {
                            if (min === index) {
                                min = -1;
                            }
                            max = min;
                        }
                        selection.row = min;
                        selection.row2 = max;
                    }
                } else {
                    if (index <= selection.rightCol) {
                        if (index + count <= selection.rightCol) {
                            max = selection.rightCol - count;
                        } else {
                            max = index - 1;
                        }
                        min = selection.leftCol;
                        if (index <= selection.leftCol) {
                            if (index + count <= selection.leftCol) {
                                min = selection.leftCol - count;
                            } else {
                                min = index;
                            }
                        }
                        if (max < min) {
                            if (min === index) {
                                min = -1;
                            }
                            max = min;
                        }
                        selection.col = min;
                        selection.col2 = max;
                    }
                }
            }
        }
    }

    // Get the settings of all charts in current FlexSheet.
    _getChartSettings(): IChartSetting[] {
        var charts: IChartSetting[] = [],
            chartObj: IChartObject,
            chartHost: HTMLElement,
            chartContainer: HTMLElement;

        for (var i = 0; i < this._charts.length; i++) {
            chartObj = this._charts[i];
            chartHost = chartObj.chart.hostElement;
            chartContainer = chartHost.parentElement;
            charts[i] = {
                sheetIndex: chartObj.sheetIndex,
                cellRanges: chartObj.cellRanges ? this._cloneChartRanges(chartObj.cellRanges) : null,
                chartType: chartObj.chart.chartType,
                chartRect: new wjcCore.Rect(chartHost.offsetLeft, chartHost.offsetTop, chartHost.offsetWidth, chartHost.offsetHeight),
                chartContainerRect: new wjcCore.Rect(chartContainer.offsetLeft, chartContainer.offsetTop, chartContainer.offsetWidth, chartContainer.offsetHeight)
            };
        }

        return charts;
    }

    // Clone the cell ranges of the specific chart.
    private _cloneChartRanges(ranges: wjcGrid.CellRange[]) {
        var cloneRanges = [];
        for (var i = 0; i < ranges.length; i++) {
            cloneRanges[i] = ranges[i].clone();
        }
        return cloneRanges;
    }
}

export interface IChartObject {
    sheetIndex: number;
    cellRanges?: wjcGrid.CellRange[];
    chart: wjcChart.FlexChart;
}

export interface IChartSetting {
    sheetIndex: number;
    cellRanges: wjcGrid.CellRange[];
    chartType: wjcChart.ChartType;
    chartRect: wjcCore.Rect;
    chartContainerRect: wjcCore.Rect;
}