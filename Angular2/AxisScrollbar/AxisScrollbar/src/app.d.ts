import * as wjcChart from 'wijmo/wijmo.chart';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    private data;
    protected dataSvc: DataSvc;
    private axisXScrollbar;
    private axisYScrollbar;
    constructor(dataSvc: DataSvc);
    chartRendered(chart: wjcChart.FlexChart): void;
}
export declare class AppModule {
}
