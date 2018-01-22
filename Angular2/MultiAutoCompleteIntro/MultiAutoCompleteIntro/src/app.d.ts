import * as wjcCore from 'wijmo/wijmo';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    countries: string[];
    items: wjcCore.CollectionView;
    selectedCountries: string[];
    getCompanies: Function;
    private _cache;
    constructor(dataSvc: DataSvc);
    private _getCompaniesFunc(query, max, callback);
}
export declare class AppModule {
}
