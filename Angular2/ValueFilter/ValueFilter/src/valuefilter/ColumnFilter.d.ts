import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
/**
 * Defines a value filter for a column on a @see:FlexGrid control.
 *
 * Value filters contain an explicit list of values that should be
 * displayed by the grid.
 */
export declare class ColumnFilter {
    _col: wjcGrid.Column;
    _bnd: wjcCore.Binding;
    _values: any;
    _filterText: string;
    /**
     * Initializes a new instance of a @see:ColumnFilter.
     *
     * @param column The column to filter.
     */
    constructor(column: wjcGrid.Column);
    /**
     * Gets the @see:Column to filter.
     */
    readonly column: wjcGrid.Column;
    /**
     * Gets or sets an object with all the formatted values that should be shown.
     */
    showValues: any;
    /**
     * Gets or sets a string used to filter the list of display values.
     */
    filterText: string;
    /**
     * Gets a value indicating whether the filter is active.
     *
     * The filter is active if at least one of the two conditions
     * has its operator set to a non-null value.
     */
    readonly isActive: boolean;
    /**
     * Returns a value indicating whether the given value passes this @see:ColumnFilter.
     *
     * @param value The value to test.
     */
    apply(value: any): boolean;
}
