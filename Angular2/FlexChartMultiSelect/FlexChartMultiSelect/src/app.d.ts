import * as wjcChart from 'wijmo/wijmo.chart';
import { ChartMultiSelectSvc } from './services/ChartMultiSelectSvc';
export declare class AppCmp {
    data: any[];
    items: any[];
    chartType: string;
    cmsv: ChartMultiSelectSvc;
    flexChart: wjcChart.FlexChart;
    constructor(cmsv: ChartMultiSelectSvc);
    chartRendered(): void;
    selectValuesUnder500(): void;
    clear(): void;
    private _createData(rows, cols);
}
export declare class AppModule {
}
