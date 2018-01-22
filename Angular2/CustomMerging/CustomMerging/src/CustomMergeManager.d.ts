import * as wjcGrid from 'wijmo/wijmo.grid';
/**
 * Class that extends the standard MergeManager to support merged ranges that
 * span both rows and columns.
 *
 * This class uses the same content-based approach used by the built-in merge
 * manager, but it could use any other logic instead (for example, a fixed list
 * of pre-defined merged ranges).
 */
export declare class CustomMergeManager extends wjcGrid.MergeManager {
    getMergedRange(panel: wjcGrid.GridPanel, r: number, c: number, clip?: boolean): wjcGrid.CellRange;
}
