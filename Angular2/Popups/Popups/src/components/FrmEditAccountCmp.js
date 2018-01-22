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
var FrmBaseCmp_1 = require("./FrmBaseCmp");
var FrmEditAccountCmp = /** @class */ (function (_super) {
    __extends(FrmEditAccountCmp, _super);
    function FrmEditAccountCmp() {
        return _super.call(this) || this;
    }
    // Triggers the 'submit' event and shows the specified message.
    FrmEditAccountCmp.prototype.onSubmit = function (e, theForm) {
        // process the form variables here...
        var form = e.target;
        console.log('** submitting form ' + form.name);
        this.submit.emit({ valid: theForm.valid });
    };
    FrmEditAccountCmp = __decorate([
        core_1.Component({
            selector: 'frm-edit-account-cmp',
            templateUrl: 'src/components/frmEditAccountCmp.html'
        })
    ], FrmEditAccountCmp);
    return FrmEditAccountCmp;
}(FrmBaseCmp_1.FrmBaseCmp));
exports.FrmEditAccountCmp = FrmEditAccountCmp;
//# sourceMappingURL=FrmEditAccountCmp.js.map