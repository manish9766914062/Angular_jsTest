import * as wjcCore from 'wijmo/wijmo';
export declare class DataSvc {
    initDataSets(): any[];
    initShowTotals(): any;
    initChartTypes(): any[];
    initViewDefs(): any[];
    initCubeFields(): any[];
    getSimpleDataSet(cnt: number): wjcCore.CollectionView;
    private getDataSet(cnt);
    private randomInt(max);
}
