export declare class DataSvc {
    products: any[];
    chartData: any[];
    loading: boolean;
    error: string;
    qStart: string;
    qPrev: string;
    qThis: string;
    product: any;
    loadingSucceed: Function;
    selectProduct(id: number): void;
}
