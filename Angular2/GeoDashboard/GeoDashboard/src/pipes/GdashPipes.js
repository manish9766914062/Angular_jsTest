"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LatitudePipe = /** @class */ (function () {
    function LatitudePipe() {
    }
    LatitudePipe.prototype.transform = function (value, exponent) {
        if (!exponent)
            exponent = 0;
        value = value * 1;
        var ns = value > 0 ? 'N' : 'S';
        value = Math.abs(value);
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ns;
    };
    LatitudePipe = __decorate([
        core_1.Pipe({ name: 'latitude' })
    ], LatitudePipe);
    return LatitudePipe;
}());
exports.LatitudePipe = LatitudePipe;
var LongitudePipe = /** @class */ (function () {
    function LongitudePipe() {
    }
    LongitudePipe.prototype.transform = function (value, exponent) {
        if (!exponent)
            exponent = 0;
        value = value * 1;
        var ew = value > 0 ? 'E' : 'W';
        value = Math.abs(value);
        var deg = Math.floor(value);
        var min = Math.floor((value - deg) * 60);
        var sec = ((value - deg - min / 60) * 3600).toFixed(exponent);
        return deg + '°' + min + '\'' + sec + '"' + ew;
    };
    LongitudePipe = __decorate([
        core_1.Pipe({ name: 'longitude' })
    ], LongitudePipe);
    return LongitudePipe;
}());
exports.LongitudePipe = LongitudePipe;
//# sourceMappingURL=GdashPipes.js.map