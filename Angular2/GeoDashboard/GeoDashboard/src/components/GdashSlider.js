'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GdashSlider = /** @class */ (function () {
    function GdashSlider() {
    }
    GdashSlider.prototype.ngOnChanges = function (changes) {
        if (!changes.extent) {
            return;
        }
        var value = changes.extent.currentValue;
        // calculate slider position (as a percentage)
        value = Math.log(this.value / 100);
        value = Math.min(Math.max(value, -1.5), +1.5);
        value = (value + 1.5) / 3;
        // convert to pixels
        value = value * 230 - 15;
        // apply position
        this.marker['css']['left'] = value + 'px';
    };
    __decorate([
        core_1.Input()
    ], GdashSlider.prototype, "value", void 0);
    __decorate([
        core_1.Input()
    ], GdashSlider.prototype, "color", void 0);
    __decorate([
        core_1.ViewChild('marker')
    ], GdashSlider.prototype, "marker", void 0);
    GdashSlider = __decorate([
        core_1.Component({
            selector: 'gdash-slider',
            templateUrl: 'src/components/gdashSlider.html'
        })
    ], GdashSlider);
    return GdashSlider;
}());
exports.GdashSlider = GdashSlider;
//# sourceMappingURL=GdashSlider.js.map