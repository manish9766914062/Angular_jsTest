import * as wjcCore from 'wijmo/wijmo';
export declare class AppCmp {
    svcUrl: string;
    customers: wjcCore.CollectionView;
    orders: wjcCore.CollectionView;
    details: wjcCore.CollectionView;
    queryResources: any[];
    constructor();
    startButton_Click(): void;
    private loadData(baseUrl, view, table, types?);
}
export declare class AppModule {
}
