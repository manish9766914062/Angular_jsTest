import * as wjcCore from 'wijmo/wijmo';
export declare class DataSvc {
    rand(): number;
    categories: string[];
    subCategories: string[][];
    getData(): any[];
    getGroupCVData(): wjcCore.CollectionView;
    getMaxDepthData(): any[];
}
