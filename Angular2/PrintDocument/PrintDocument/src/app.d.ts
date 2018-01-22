import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class AppCmp {
    view: wjcCore.CollectionView;
    groupDescrpition: wjcCore.PropertyGroupDescription;
    private _groupData;
    constructor();
    groupData: boolean;
    printWindow(): void;
    printDocument(flex: wjcGrid.FlexGrid): void;
    private renderTable(flex);
    private renderRow(panel, r);
}
export declare class AppModule {
}
