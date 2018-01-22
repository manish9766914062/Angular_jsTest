"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcSelf = require("./CustomCellFactory");
window['CustomCellFactory'] = wjcSelf;
'use strict';
//module wijmo.grid {
'use strict';
/**
 * Creates HTML elements that represent cells within a @see:FlexGrid control.
 */
var CustomCellFactory = /** @class */ (function (_super) {
    __extends(CustomCellFactory, _super);
    function CustomCellFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    CustomCellFactory.prototype.updateCell = function (p, r, c, cell, rng, updateContent) {
        switch (p.cellType) {
            // regular cells
            case wjcGrid.CellType.Cell:
                // get cell geometry
                _super.prototype.updateCell.call(this, p, r, c, cell, rng, false);
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
                _super.prototype.updateCell.call(this, p, r, c, cell, rng, false);
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
                _super.prototype.updateCell.call(this, p, r, c, cell, rng, true);
                break;
        }
    };
    return CustomCellFactory;
}(wjcGrid.CellFactory));
exports.CustomCellFactory = CustomCellFactory;
//}
//# sourceMappingURL=CustomCellFactory.js.map