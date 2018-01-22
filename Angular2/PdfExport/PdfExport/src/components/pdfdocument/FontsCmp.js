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
var FontsCmp = /** @class */ (function () {
    function FontsCmp() {
    }
    FontsCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        doc.drawText('This text uses the default document font, Times 10.');
        doc.drawText('This text uses Times Bold Oblique 20.', null, null, {
            font: new wjcPdf.PdfFont('times', 20, 'oblique', 'bold')
        });
        doc.setFont(new wjcPdf.PdfFont('helvetica'));
        doc.drawText('This text uses Helvetica 10.');
        doc.drawText('This text also uses Helvetica 10.');
        doc.end();
    };
    FontsCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-fonts-cmp',
            templateUrl: 'src/components/pdfdocument/fontsCmp.html'
        })
    ], FontsCmp);
    return FontsCmp;
}());
exports.FontsCmp = FontsCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: FontsCmp }
]);
var FontsModule = /** @class */ (function () {
    function FontsModule() {
    }
    FontsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [FontsCmp]
        })
    ], FontsModule);
    return FontsModule;
}());
exports.FontsModule = FontsModule;
//# sourceMappingURL=FontsCmp.js.map