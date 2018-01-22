'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcChart = require("wijmo/wijmo.chart");
var core_1 = require("@angular/core");
// Base class for all components demonstrating FlexPie control export.
var DrawingFlexPieBaseCmp = /** @class */ (function () {
    function DrawingFlexPieBaseCmp(dataSvc, format) {
        this._dataSvc = dataSvc;
        this._imgFormat = format;
    }
    DrawingFlexPieBaseCmp.prototype.export = function () {
        var _this = this;
        var doc = new wjcPdf.PdfDocument({
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        }), data = this._dataSvc.getExpenses(), flexPie = new wjcChart.FlexPie('#pie'), renderingImageFlag = false;
        try {
            flexPie.initialize({
                itemsSource: [
                    { name: 'Hotel', value: this._summarizeColumn(data, 'Hotel') },
                    { name: 'Transport', value: this._summarizeColumn(data, 'Transport') },
                    { name: 'Meal', value: this._summarizeColumn(data, 'Meal') },
                    { name: 'Fuel', value: this._summarizeColumn(data, 'Fuel') },
                    { name: 'Misc', value: this._summarizeColumn(data, 'Misc') }
                ],
                binding: 'value',
                bindingName: 'name',
                innerRadius: 0.75,
                dataLabel: {
                    content: '{value:c1}',
                    position: wjcChart.PieLabelPosition.Inside
                },
                rendered: function (sender, args) {
                    if (!renderingImageFlag) {
                        renderingImageFlag = true;
                        try {
                            sender.saveImageToDataUrl(_this._imgFormat, function (url) {
                                flexPie.dispose();
                                doc.drawText('Total expenses by category:');
                                _this._renderImage(doc, url);
                                doc.end();
                            });
                        }
                        catch (ex) {
                            flexPie.dispose();
                        }
                    }
                }
            });
        }
        catch (ex) {
            flexPie.dispose();
        }
    };
    DrawingFlexPieBaseCmp.prototype._summarizeColumn = function (data, name) {
        var sum = 0;
        data.forEach(function (item) {
            sum += item[name];
        });
        return sum;
    };
    DrawingFlexPieBaseCmp = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: ''
        })
    ], DrawingFlexPieBaseCmp);
    return DrawingFlexPieBaseCmp;
}());
exports.DrawingFlexPieBaseCmp = DrawingFlexPieBaseCmp;
//# sourceMappingURL=DrawingFlexPieBaseCmp.js.map