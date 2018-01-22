import * as wjcGrid from 'wijmo/wijmo.grid';
/**
 * Creates HTML elements that represent cells within a @see:FlexGrid control.
 */
export declare class CustomCellFactory extends wjcGrid.CellFactory {
    /**
     * Creates or updates a cell in the grid.
     *
     * @param p The @see:GridPanel that contains the cell.
     * @param r The index of the row that contains the cell.
     * @param c The index of the column that contains the cell.
     * @param cell The element that represents the cell.
     * @param rng The @see:CellRange object that contains the cell's
     * merged range, or null if the cell is not merged.
     * @param updateContent Whether to update the cell's content as
     * well as its position and style.
     */
    updateCell(p: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement, rng?: wjcGrid.CellRange, updateContent?: boolean): void;
}
