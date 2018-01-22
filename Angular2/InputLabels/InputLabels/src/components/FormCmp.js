'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormCmp = /** @class */ (function () {
    function FormCmp() {
        this.customSubmit = new core_1.EventEmitter();
        this.countries = 'US,UK,Japan,Germany,France,Italy,Russia,China,India,Korea,Spain,Canada,Denmark,Sweden,Holland,Norway,Portugal'.split(',');
        this.colors = 'Black,White,Grey,Red,Green,Blue,Yellow,Pink,Purple,Orange'.split(',');
    }
    // changes have been accepted, hide dialog
    FormCmp.prototype.onSubmit = function (form) {
        this.customSubmit.emit(form.valid);
    };
    __decorate([
        core_1.Input()
    ], FormCmp.prototype, "item", void 0);
    __decorate([
        core_1.Input()
    ], FormCmp.prototype, "staticLabels", void 0);
    __decorate([
        core_1.Output()
    ], FormCmp.prototype, "customSubmit", void 0);
    FormCmp = __decorate([
        core_1.Component({
            selector: 'form-cmp',
            templateUrl: 'src/components/formCmp.html'
        })
    ], FormCmp);
    return FormCmp;
}());
exports.FormCmp = FormCmp;
//# sourceMappingURL=FormCmp.js.map