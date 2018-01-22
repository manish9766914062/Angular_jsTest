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
var RunningTitlesCmp = /** @class */ (function () {
    function RunningTitlesCmp() {
    }
    RunningTitlesCmp.prototype.export = function () {
        var doc = new wjcPdf.PdfDocument({
            header: {
                declarative: {
                    text: '\tTitle\t&[Page]',
                    font: new wjcPdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            footer: {
                declarative: {
                    text: '\t&[Page]\\&[Pages]',
                    brush: '#3173c0',
                    font: new wjcPdf.PdfFont('helvetica', 10, 'normal', 'bold')
                }
            },
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
            }
        });
        doc.drawText('Lorem ipsum');
        doc.addPage();
        doc.drawText('Lorem ipsum');
        doc.end();
    };
    RunningTitlesCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-running-titles-cmp',
            templateUrl: 'src/components/pdfdocument/runningTitlesCmp.html'
        })
    ], RunningTitlesCmp);
    return RunningTitlesCmp;
}());
exports.RunningTitlesCmp = RunningTitlesCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: RunningTitlesCmp }
]);
var RunningTitlesModule = /** @class */ (function () {
    function RunningTitlesModule() {
    }
    RunningTitlesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [RunningTitlesCmp]
        })
    ], RunningTitlesModule);
    return RunningTitlesModule;
}());
exports.RunningTitlesModule = RunningTitlesModule;
//# sourceMappingURL=RunningTitlesCmp.js.map