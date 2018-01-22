import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import { ColumnFilter } from './ColumnFilter';
/**
 * Implements an Excel-style filter for @see:FlexGrid controls.
 *
 * To enable filtering on a @see:FlexGrid control, create an instance
 * of the @see:FlexGridFilter and pass the grid as a parameter to the
 * constructor. For example:
 *
 * <pre>
 * // create FlexGrid
 * var flex = new wijmo.grid.FlexGrid('#gridElement');
 * // enable filtering on the FlexGrid
 * var filter = new wijmo.grid.filter.FlexGridFilter(flex);
 * </pre>
 *
 * Once this is done, a filter icon is added to the grid's column headers.
 * Clicking the icon shows an editor where the user can edit the filter
 * conditions for that column.
 *
 * The @see:FlexGridFilter class depends on the <b>wijmo.grid</b> and
 * <b>wijmo.input</b> modules.
 */
export declare class FlexGridFilter {
    static _WJA_FILTER: string;
    _grid: wjcGrid.FlexGrid;
    _filters: ColumnFilter[];
    _filterColumns: string[];
    _divEdt: HTMLElement;
    _edtCol: wjcGrid.Column;
    _showIcons: boolean;
    /**
     * Initializes a new instance of the @see:FlexGridFilter.
     *
     * @param grid The @see:FlexGrid to filter.
     */
    constructor(grid: wjcGrid.FlexGrid);
    /**
     * Gets or sets a value indicating whether the @see:FlexGridFilter adds filter
     * editing buttons to the grid's column headers.
     */
    showFilterIcons: boolean;
    /**
     * Gets or sets an array containing the names or bindings of the columns
     * that have filters.
     *
     * Setting this property to null or to an empty array adds filters to all
     * columns.
     */
    filterColumns: string[];
    /**
     * Gets the filter for the given column.
     *
     * @param col The @see:Column that the filter applies to.
     * @param create The value indicating whether to create the filter if it does not exist.
     */
    getColumnFilter(col: wjcGrid.Column, create?: boolean): ColumnFilter;
    /**
     * Shows the filter editor for the given grid column.
     *
     * @param col The @see:Column that contains the filter to edit.
     */
    editColumnFilter(col: any): void;
    /**
     * Closes the filter editor.
     */
    closeEditor(): void;
    /**
     * Applies the current column filters to the grid.
     */
    apply(): void;
    /**
     * Clears all column filters.
     */
    clear(): void;
    /**
     * Occurs after the filter is applied.
     */
    filterApplied: wjcCore.Event;
    /**
     * Raises the @see:filterApplied event.
     */
    onFilterApplied(): void;
    _filter(item: any): boolean;
    _formatItem(sender: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs): void;
    _mousedown(e: any): void;
    _click(e: any): void;
    _hasAttribute(e: any, att: string): boolean;
}
