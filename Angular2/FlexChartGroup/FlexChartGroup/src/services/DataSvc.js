'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wjcCore = require("wijmo/wijmo");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    // data used to generate random items
    DataSvc.prototype.getData = function (count) {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','), citiesByCountry = {
            US: ['New York', 'Los Angeles', 'Chicago', 'Phoenix', 'Dallas'],
            Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
            UK: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield'],
            Japan: ['Tokyo', 'Kanagawa', 'Osaka', 'Aichi', 'Hokkaido'],
            Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
            Greece: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa']
        }, years = [2010, 2011, 2012, 2013, 2014], data = new wjcCore.ObservableArray(), countriesLen = countries.length, country, yearIndex, cityIndex;
        for (var i = 0; i < count; i++) {
            yearIndex = Math.floor(Math.random() * 5);
            cityIndex = Math.floor(Math.random() * 5);
            country = countries[i % countriesLen];
            data.push({
                id: i,
                country: country,
                city: citiesByCountry[country][cityIndex],
                date: new Date(years[yearIndex], i % 12, i % 27 + 1),
                amount: Math.random() * 10000
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