import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';

import * as wjcSelf from './CustomCellFactory';
window['CustomCellFactory'] = wjcSelf;

'use strict';


//module wijmo.grid {
    'use strict';

    /**
     * Creates HTML elements that represent cells within a @see:FlexGrid control.
     */
    export class CustomCellFactory extends wjcGrid.CellFactory {

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
        public updateCell(p: wjcGrid.GridPanel, r: number, c: number, cell: HTMLElement, rng?: wjcGrid.CellRange, updateContent?: boolean) {

            switch (p.cellType) {

                // regular cells
                case wjcGrid.CellType.Cell:

                    // get cell geometry
                    super.updateCell(p, r, c, cell, rng, false);

                    // set styles
                    wjcCore.addClass(cell, 'centered-cell');
                    cell.style.backgroundColor = (r % 2 == 0) ? '#beff82' : '#ff9393';

                    // add/update content
                    var content = p.getCellData(r, c, true);
                    if (cell.textContent != content) {
                        cell.innerHTML = '<div>' + content + '</div>';
                    }

                    break;

                // column headers
                case wjcGrid.CellType.ColumnHeader:

                    // get cell geometry
                    super.updateCell(p, r, c, cell, rng, false);

                    // set styles
                    wjcCore.addClass(cell, 'rotated-cell');

                    // add content
                    var content = p.getCellData(r, c, true);
                    if (cell.textContent != content) {
                        cell.innerHTML = '<div>' + content + '</div>';
                    }

                    break;

                // other cell types
                default:
                    super.updateCell(p, r, c, cell, rng, true);
                    break;
            }
        }
    }
//}
