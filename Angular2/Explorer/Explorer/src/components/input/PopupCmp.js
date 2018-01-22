"use strict";
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
var wjcInput = require("wijmo/wijmo.input");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var InputBaseCmp_1 = require("./InputBaseCmp");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var FrmCreateAccountCmp_1 = require("../includes/FrmCreateAccountCmp");
var FrmEditAccountCmp_1 = require("../includes/FrmEditAccountCmp");
var FrmLogInCmp_1 = require("../includes/FrmLogInCmp");
var PopupCmp = /** @class */ (function (_super) {
    __extends(PopupCmp, _super);
    function PopupCmp(dataSvc) {
        var _this = _super.call(this, dataSvc) || this;
        _this.modal = true;
        return _this;
    }
    PopupCmp.prototype.showDialog = function (dlg) {
        if (dlg) {
            var inputs = dlg.hostElement.querySelectorAll('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type != 'checkbox') {
                    inputs[i].value = '';
                }
            }
            dlg.modal = this.modal;
            dlg.hideTrigger = dlg.modal ? wjcInput.PopupTrigger.None : wjcInput.PopupTrigger.Blur;
            dlg.show();
        }
    };
    ;
    PopupCmp = __decorate([
        core_1.Component({
            selector: 'popup-cmp',
            templateUrl: 'src/components/input/popupCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], PopupCmp);
    return PopupCmp;
}(InputBaseCmp_1.InputBaseCmp));
exports.PopupCmp = PopupCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: PopupCmp }
]);
var PopupModule = /** @class */ (function () {
    function PopupModule() {
    }
    PopupModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_input_1.WjInputModule],
            declarations: [PopupCmp, FrmCreateAccountCmp_1.FrmCreateAccountCmp, FrmEditAccountCmp_1.FrmEditAccountCmp, FrmLogInCmp_1.FrmLogInCmp],
        })
    ], PopupModule);
    return PopupModule;
}());
exports.PopupModule = PopupModule;
//# sourceMappingURL=PopupCmp.js.map