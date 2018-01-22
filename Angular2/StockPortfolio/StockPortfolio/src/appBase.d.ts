import * as wjcChart from 'wijmo/wijmo.chart';
import { Portfolio } from './portfolio';
export declare abstract class AppBaseCmp {
    portfolio: Portfolio;
    chart: wjcChart.FlexChart;
    cache: {};
    searchCompany: Function;
    constructor();
    getAmountColor(amount: number): string;
    private _currentChanged();
    selectionChanged(sender: any, args: any): void;
    private _searchCompany(query, max, callback);
}
