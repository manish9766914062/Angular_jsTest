import * as wjcChart from 'wijmo/wijmo.chart';
export declare class ChartMultiSelectSvc {
    private rendered;
    private ctrlKey;
    private ctrlDown;
    private selections;
    private chart;
    private mouseDown;
    private start;
    private end;
    private selector;
    private offset;
    private static isTouch;
    private static wjSelected;
    items: any[];
    flexChart: wjcChart.FlexChart;
    initChartMultiSelect(chart: wjcChart.FlexChart, items: any): void;
    restoreSelection(): void;
    clearSelection(): void;
    addSelection(hti: any): void;
    removeSelection(hti: any): void;
    selectValuesUnder500(): void;
    chartClick(e: any): void;
    clear(): void;
    chartMouseDown(e: any): void;
    chartMouseUp(e: any): void;
    hideSelector(): void;
    selectWithinRect(rect: any): void;
    elementInBounds(el: HTMLElement, rect: any): boolean;
    chartMouseMove(e: any): void;
    chartMouseLeave(e: any): void;
    chartKeyUp(e: any): void;
    chartKeyDown(e: any): void;
}