'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    DataSvc.prototype.rand = function () {
        return Math.round(Math.random() * 100);
    };
    ;
    // data used to generate random items
    DataSvc.prototype.getData = function () {
        var dataCount = 3000, rand = this.rand, data = [], mod;
        for (var i = 0; i < dataCount; i++) {
            mod = Math.floor(i / 10) % 10;
            data.push({
                date: new Date(2005, 0, i),
                yval: mod == 0 ? null : rand()
            });
        }
        return data;
    };
    ;
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map