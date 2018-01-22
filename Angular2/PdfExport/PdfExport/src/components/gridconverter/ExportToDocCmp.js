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
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var ExportToDocCmp = /** @class */ (function () {
    function ExportToDocCmp(dataSvc) {
        this.data = dataSvc.getData(10);
    }
    ExportToDocCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
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
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'FlexGrid.pdf');
            }
        }), settings = {
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
            }
        };
        doc.drawText('This grid is scaled to fit the width of 200 and drawn using the draw method.', null, null, { width: 200 });
        doc.moveDown();
        wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, 200, null, settings);
        doc.drawText('This grid is drawn in its original size using the drawToPosition method.', 220, 0);
        doc.moveDown();
        wjcGridPdf.FlexGridPdfConverter.drawToPosition(this.flexGrid, doc, new wjcCore.Point(220, doc.y), null, null, settings);
        doc.drawText('This grid is drawn in its original size using the draw method and is split into multiple pages.', 0, 400);
        doc.moveDown();
        wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, null, null, settings);
        doc.end();
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], ExportToDocCmp.prototype, "flexGrid", void 0);
    ExportToDocCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-export-to-doc-cmp',
            templateUrl: 'src/components/gridconverter/exportToDocCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ExportToDocCmp);
    return ExportToDocCmp;
}());
exports.ExportToDocCmp = ExportToDocCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ExportToDocCmp }
]);
var ExportToDocModule = /** @class */ (function () {
    function ExportToDocModule() {
    }
    ExportToDocModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule],
            declarations: [ExportToDocCmp]
        })
    ], ExportToDocModule);
    return ExportToDocModule;
}());
exports.ExportToDocModule = ExportToDocModule;
//# sourceMappingURL=ExportToDocCmp.js.map