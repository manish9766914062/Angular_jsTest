import { WjPopup } from 'wijmo/wijmo.angular2.input';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjColumnPicker } from './components/WjColumnPicker';
export declare class AppCmp {
    data: any;
    picker: WjColumnPicker;
    dlgColumns: WjPopup;
    flex: WjFlexGrid;
    constructor();
    pickColumns(): void;
    private _getData(count);
}
export declare class AppModule {
}
