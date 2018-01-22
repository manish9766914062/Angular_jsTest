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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AutoCompleteCmp_1 = require("./AutoCompleteCmp");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
// MultiSelect sample component.
var MultiAutoCompleteCmp = /** @class */ (function (_super) {
    __extends(MultiAutoCompleteCmp, _super);
    function MultiAutoCompleteCmp(dataSvc) {
        var _this = _super.call(this, dataSvc) || this;
        _this.selectedCountries = ['Belgium', 'Vietnam'];
        return _this;
    }
    MultiAutoCompleteCmp = __decorate([
        core_1.Component({
            selector: 'multi-auto-select-cmp',
            templateUrl: 'src/components/input/multiAutoCompleteCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], MultiAutoCompleteCmp);
    return MultiAutoCompleteCmp;
}(AutoCompleteCmp_1.AutoCompleteCmp));
exports.MultiAutoCompleteCmp = MultiAutoCompleteCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: MultiAutoCompleteCmp }
]);
var MultiAutoCompleteModule = /** @class */ (function () {
    function MultiAutoCompleteModule() {
    }
    MultiAutoCompleteModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_input_1.WjInputModule],
            declarations: [MultiAutoCompleteCmp],
        })
    ], MultiAutoCompleteModule);
    return MultiAutoCompleteModule;
}());
exports.MultiAutoCompleteModule = MultiAutoCompleteModule;
//# sourceMappingURL=MultiAutoCompleteCmp.js.map