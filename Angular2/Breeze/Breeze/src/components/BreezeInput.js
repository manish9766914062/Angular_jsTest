"use strict";
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
var wjcCore = require("wijmo/wijmo");
'use strict';
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var BreezeInput = /** @class */ (function () {
    function BreezeInput(elRef) {
        this._ntvEle = elRef.nativeElement;
    }
    BreezeInput_1 = BreezeInput;
    BreezeInput.prototype.ngAfterViewInit = function () {
        this.id = 'bz-' + this.propName + BreezeInput_1._uid++;
        this.errorPath = this.propName + 'Errors';
    };
    BreezeInput.prototype.ngOnChanges = function (changes) {
        var entity = this.model;
        if (!entity)
            return;
        var aspect = entity.entityAspect, errors = aspect.getValidationErrors(this.propName);
        if (errors.length) {
            if (wjcCore.hasClass(this._ntvEle, 'error')) {
                return;
            }
            wjcCore.addClass(this._ntvEle, 'error');
            var messages = errors.map(function (el) { return el.errorMessage; }).join("; "); // convert to string
            aspect[this.errorPath] = messages;
        }
        else {
            if (aspect[this.errorPath] = null) {
                return;
            }
            wjcCore.removeClass(this._ntvEle, 'error');
            aspect[this.errorPath] = null;
        }
    };
    BreezeInput._uid = 0;
    __decorate([
        core_1.Input()
    ], BreezeInput.prototype, "label", void 0);
    __decorate([
        core_1.Input()
    ], BreezeInput.prototype, "model", void 0);
    __decorate([
        core_1.Input()
    ], BreezeInput.prototype, "propName", void 0);
    __decorate([
        core_1.Input()
    ], BreezeInput.prototype, "value", void 0);
    BreezeInput = BreezeInput_1 = __decorate([
        core_1.Component({
            selector: 'breezeinput',
            templateUrl: 'src/components/breezeInput.html'
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], BreezeInput);
    return BreezeInput;
    var BreezeInput_1;
}());
exports.BreezeInput = BreezeInput;
var BreezeInputModule = /** @class */ (function () {
    function BreezeInputModule() {
    }
    BreezeInputModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [BreezeInput],
            exports: [BreezeInput]
        })
    ], BreezeInputModule);
    return BreezeInputModule;
}());
exports.BreezeInputModule = BreezeInputModule;
//# sourceMappingURL=BreezeInput.js.map