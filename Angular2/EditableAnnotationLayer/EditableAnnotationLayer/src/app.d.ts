import * as wjcChart from 'wijmo/wijmo.chart';
export declare class AppCmp {
    data: any[];
    anChart: wjcChart.FlexChart;
    private axisScrollBar;
    private al;
    private _isEditable;
    constructor();
    isEditable: boolean;
    chartRendered(chart: wjcChart.FlexChart): void;
    private _createAxisScrollbar();
    private _createEditableAnnotationLayer();
    private _getData();
    private _getRandomValue(max);
}
export declare class AppModule {
}
