"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcGridXlsx = require("wijmo/wijmo.grid.xlsx");
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcGridPdf = require("wijmo/wijmo.grid.pdf");
'use strict';
var core_1 = require("@angular/core");
// Common data service
var ExportSvc = /** @class */ (function () {
    function ExportSvc() {
        this.culture = '';
    }
    ExportSvc.prototype.exportXlsx = function (multiRow, fileName) {
        wjcGridXlsx.FlexGridXlsxConverter.save(multiRow, null, fileName);
    };
    ExportSvc.prototype.exportPdf = function (multiRow, fileName, isJapanese, customStyles) {
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
                wjcPdf.saveBlob(args.blob, fileName);
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
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        };
        if (!!customStyles) {
            settings.styles = customStyles;
        }
        // Set Japanese font for Japanese culture.
        if (isJapanese) {
            doc.registerFont({
                source: 'resources/fonts/ipaexg00201/ipaexg.ttf',
                name: 'ipaexg',
                style: 'normal',
                weight: 'normal',
                sansSerif: true
            });
            settings.styles.cellStyle['font'] = new wjcPdf.PdfFont('ipaexg');
        }
        wjcGridPdf.FlexGridPdfConverter.draw(multiRow, doc, null, null, settings);
        doc.end();
    };
    ExportSvc = __decorate([
        core_1.Injectable()
    ], ExportSvc);
    return ExportSvc;
}());
exports.ExportSvc = ExportSvc;
//# sourceMappingURL=ExportSvc.js.map