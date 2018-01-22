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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var GaugeBaseCmp_1 = require("./GaugeBaseCmp");
var router_1 = require("@angular/router");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
// Radial gauge sample component.
var RadialGaugeCmp = /** @class */ (function (_super) {
    __extends(RadialGaugeCmp, _super);
    function RadialGaugeCmp() {
        return _super.call(this) || this;
    }
    RadialGaugeCmp = __decorate([
        core_1.Component({
            selector: 'radial-gauge-cmp',
            templateUrl: 'src/components/gauge/radialGaugeCmp.html'
        })
    ], RadialGaugeCmp);
    return RadialGaugeCmp;
}(GaugeBaseCmp_1.GaugeBaseCmp));
exports.RadialGaugeCmp = RadialGaugeCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: RadialGaugeCmp }
]);
var RadialGaugeModule = /** @class */ (function () {
    function RadialGaugeModule() {
    }
    RadialGaugeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_gauge_1.WjGaugeModule],
            declarations: [RadialGaugeCmp],
        })
    ], RadialGaugeModule);
    return RadialGaugeModule;
}());
exports.RadialGaugeModule = RadialGaugeModule;
//# sourceMappingURL=RadialGaugeCmp.js.map