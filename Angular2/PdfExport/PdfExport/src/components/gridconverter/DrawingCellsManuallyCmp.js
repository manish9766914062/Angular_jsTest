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
var DrawingCellsManuallyCmp = /** @class */ (function () {
    function DrawingCellsManuallyCmp(dataSvc) {
        this.data = dataSvc.getData(5);
    }
    DrawingCellsManuallyCmp.prototype.export = function () {
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
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
            },
            customCellContent: true,
            formatItem: function (args) {
                if (args.panel.cellType === wjcGrid.CellType.Cell) {
                    if (args.panel.columns[args.col].binding === 'country') {
                        var r = args.contentRect, sz = args.canvas.measureText(args.data, args.style.font, {
                            height: r.height,
                            width: r.width
                        }), imageHeight = r.height / 2, imageWidth = imageHeight * 3 / 2, imageTop = r.top + (r.height - imageHeight) / 2, textTop = r.top + (r.height - sz.size.height) / 2;
                        // draw flag image
                        args.canvas.drawImage('resources/' + args.data + '.png', r.left, imageTop, {
                            height: imageHeight,
                            width: imageWidth
                        });
                        // draw text
                        args.canvas.drawText(args.data, r.left + imageWidth + 3, textTop, {
                            brush: args.style.color,
                            font: args.style.font,
                            height: r.height,
                            width: r.width
                        });
                        // cancel standard cell content drawing
                        args.cancel = true;
                    }
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], DrawingCellsManuallyCmp.prototype, "flexGrid", void 0);
    DrawingCellsManuallyCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-drawing-cells-manually-cmp',
            templateUrl: 'src/components/gridconverter/drawingCellsManuallyCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], DrawingCellsManuallyCmp);
    return DrawingCellsManuallyCmp;
}());
exports.DrawingCellsManuallyCmp = DrawingCellsManuallyCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingCellsManuallyCmp }
]);
var DrawingCellsManuallyModule = /** @class */ (function () {
    function DrawingCellsManuallyModule() {
    }
    DrawingCellsManuallyModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule],
            declarations: [DrawingCellsManuallyCmp]
        })
    ], DrawingCellsManuallyModule);
    return DrawingCellsManuallyModule;
}());
exports.DrawingCellsManuallyModule = DrawingCellsManuallyModule;
//# sourceMappingURL=DrawingCellsManuallyCmp.js.map