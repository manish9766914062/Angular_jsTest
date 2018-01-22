import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcChart from 'wijmo/wijmo.chart';
export declare class _ChartInsertAction extends wjcGridSheet._UndoAction {
    private _chartEngine;
    private _chartType;
    private _data;
    private _chartRect;
    private _chartContainerRect;
    private _cellRnages;
    constructor(chartEngine: ChartEngine, chartType: wjcChart.ChartType, data: any[], chartRect: wjcCore.Rect, cellRanges: wjcGrid.CellRange[]);
    undo(): void;
    redo(): void;
}
export declare class _ChartRemoveAction extends wjcGridSheet._UndoAction {
    private _chartEngine;
    private _chartType;
    private _data;
    private _cellRnages;
    private _chartRect;
    private _chartContainerRect;
    constructor(chartEngine: ChartEngine, chartObj: IChartObject);
    undo(): void;
    redo(): void;
}
export declare class _ChartColumnsChangedAction extends wjcGridSheet._ColumnsChangedAction {
    private _chartEngine;
    private _oldCharts;
    private _newCharts;
    constructor(chartEngine: ChartEngine);
    undo(): void;
    redo(): void;
    saveNewState(): boolean;
}
export declare class _ChartRowsChangedAction extends wjcGridSheet._RowsChangedAction {
    private _chartEngine;
    private _oldCharts;
    private _newCharts;
    constructor(chartEngine: ChartEngine);
    undo(): void;
    redo(): void;
    saveNewState(): boolean;
}
/**
 * Defines the @see:ChartEngine class.
 *
 * The @see:ChartEngine class processes the @see:FlexChart for the @see:FlexSheet control.
 */
export declare class ChartEngine {
    _owner: wjcGridSheet.FlexSheet;
    _charts: IChartObject[];
    private _chartMousePosition;
    private _chartOriginalBounds;
    private _containerOriginalBounds;
    private _containerRect;
    private _movingChart;
    _selectedChart: wjcChart.FlexChart;
    private _resizeMode;
    private _resizingChart;
    private _chartHost;
    _lastScrollPosition: wjcCore.Point;
    private _currentSheetIndex;
    private _toRefresh;
    _undoing: boolean;
    private _undoAction;
    /**
     * Initializes a new instance of the @see:ChartEngine class.
     *
     * @param owner The @see: FlexSheet control that the <b>ChartEngine</b> works for.
     */
    constructor(owner: wjcGridSheet.FlexSheet);
    /**
     *  Add chart into FlexSheet
     *
     * @param chartType the type of the chart.
     * @param data the data used to render the chart.
     * @param chartRect the bounds rectangle to locate the chart.
     */
    addChart(chartType?: wjcChart.ChartType, data?: any[], chartRect?: wjcCore.Rect): IChartObject;
    /**
     * Remove the specified chart in the FlexSheet.
     * If the chart is not specified, it will remove the selected chart in FlexSheet.
     *
     * @param chart The specified chart to remove.
     */
    removeChart(chart?: wjcChart.FlexChart): void;
    private _init();
    _generateChartData(chartType: wjcChart.ChartType, cellRanges?: wjcGrid.CellRange[]): any[];
    private _getChartRect();
    private _appendChart(chartType, data, chartRect);
    private _checkSeriesBinding(selections);
    private _checkBindingX(needSeriesBinding, selections, chartType);
    private _setChartSeries(chart, item);
    private _updateChart(chartObj);
    private _hoverChart(e, chart);
    private _mouseMove(e);
    private _mouseDown(e, hostElement);
    private _mouseUp();
    private _moveChart(e, left, top, deltaX, deltaY);
    private _resizeChart(e, left, top, deltaX, deltaY);
    private _scrollChart(chart, deltaScrollX, deltaScrollY);
    private _scrollRightDownChart(hostElement, container, delta, isHorizontal?);
    private _scrollLeftUpChart(hostElement, container, delta, isHorizontal?);
    private _cumulativeOffset(element);
    private _updateChartRange(chartObj, index, count, isAdd, isRow);
    _getChartSettings(): IChartSetting[];
    private _cloneChartRanges(ranges);
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
