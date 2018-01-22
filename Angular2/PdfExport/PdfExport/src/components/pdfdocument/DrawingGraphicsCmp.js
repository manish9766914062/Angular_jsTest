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
var DrawingGraphicsCmp = /** @class */ (function () {
    function DrawingGraphicsCmp() {
        this._sz = 100; // sample area's size.
        this._c1 = new wjcCore.Color('#3173c0');
        this._c2 = new wjcCore.Color('#e69500');
    }
    DrawingGraphicsCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            header: {
                height: 0
            },
            footer: {
                height: 0
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        this._sample1(doc);
        this._sample2(doc);
        this._sample3(doc);
        this._sample4(doc);
        this._sample5(doc);
        doc.end();
    };
    DrawingGraphicsCmp.prototype._sample1 = function (doc) {
        doc.drawText('Draw a series of lines with different styles: ');
        var y = doc.y + doc.lineHeight();
        // default document's pen (black color)
        doc.paths
            .moveTo(0, y)
            .lineTo(this._sz, y)
            .stroke();
        // color
        doc.paths
            .moveTo(0, y + 20)
            .lineTo(this._sz, y + 20)
            .stroke(this._c1);
        // color, line width = 3
        doc.paths
            .moveTo(0, y + 40)
            .lineTo(this._sz, y + 40)
            .stroke(new wjcPdf.PdfPen(this._c1, 3));
        // opacity color, line width = 3
        doc.paths
            .moveTo(0, y + 60)
            .lineTo(this._sz, y + 60)
            .stroke(new wjcPdf.PdfPen(wjcCore.Color.fromRgba(this._c1.r, this._c1.g, this._c1.b, 0.2), 3));
        // color, dash pattern, line width = 3
        doc.paths
            .moveTo(0, y + 80)
            .lineTo(this._sz, y + 80)
            .stroke(new wjcPdf.PdfPen(this._c1, 3, new wjcPdf.PdfDashPattern(5)));
        doc.y = y + this._sz + doc.lineHeight();
    };
    DrawingGraphicsCmp.prototype._sample2 = function (doc) {
        doc.drawText('Draw a rectangle covered with a filled curved path:');
        var y = doc.y + doc.lineHeight();
        doc.paths
            .rect(0, y, this._sz, this._sz)
            .stroke(this._c1);
        doc.paths
            .moveTo(0, y)
            .bezierCurveTo(this._sz / 2, y, this._sz / 2, this._sz + y, this._sz, this._sz + y)
            .lineTo(0, this._sz + y)
            .lineTo(0, y)
            .fill(this._c2);
        doc.y = y + this._sz + doc.lineHeight();
    };
    DrawingGraphicsCmp.prototype._sample3 = function (doc) {
        doc.drawText('Draw a rectangle, inscribe a circle into it, fill the circle with an opaque color and stroke it using a dashed line:');
        var y = doc.y + doc.lineHeight();
        doc.paths
            .rect(0, y, this._sz, this._sz)
            .fill(this._c1);
        doc.paths
            .circle(this._sz / 2, y + this._sz / 2, this._sz / 2)
            .fillAndStroke(wjcCore.Color.fromRgba(this._c2.r, this._c2.g, this._c2.b, 0.3), new wjcPdf.PdfPen(this._c2, 2, new wjcPdf.PdfDashPattern(5)));
        doc.y = y + this._sz + doc.lineHeight();
    };
    DrawingGraphicsCmp.prototype._sample4 = function (doc) {
        doc.drawText('Draw a simple pattern clipped by a circular clipping path:');
        var y = doc.y + doc.lineHeight(), a0 = 10;
        doc.saveState();
        // clipping path
        doc.paths
            .circle(this._sz / 2, y + this._sz / 2, this._sz / 2)
            .clip();
        // draw pattern
        for (var i = 0; i < 10; i++) {
            doc.paths
                .rect(0, y + i * a0, this._sz, a0)
                .fill(i % 2 ? this._c1 : this._c2);
        }
        doc.restoreState();
        doc.y = y + this._sz + doc.lineHeight();
    };
    DrawingGraphicsCmp.prototype._sample5 = function (doc) {
        doc.drawText('Draw a series of rectangles and rotate every rectangle by 15 degrees to the previous:');
        var y = doc.y + doc.lineHeight(), degrees = 15, samples = 90 / degrees;
        doc.saveState();
        for (var i = 0; i < samples; i++) {
            doc
                .rotate(degrees, new wjcCore.Point(this._sz / 2, y + this._sz / 2))
                .paths
                .rect((this._sz - this._sz / Math.sqrt(2)) / 2, y + ((this._sz - this._sz / Math.sqrt(2)) / 2), this._sz / Math.sqrt(2), this._sz / Math.sqrt(2))
                .fill(wjcCore.Color.interpolate(this._c1, this._c2, i * (1 / (samples - 1))));
        }
        doc.restoreState();
        doc.y = y + this._sz + doc.lineHeight();
    };
    DrawingGraphicsCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-drawing-graphics-cmp',
            templateUrl: 'src/components/pdfdocument/drawingGraphicsCmp.html'
        })
    ], DrawingGraphicsCmp);
    return DrawingGraphicsCmp;
}());
exports.DrawingGraphicsCmp = DrawingGraphicsCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingGraphicsCmp }
]);
var DrawingGraphicsModule = /** @class */ (function () {
    function DrawingGraphicsModule() {
    }
    DrawingGraphicsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [DrawingGraphicsCmp]
        })
    ], DrawingGraphicsModule);
    return DrawingGraphicsModule;
}());
exports.DrawingGraphicsModule = DrawingGraphicsModule;
//# sourceMappingURL=DrawingGraphicsCmp.js.map