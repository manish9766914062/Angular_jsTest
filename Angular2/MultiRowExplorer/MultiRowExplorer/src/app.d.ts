import { Routes } from '@angular/router';
import { DataSvc } from './services/DataSvc';
import { ExportSvc } from './services/ExportSvc';
export declare class AppCmp {
    fields: any;
    routes: Routes;
    dataSvc: DataSvc;
    exportSvc: ExportSvc;
    private _culture;
    constructor(dataSvc: DataSvc, exportSvc: ExportSvc);
    culture: string;
    private _loadCulture(culture);
}
export declare class AppModule {
}
