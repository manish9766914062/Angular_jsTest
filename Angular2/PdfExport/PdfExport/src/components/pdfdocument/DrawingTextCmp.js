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
var DrawingTextCmp = /** @class */ (function () {
    function DrawingTextCmp() {
    }
    DrawingTextCmp.prototype.export = function () {
        var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia.', doc = new wjcPdf.PdfDocument({
            header: {
                height: 0 // no header 
            },
            footer: {
                height: 0 // no footer
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        var bold = new wjcPdf.PdfFont();
        bold.weight = 'bold';
        doc.drawText('This text is aligned to left (default):', null, null, { font: bold });
        doc.drawText(lorem);
        doc.moveDown();
        doc.drawText('This text is aligned to right:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Right });
        doc.moveDown();
        doc.drawText('This text is centered:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Center });
        doc.moveDown();
        doc.drawText('This text is justified:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Justify });
        doc.moveDown();
        doc.drawText('This text is wrapped and clipped by a rectangle of dimensions 100x100:', null, null, { font: bold });
        doc.drawText(lorem, null, null, { width: 100, height: 100 });
        doc.end();
    };
    DrawingTextCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-drawing-text-cmp',
            templateUrl: 'src/components/pdfdocument/drawingTextCmp.html'
        })
    ], DrawingTextCmp);
    return DrawingTextCmp;
}());
exports.DrawingTextCmp = DrawingTextCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingTextCmp }
]);
var DrawingTextModule = /** @class */ (function () {
    function DrawingTextModule() {
    }
    DrawingTextModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [DrawingTextCmp]
        })
    ], DrawingTextModule);
    return DrawingTextModule;
}());
exports.DrawingTextModule = DrawingTextModule;
//# sourceMappingURL=DrawingTextCmp.js.map