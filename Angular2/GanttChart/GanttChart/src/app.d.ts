import * as wjcCore from 'wijmo/wijmo';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    data: {
        name: string;
        start: Date;
        end: Date;
    }[];
    depData: {
        name: string;
        start: Date;
        end: Date;
        parent: string;
        percent: number;
    }[];
    private tasks;
    protected dataSvc: DataSvc;
    constructor(dataSvc: DataSvc);
    getTooltipContent(ht: any): string;
    ganttItemFormatter: (engine: any, hti: any, defaultFormatter: any) => void;
    ganttChartRendered(chart: any, e: any): void;
    drawConnectingLine(engine: any, chart: any, task: any, parent: any): void;
    getTaskRect(chart: any, task: any): wjcCore.Rect;
    getTaskParents(task: any, tasks: any): any[];
    ganttFormatter: (engine: any, hti: any, fn: any) => void;
}
export declare class AppModule {
}
