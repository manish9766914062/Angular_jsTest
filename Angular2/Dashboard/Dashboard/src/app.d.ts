import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    qStart: string;
    qThis: string;
    dataSvc: DataSvc;
    loading: boolean;
    error: any;
    constructor(dataSvc: DataSvc);
}
export declare const routes: Routes;
export declare const routing: ModuleWithProviders;
export declare class AppModule {
}
