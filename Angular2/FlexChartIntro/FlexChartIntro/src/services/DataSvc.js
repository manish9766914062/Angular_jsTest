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
    // data used to generate random items
    DataSvc.prototype.getData = function (countries) {
        var data = [];
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    };
    ;
    DataSvc.prototype.getFunnelData = function (countries) {
        var data = [], sales = 10000;
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: sales
            });
            sales = sales - Math.round(Math.random() * 2000);
        }
        return data;
    };
    ;
    DataSvc.prototype.getRangeData = function (countries) {
        var data = [];
        var year = new Date().getFullYear();
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                num1: Math.random() * 10000,
                num2: Math.random() * 20000,
                date1: new Date(year, Math.floor(Math.random() * 6), Math.floor(Math.random() * 14)),
                date2: new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
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