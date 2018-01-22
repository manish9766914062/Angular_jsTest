import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';
import { ColumnFilter } from './ColumnFilter';
/**
 * The editor used to inspect and modify @see:ColumnFilter objects.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
export declare class ColumnFilterEditor extends wjcCore.Control {
    _filter: ColumnFilter;
    _btnAsc: HTMLInputElement;
    _btnDsc: HTMLInputElement;
    _divFilter: HTMLElement;
    _cmbFilter: wjcInput.ComboBox;
    _cbSelectAll: HTMLInputElement;
    _divValues: HTMLElement;
    _lbValues: wjcInput.ListBox;
    _btnApply: HTMLLinkElement;
    _btnClear: HTMLLinkElement;
    _toText: number;
    _filterText: string;
    _view: wjcCore.CollectionView;
    /**
     * Gets or sets the template used to instantiate @see:ColumnFilterEditor controls.
     */
    static controlTemplate: string;
    '</div>': any;
    /**
     * Initializes a new instance of the @see:ColumnFilterEditor.
     *
     * @param element The DOM element that hosts the control, or a selector
     * for the host element (e.g. '#theCtrl').
     * @param filter The @see:ColumnFilter to edit.
     */
    constructor(element: any, filter: ColumnFilter);
    /**
     * Gets a reference to the @see:ColumnFilter being edited.
     */
    readonly filter: ColumnFilter;
    /**
     * Occurs after the filter is modified.
     */
    filterChanged: wjcCore.Event;
    /**
     * Raises the @see:filterChanged event.
     */
    onFilterChanged(e?: wjcCore.EventArgs): void;
    _filterTextChanged(): void;
    _filterValues(value: any): boolean;
    _updateUIFromFilter(): void;
    _updateFilterFromUI(): void;
    _isTimeFormat(fmt: string): boolean;
    _btnClicked(e: any): void;
    _cbSelectAllClicked(e: any): void;
    _updateSelectAllCheck(): void;
}
