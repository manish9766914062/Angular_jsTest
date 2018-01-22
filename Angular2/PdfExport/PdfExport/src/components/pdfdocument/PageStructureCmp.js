'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcPdf = require("wijmo/wijmo.pdf");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var PageStructureCmp = /** @class */ (function () {
    function PageStructureCmp() {
    }
    PageStructureCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            pageSettings: {
                layout: wjcPdf.PdfPageOrientation.Portrait,
                size: wjcPdf.PdfPageSize.Letter,
                margins: {
                    left: 72,
                    top: 72,
                    right: 72,
                    bottom: 72
                }
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        // stroke areas
        doc.header.paths
            .rect(0, 0, doc.header.width, doc.header.height)
            .stroke();
        doc.paths
            .rect(0, 0, doc.width, doc.height)
            .stroke();
        doc.footer.paths
            .rect(0, 0, doc.footer.width, doc.footer.height)
            .stroke();
        // write descriptions
        doc.header.drawText('Header');
        doc.drawText('Body');
        doc.footer.drawText('Footer');
        doc.end();
    };
    PageStructureCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-page-structure-cmp',
            templateUrl: 'src/components/pdfdocument/pageStructureCmp.html'
        })
    ], PageStructureCmp);
    return PageStructureCmp;
}());
exports.PageStructureCmp = PageStructureCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: PageStructureCmp }
]);
var PageStructureModule = /** @class */ (function () {
    function PageStructureModule() {
    }
    PageStructureModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [PageStructureCmp]
        })
    ], PageStructureModule);
    return PageStructureModule;
}());
exports.PageStructureModule = PageStructureModule;
//# sourceMappingURL=PageStructureCmp.js.map