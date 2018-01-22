import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class DataSvc {
    private _fields;
    fieldsChanged: Function;
    products: {
        id: string;
        name: string;
        unitPrice: number;
        profitUnitPrice: number;
    }[];
    fields: any;
    generateSlipData(count: any): any;
    generateOrdersSlipData(): {
        productId: number;
        productName: string;
        categoryId: number;
        categoryName: string;
        quantity: number;
        packageUnit: string;
        unitPrice: number;
        amount: number;
        shippingId: number;
        discontinued: boolean;
        remarks: string;
        description: string;
    }[];
    getOrderDetail(count: any): any[];
    getPurchaseSlip(): {
        productId: string;
        productName: string;
        color: string;
        packageUnit: number;
        size: string;
        case: number;
        quantity: number;
        deal: string;
        id: string;
        unitCost: number;
        cost: number;
        price: number;
        remarks: string;
    }[];
    getOrders(count: any): any[];
    getSalesSlip(count: any): any[];
    buildDataMap(items: any): wjcGrid.DataMap;
    static randBetween(min: any, max: any): number;
}
