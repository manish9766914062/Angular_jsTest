import * as wjcChart from 'wijmo/wijmo.chart';
import { OnInit } from '@angular/core';
import { DashService } from './services/DdashService';
export declare class AppCmp implements OnInit {
    search: string;
    location: any;
    domTapDescription: string;
    selectedSource: any;
    sources: any[];
    medianAgeChart: wjcChart.FlexChart;
    householdIncomeChart: wjcChart.FlexChart;
    homeValueChart: wjcChart.FlexChart;
    homeValueDistributionChart: wjcChart.FlexChart;
    private _geocoder;
    private _extent;
    private gdashService;
    constructor(gdashService: DashService);
    ngOnInit(): void;
    extent: any;
    getIndexDescription(index: number): string;
    selectSource(source: any): void;
    gotoCurrentLocation(): boolean;
    gotoLocation(lat: number, lon: number): void;
    geoCode(): void;
    private onGotData();
    private updateChart(chart);
}
export declare class AppModule {
}
