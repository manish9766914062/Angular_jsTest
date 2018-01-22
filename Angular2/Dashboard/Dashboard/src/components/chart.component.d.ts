import { DataSvc } from '../services/DataSvc';
export declare class ChartCmp {
    chartData: any[];
    qThis: string;
    chartType: string;
    constructor(dataSvc: DataSvc);
    setChartType(chartType: string): void;
}
