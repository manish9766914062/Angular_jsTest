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
var CustomizeCellRenderingCmp = /** @class */ (function () {
    function CustomizeCellRenderingCmp(dataSvc) {
        this.data = dataSvc.getData(5);
    }
    CustomizeCellRenderingCmp.prototype.export = function () {
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
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            },
            formatItem: function (args) {
                if (args.panel.cellType === wjcGrid.CellType.RowHeader) {
                    args.data = (args.row + 1).toString();
                }
                else {
                    if (args.panel.cellType === wjcGrid.CellType.Cell && args.panel.columns[args.col].binding === 'color') {
                        args.style.backgroundColor = args.data;
                    }
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], CustomizeCellRenderingCmp.prototype, "flexGrid", void 0);
    CustomizeCellRenderingCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-customize-cell-rendering-cmp',
            templateUrl: 'src/components/gridconverter/customizeCellRenderingCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], CustomizeCellRenderingCmp);
    return CustomizeCellRenderingCmp;
}());
exports.CustomizeCellRenderingCmp = CustomizeCellRenderingCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: CustomizeCellRenderingCmp }
]);
var CustomizeCellRenderingModule = /** @class */ (function () {
    function CustomizeCellRenderingModule() {
    }
    CustomizeCellRenderingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule],
            declarations: [CustomizeCellRenderingCmp]
        })
    ], CustomizeCellRenderingModule);
    return CustomizeCellRenderingModule;
}());
exports.CustomizeCellRenderingModule = CustomizeCellRenderingModule;
//# sourceMappingURL=CustomizeCellRenderingCmp.js.map