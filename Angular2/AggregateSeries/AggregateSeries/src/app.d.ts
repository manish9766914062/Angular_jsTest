import * as wjcChart from 'wijmo/wijmo.chart';
import { AfterViewInit } from '@angular/core';
import { WjFlexChartRangeSelector } from 'wijmo/wijmo.angular2.chart.interaction';
export declare class AppCmp implements AfterViewInit {
    data: any[];
    chartType: string;
    aggType: string;
    interval: string;
    autoInterval: boolean;
    customTooltip: Function;
    chart: wjcChart.FlexChart;
    private aggSeries;
    private _bindings;
    constructor();
    ngAfterViewInit(): void;
    aggTypeChanged(): void;
    chartTypeChanged(): void;
    intervalChanged(): void;
    setAutoInterval(): void;
    rangeChanged(sender: WjFlexChartRangeSelector): void;
    private _customTooltip(ht);
}
export declare class AppModule {
}
