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
var DrawingImagesCmp = /** @class */ (function () {
    function DrawingImagesCmp() {
    }
    DrawingImagesCmp.prototype.export = function () {
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
        });
        var image = 'resources/wijmo1.png';
        doc.drawText('This image is rendered in its original size:');
        doc.drawImage(image);
        doc.moveDown();
        doc.drawText('This image is scaled to fit the width of 100:');
        doc.drawImage(image, null, null, { width: 100 });
        doc.moveDown();
        doc.drawText('This image is scaled to fit the height of 25:');
        doc.drawImage(image, null, null, { height: 25 });
        doc.moveDown();
        doc.drawText('This image is stretched to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25
        });
        doc.moveDown();
        doc.drawText('This image is centered and stretched proportionally to fit a rectangle of dimensions 100x25:');
        doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
        doc.drawImage(image, null, null, {
            width: 100,
            height: 25,
            stretchProportionally: true,
            align: wjcPdf.PdfImageHorizontalAlign.Center
        });
        doc.end();
    };
    DrawingImagesCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-drawing-images-cmp',
            templateUrl: 'src/components/pdfdocument/drawingImagesCmp.html'
        })
    ], DrawingImagesCmp);
    return DrawingImagesCmp;
}());
exports.DrawingImagesCmp = DrawingImagesCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingImagesCmp }
]);
var DrawingImagesModule = /** @class */ (function () {
    function DrawingImagesModule() {
    }
    DrawingImagesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [DrawingImagesCmp]
        })
    ], DrawingImagesModule);
    return DrawingImagesModule;
}());
exports.DrawingImagesModule = DrawingImagesModule;
//# sourceMappingURL=DrawingImagesCmp.js.map