"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SparkLinesCmp = /** @class */ (function () {
    function SparkLinesCmp() {
        this.lines = [];
    }
    SparkLinesCmp.prototype.ngOnChanges = function (changes) {
        if (!this.value)
            return;
        this.lines = this._getSparklines(this.value);
    };
    SparkLinesCmp.prototype._getSparklines = function (data) {
        if (!data) {
            return [];
        }
        // create line elements
        var min = Math.min.apply(Math, data), max = Math.max.apply(Math, data), x1 = 0, y1 = this._scaleY(data[0], min, max), x2, y2, svg;
        var lines = [];
        for (var i = 1; i < data.length; i++) {
            x2 = Math.round((i) / (data.length - 1) * 100);
            y2 = this._scaleY(data[i], min, max);
            lines.push({
                x1: x1 + '%',
                y1: y1 + '%',
                x2: x2 + '%',
                y2: y2 + '%'
            });
            x1 = x2;
            y1 = y2;
        }
        return lines;
    };
    SparkLinesCmp.prototype._scaleY = function (value, min, max) {
        return 100 - Math.round((value - min) / (max - min) * 100);
    };
    __decorate([
        core_1.Input()
    ], SparkLinesCmp.prototype, "value", void 0);
    __decorate([
        core_1.Input()
    ], SparkLinesCmp.prototype, "width", void 0);
    __decorate([
        core_1.Input()
    ], SparkLinesCmp.prototype, "height", void 0);
    SparkLinesCmp = __decorate([
        core_1.Component({
            selector: 'spark-lines',
            templateUrl: './src/components/sparkLines.component.html'
        })
    ], SparkLinesCmp);
    return SparkLinesCmp;
}());
exports.SparkLinesCmp = SparkLinesCmp;
//# sourceMappingURL=sparkLines.component.js.map