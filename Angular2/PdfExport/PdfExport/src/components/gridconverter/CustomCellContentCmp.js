'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcGridPdf = require("wijmo/wijmo.grid.pdf");
var wjcGrid = require("wijmo/wijmo.grid");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var CustomCellContentCmp = /** @class */ (function () {
    function CustomCellContentCmp(dataSvc) {
        this._exportSettings = {
            maxPages: 10,
            documentOptions: {
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                info: {
                    author: 'C1',
                    title: 'PdfDocument sample',
                    keywords: 'PDF, C1, sample',
                    subject: 'PdfDocument'
                }
            }
        };
        this.data = dataSvc.getData(5);
    }
    CustomCellContentCmp.prototype.export = function () {
        this._exportSettings.customCellContent = false;
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
    };
    CustomCellContentCmp.prototype.export2 = function () {
        this._exportSettings.customCellContent = true;
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
    };
    CustomCellContentCmp.prototype.export3 = function () {
        this._exportSettings.customCellContent = false;
        this._exportSettings.formatItem = this._formatCountryCell;
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
        this._exportSettings.formatItem = null;
    };
    CustomCellContentCmp.prototype._formatCountryCell = function (args) {
        // if this is a regular grid cell...
        if (args.panel.cellType === wjcGrid.CellType.Cell) {
            // ... that belongs to the 'country' column
            if (args.panel.columns[args.col].binding === 'country') {
                var 
                // get cell with custom content produced by a cell template or grid.formatItem handler
                cell = args.getFormattedCell(), 
                // bound rectangle of cell's content area
                contentRect = args.contentRect, 
                // construct flag image url based on country name passed in args.data 
                flagUrl = 'resources/' + args.data + '.png', 
                // calculate flag's image size and position
                imageHeight = contentRect.height / 2, imageWidth = imageHeight * 3 / 2, imageTop = contentRect.top + (contentRect.height - imageHeight) / 2;
                // draw flag image
                args.canvas.drawImage(flagUrl, contentRect.left, imageTop, {
                    height: imageHeight, width: imageWidth
                });
                // Draw custom cell text retrieved using the cell.textContent property,
                // right to the image and in the args.textTop vertical position. The latter
                // works because we draw text using default cell font.
                args.canvas.drawText(cell.textContent.trim(), contentRect.left + imageWidth + 3, args.textTop);
                // cancel standard cell content drawing
                args.cancel = true;
            }
        }
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], CustomCellContentCmp.prototype, "flexGrid", void 0);
    CustomCellContentCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-custom-cell-content-cmp',
            templateUrl: 'src/components/gridconverter/customCellContentCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], CustomCellContentCmp);
    return CustomCellContentCmp;
}());
exports.CustomCellContentCmp = CustomCellContentCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: CustomCellContentCmp }
]);
var CustomCellContentModule = /** @class */ (function () {
    function CustomCellContentModule() {
    }
    CustomCellContentModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule],
            declarations: [CustomCellContentCmp]
        })
    ], CustomCellContentModule);
    return CustomCellContentModule;
}());
exports.CustomCellContentModule = CustomCellContentModule;
//# sourceMappingURL=CustomCellContentCmp.js.map