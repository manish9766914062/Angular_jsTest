import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    data: any[];
    mouseAction: string;
    interactiveAxes: string;
    disabled: boolean;
    isTouch: boolean;
    zoomChart: wjcChart.FlexChart;
    chartGestures: wjcChartInteraction.ChartGestures;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    resetAxes(): void;
    rangeChanged(): void;
    private _disableBtn(time?);
}
export declare class AppModule {
}
