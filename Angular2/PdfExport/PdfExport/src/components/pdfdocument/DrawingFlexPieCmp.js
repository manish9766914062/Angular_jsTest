'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var wjcChart = require("wijmo/wijmo.chart");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DrawingFlexPieBaseCmp_1 = require("./DrawingFlexPieBaseCmp");
var DataSvc_1 = require("../../services/DataSvc");
var DrawingFlexPieCmp = /** @class */ (function (_super) {
    __extends(DrawingFlexPieCmp, _super);
    function DrawingFlexPieCmp(dataSvc) {
        return _super.call(this, dataSvc, wjcChart.ImageFormat.Png) || this;
    }
    DrawingFlexPieCmp.prototype._renderImage = function (area, url) {
        area.drawImage(url);
    };
    DrawingFlexPieCmp = __decorate([
        core_1.Component({
            selector: 'pdfdocument-drawing-flexpie-cmp',
            templateUrl: 'src/components/pdfdocument/drawingFlexPieCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], DrawingFlexPieCmp);
    return DrawingFlexPieCmp;
}(DrawingFlexPieBaseCmp_1.DrawingFlexPieBaseCmp));
exports.DrawingFlexPieCmp = DrawingFlexPieCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: DrawingFlexPieCmp }
]);
var DrawingFlexPieModule = /** @class */ (function () {
    function DrawingFlexPieModule() {
    }
    DrawingFlexPieModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [DrawingFlexPieCmp]
        })
    ], DrawingFlexPieModule);
    return DrawingFlexPieModule;
}());
exports.DrawingFlexPieModule = DrawingFlexPieModule;
//# sourceMappingURL=DrawingFlexPieCmp.js.map