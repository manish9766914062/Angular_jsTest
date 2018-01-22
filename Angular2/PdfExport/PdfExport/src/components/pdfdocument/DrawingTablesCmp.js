'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcPdf = require("wijmo/wijmo.pdf");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var DrawingTablesCmp = /** @class */ (function () {
    function DrawingTablesCmp(dataSvc) {
        this._dataSvc = dataSvc;
    }
    DrawingTablesCmp.prototype.export = function () {
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
        var colWidth = 100, rowHeight = 18, data = this._dataSvc.getData(50), dataKeyMap = ['id', 'product', 'country'], y = 0;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < 3; j++) {
                var x = j * colWidth;
                doc.paths
                    .rect(x, y, colWidth, rowHeight)
                    .stroke();
                doc.drawText(data[i][dataKeyMap[j]] + '', x + 2, y + 2, {
                    height: rowHeight,
                    width: colWidth
                });
            }
            y += rowHeight;
            if (y >= doc.height) {
                y = 0;
                doc.addPage();
            }
        }
        doc.end();
    };
    DrawingTablesCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-drawing-tables-cmp',
            templateUrl: 'src/components/pdfdocument/drawingTablesCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], DrawingTablesCmp);
    return DrawingTablesCmp;
}());
exports.DrawingTablesCmp = DrawingTablesCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingTablesCmp }
]);
var DrawingTablesModule = /** @class */ (function () {
    function DrawingTablesModule() {
    }
    DrawingTablesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [DrawingTablesCmp]
        })
    ], DrawingTablesModule);
    return DrawingTablesModule;
}());
exports.DrawingTablesModule = DrawingTablesModule;
//# sourceMappingURL=DrawingTablesCmp.js.map