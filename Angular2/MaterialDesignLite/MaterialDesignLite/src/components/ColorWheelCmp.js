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
var core_1 = require("@angular/core");
var ColorWheel_1 = require("./ColorWheel");
var ColorWheelCmp = /** @class */ (function () {
    function ColorWheelCmp(elRef) {
        var _this = this;
        this.themeChanged = new core_1.EventEmitter();
        this._wheel = new ColorWheel_1.ColorWheel(elRef.nativeElement);
        this._wheel.themeChanged.addHandler(function (s, e) {
            if (_this.themeChanged) {
                _this.themeChanged.emit(s);
            }
        });
    }
    ColorWheelCmp.prototype.ngOnInit = function () {
        this._wheel.primary = 'Indigo';
        this._wheel.accent = 'Pink';
    };
    Object.defineProperty(ColorWheelCmp.prototype, "palette", {
        get: function () {
            return this._palette;
        },
        set: function (value) {
            if (this._palette !== value) {
                this._wheel.palette = value;
                this._wheel.refresh(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output()
    ], ColorWheelCmp.prototype, "themeChanged", void 0);
    __decorate([
        core_1.Input()
    ], ColorWheelCmp.prototype, "palette", null);
    ColorWheelCmp = __decorate([
        core_1.Component({
            selector: 'color-wheel',
            template: '<div></div>'
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], ColorWheelCmp);
    return ColorWheelCmp;
}());
exports.ColorWheelCmp = ColorWheelCmp;
//# sourceMappingURL=ColorWheelCmp.js.map