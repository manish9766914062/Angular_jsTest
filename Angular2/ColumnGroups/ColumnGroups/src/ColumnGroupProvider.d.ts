import * as wjcGrid from 'wijmo/wijmo.grid';
export declare class ColumnGroupProvider {
    _g: wjcGrid.FlexGrid;
    _groups: any[];
    _selectOnClick: boolean;
    /**
     * Initializes a new instance of a @see:ColumngroupCreator object.
     *
     * @param grid The @see:FlexGrid object that owns this @see:DetailMergeManager.
     * @param columnGroups Array containing objects with @see:Column properties and
     * an optional "columns" property that contains sub-columns.
     */
    constructor(grid: wjcGrid.FlexGrid, columnGroups: any[]);
    selectOnClick: boolean;
    _createColumnGroups(groups: any[], level: number): void;
    _mergeColumnGroups(): void;
}
