import * as wjcCore from 'wijmo/wijmo';
import { WjFlexChart } from 'wijmo/wijmo.angular2.chart';
import 'wijmo/wijmo.chart.render';
export declare class AppCmp {
    cv: wjcCore.CollectionView;
    exportType: string;
    chartType: string;
    constructor();
    itemClicked(chart: WjFlexChart): void;
}
export declare class AppModule {
}
