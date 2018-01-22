import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    data: any;
    groupData: any;
    maxDepthData: any;
    palette1: any;
    palette2: any;
    bindingName: any;
    TreeMapType: typeof wjcChartHierarchical.TreeMapType;
    treeMapType: wjcChartHierarchical.TreeMapType;
    maxDepth: number;
    protected dataSvc: DataSvc;
    constructor(dataSvc: DataSvc);
}
export declare class AppModule {
}
