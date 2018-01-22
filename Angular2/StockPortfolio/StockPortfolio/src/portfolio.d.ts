import * as wjcCore from 'wijmo/wijmo';
/**
 * Represents the period to be shown in the chart.
 */
export declare enum ChartPeriod {
    YTD = 0,
    m6 = 1,
    m12 = 2,
    m24 = 3,
    m36 = 4,
    All = 5,
}
/**
 * Represents a portfolio composed of items.
 * Each item corresponds to a company and includes the amount of shares
 * purchase and the purchase price.
 */
export declare class Portfolio {
    static STGKEY: string;
    static _companyCache: {};
    _items: wjcCore.ObservableArray;
    _cv: wjcCore.CollectionView;
    _newItemSymbol: string;
    _chartPeriod: ChartPeriod;
    _updating: boolean;
    _toChange: number;
    constructor();
    itemsChanged: wjcCore.Event;
    viewChanged(): void;
    readonly view: wjcCore.CollectionView;
    chartPeriod: ChartPeriod;
    getChartStartDate(): Date;
    addNewItem(): void;
    canAddNewItem(): boolean;
    newItemSymbol: string;
    readonly cost: number;
    readonly value: number;
    readonly gain: number;
    readonly gainPercent: number;
    loadItems(): void;
    saveItems(): void;
    addItem(symbol: string, chart?: boolean, shares?: number, purchasePrice?: number): void;
    removeItem(symbol: string): void;
    indexOf(symbol: string): number;
    getCompany(symbol: string): Company;
    updateChartData(): void;
}
/**
 * Represents a portfolio item.
 * Each item corresponds to a company and includes the amount of shares
 * purchase and the purchase price.
 */
export declare class PortfolioItem {
    _portfolio: Portfolio;
    _company: Company;
    _chart: boolean;
    _shares: number;
    _purchasePrice: number;
    _chartData: any[];
    constructor(portfolio: Portfolio, symbol: string, chart: boolean, shares: number, purchasePrice: number);
    readonly symbol: string;
    readonly name: string;
    readonly color: string;
    chart: boolean;
    readonly chartData: any[];
    readonly lastPrice: number;
    readonly change: number;
    readonly changePercent: number;
    shares: number;
    purchasePrice: number;
    readonly costBasis: number;
    readonly marketValue: number;
    readonly gain: number;
    readonly gainPercent: number;
    updateChartData(): void;
}
/**
 * Represents a publicly traded company.
 * The class contains the company name, ticker symbol, price history,
 * and the color used to represent the company in the UI.
 */
export declare class Company {
    name: string;
    symbol: string;
    color: string;
    prices: any[];
    static _palette: string[];
    static _ctr: number;
    constructor(symbol: string);
}
