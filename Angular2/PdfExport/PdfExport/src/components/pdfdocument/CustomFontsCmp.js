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
var CustomFontsCmp = /** @class */ (function () {
    function CustomFontsCmp() {
    }
    CustomFontsCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        doc.registerFont({
            source: 'resources/fonts/fira/FiraSans-Regular.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'normal',
            sansSerif: true
        });
        doc.registerFont({
            source: 'resources/fonts/fira/FiraSans-Bold.ttf',
            name: 'fira',
            style: 'normal',
            weight: 'bold',
            sansSerif: true
        });
        doc.drawText('Here is the standard Times font.');
        var font = new wjcPdf.PdfFont('fira');
        doc.drawText('Here is the FiraSans-Regular font.', null, null, { font: font });
        font.weight = 'bold';
        doc.drawText('Here is the FiraSans-Bold font.', null, null, { font: font });
        doc.end();
    };
    CustomFontsCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-custom-fonts-cmp',
            templateUrl: 'src/components/pdfdocument/customFontsCmp.html'
        })
    ], CustomFontsCmp);
    return CustomFontsCmp;
}());
exports.CustomFontsCmp = CustomFontsCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: CustomFontsCmp }
]);
var CustomFontsModule = /** @class */ (function () {
    function CustomFontsModule() {
    }
    CustomFontsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [CustomFontsCmp]
        })
    ], CustomFontsModule);
    return CustomFontsModule;
}());
exports.CustomFontsModule = CustomFontsModule;
//# sourceMappingURL=CustomFontsCmp.js.map