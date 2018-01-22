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
var ColumnPicker_1 = require("../ColumnPicker");
var core_1 = require("@angular/core");
// Represents a column picker.
var WjColumnPicker = /** @class */ (function (_super) {
    __extends(WjColumnPicker, _super);
    function WjColumnPicker(elRef) {
        return _super.call(this, elRef.nativeElement) || this;
    }
    __decorate([
        core_1.Input()
    ], WjColumnPicker.prototype, "grid", void 0);
    WjColumnPicker = __decorate([
        core_1.Component({
            selector: 'wj-column-picker',
            template: "<div></div>",
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], WjColumnPicker);
    return WjColumnPicker;
}(ColumnPicker_1.ColumnPicker));
exports.WjColumnPicker = WjColumnPicker;
;
//# sourceMappingURL=WjColumnPicker.js.map