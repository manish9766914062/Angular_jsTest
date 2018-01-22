import * as wjcCore from 'wijmo/wijmo';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcInput from 'wijmo/wijmo.input';
import { DataSvc } from './services/DataSvc';
export declare class AppCmp {
    protected dataSvc: DataSvc;
    groupBy: string;
    groupByText: string;
    aggregation: string;
    chartType: string;
    aggregationText: string;
    chartView: wjcCore.CollectionViewGroup[];
    itemsSource: any;
    palette: any;
    bindx: string;
    bindname: string;
    bindvalue: string;
    mainView: wjcCore.CollectionView;
    chartViewPath: (number | string)[];
    groupNamesMap: any;
    levelsColor: string[];
    byLabel: string;
    headerTitle: string;
    headerAnchorLevel2: string;
    headerAnchorLevel1: string;
    headerHref: string;
    groupChart: wjcChart.FlexChart;
    groupPie: wjcChart.FlexPie;
    constructor(dataSvc: DataSvc);
    ngAfterViewInit(): void;
    groupByMenuChanged(sender?: wjcInput.Menu): void;
    aggregationMenuChanged(sender: wjcInput.Menu): void;
    chartTypeMenuChanged(sender: wjcInput.Menu): void;
    chartClick(chart: wjcChart.FlexChart | wjcChart.FlexPie): void;
    changeChartView(level: number): void;
    _setChartView(view: wjcCore.CollectionViewGroup[]): void;
    _updateChart(): void;
    _updateChartItemsSource(): void;
    _updateHeader(): void;
    _disableTouchToolTip(chart: wjcChart.FlexChart | wjcChart.FlexPie): void;
    _addLegendLinkStyle(chart: wjcChart.FlexPie): void;
}
export declare class AppModule {
}
