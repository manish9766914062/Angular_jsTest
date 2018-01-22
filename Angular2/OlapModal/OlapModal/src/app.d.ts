import * as wjcOlap from 'wijmo/wijmo.olap';
import { WjPivotPanel } from 'wijmo/wijmo.angular2.olap';
export declare class AppCmp {
    theEngine: wjcOlap.PivotEngine;
    pivotPnl: WjPivotPanel;
    constructor();
    refresh(): void;
    private getData(cnt);
    private getPerson(i, firstNames, lastNames);
    private getBug(i);
}
export declare class AppModule {
}
