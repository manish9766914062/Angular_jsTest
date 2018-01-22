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
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var HighlightInvalidCellsCmp = /** @class */ (function () {
    function HighlightInvalidCellsCmp(dataSvc) {
        this.showErrors = true;
        this.data = new wjcCore.CollectionView(dataSvc.getData(10), {
            getError: function (item, property) {
                switch (property) {
                    case 'amount':
                        return item.amount < 1000
                            ? 'Cannot be less than 1,000!'
                            : null;
                    case 'active':
                        return item.active && item.country.match(/US|UK/)
                            ? 'Active items are not allowed in the US or UK!'
                            : null;
                }
                return null;
            }
        });
    }
    HighlightInvalidCellsCmp.prototype.export = function () {
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            documentOptions: {
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
                },
                errorCellStyle: {
                    backgroundColor: 'rgba(255, 0, 0, 0.3)'
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], HighlightInvalidCellsCmp.prototype, "flexGrid", void 0);
    HighlightInvalidCellsCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-highlight-invalid-cells-cmp',
            templateUrl: 'src/components/gridconverter/highlightInvalidCellsCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], HighlightInvalidCellsCmp);
    return HighlightInvalidCellsCmp;
}());
exports.HighlightInvalidCellsCmp = HighlightInvalidCellsCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: HighlightInvalidCellsCmp }
]);
var HighlightInvalidCellsModule = /** @class */ (function () {
    function HighlightInvalidCellsModule() {
    }
    HighlightInvalidCellsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule, forms_1.FormsModule],
            declarations: [HighlightInvalidCellsCmp]
        })
    ], HighlightInvalidCellsModule);
    return HighlightInvalidCellsModule;
}());
exports.HighlightInvalidCellsModule = HighlightInvalidCellsModule;
//# sourceMappingURL=HighlightInvalidCellsCmp.js.map