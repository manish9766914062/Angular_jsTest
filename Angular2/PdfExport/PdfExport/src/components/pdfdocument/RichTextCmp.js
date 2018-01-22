'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var RichTextCmp = /** @class */ (function () {
    function RichTextCmp() {
    }
    RichTextCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            header: {
                height: 0 // no header 
            },
            footer: {
                height: 0 // no footer
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        }), c1 = new wjcCore.Color('#3173c0'), c2 = new wjcCore.Color('#e69500');
        // Use a bigger font to show fills and strokes clearly.
        doc.setFont(new wjcPdf.PdfFont('times', 20));
        doc.drawText('Lorem ', null, null, {
            continued: true
        });
        doc.drawText('ipsum ', null, null, {
            continued: true,
            stroke: true
        });
        doc.drawText('dolor ', null, null, {
            continued: true,
            brush: new wjcPdf.PdfSolidBrush(c1),
            fill: true,
            // Override the stroke property. The text settings are retained between drawText calls if the continued property is used.
            stroke: false
        });
        doc.drawText('sit ', null, null, {
            continued: true,
            pen: new wjcPdf.PdfPen(c2),
            fill: false,
            stroke: true
        });
        doc.drawText('amet.', null, null, {
            // A shorthand equivalent of new wijmo.pdf.PdfSolidBrush(c1)
            brush: c1,
            // A shorthand equivalent of new wijmo.pdf.PdfPen(c2)
            pen: c2,
            fill: true,
            stroke: true
        });
        doc.end();
    };
    RichTextCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-rich-text-cmp',
            templateUrl: 'src/components/pdfdocument/richTextCmp.html'
        })
    ], RichTextCmp);
    return RichTextCmp;
}());
exports.RichTextCmp = RichTextCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: RichTextCmp }
]);
var RichTextModule = /** @class */ (function () {
    function RichTextModule() {
    }
    RichTextModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [RichTextCmp]
        })
    ], RichTextModule);
    return RichTextModule;
}());
exports.RichTextModule = RichTextModule;
//# sourceMappingURL=RichTextCmp.js.map