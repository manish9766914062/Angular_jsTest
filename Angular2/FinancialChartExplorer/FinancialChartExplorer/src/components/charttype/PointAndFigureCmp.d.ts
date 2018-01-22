import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcInput from 'wijmo/wijmo.input';
import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';
export declare class PointAndFigureCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    options: any;
    style: any;
    altStyle: any;
    title: string;
    chart: wjcChartFinance.FinancialChart;
    boxSize: wjcInput.InputNumber;
    reversal: wjcInput.InputNumber;
    period: wjcInput.InputNumber;
    constructor(dataSvc: DataSvc, tooltipSvc: TooltipSvc);
    selectedSymbolChanged(): void;
    chartRendered(): void;
    optionChanged(): void;
    inputNumberChanged(input: wjcInput.InputNumber): void;
    scalingChanged(menu: any): void;
    private setDataSource();
}
export declare class PointAndFigureModule {
}
