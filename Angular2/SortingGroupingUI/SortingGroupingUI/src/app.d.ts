import * as wjcCore from 'wijmo/wijmo';
import { GroupManager } from './groupManager';
import { SortManager } from './sortManager';
import { ManagerSvc } from './services/ManagerSvc';
export declare class AppCmp {
    sortManager: SortManager;
    groupManager: GroupManager;
    properties: string[];
    countries: string[];
    products: string[];
    colors: string[];
    view: wjcCore.CollectionView;
    constructor(managerSvc: ManagerSvc);
    private getData(count);
}
export declare class AppModule {
}
