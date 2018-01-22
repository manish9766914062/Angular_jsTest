export declare class Product {
    id: any;
    name: any;
    rank: any;
    salesDct: any;
    salesValues: any;
    sales: any;
    levels: any;
    chartData: any;
    salesTrend: any;
    constructor(data: any);
    getSales(quarter: string): number;
    static getQuarter(current: boolean): string;
    private _linReg(values);
}
