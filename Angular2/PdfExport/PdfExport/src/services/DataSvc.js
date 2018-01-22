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
        // data used to generate random items
        this._countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        this._capitals = ['Washington', 'Berlin', 'London', 'Tokyo', 'Rome', 'Athens'];
        this._products = ['Widget', 'Gadget', 'Doohickey'];
        this._colors = ['Orange', 'White', 'Red', 'Green', 'Blue'];
    }
    DataSvc.prototype.getData = function (count, unique) {
        if (unique === void 0) { unique = false; }
        var res = [], dt = new Date();
        // add count items
        for (var i = 0; i < count; i++) {
            // constants used to create data items
            var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = unique == true ? i : Math.floor(Math.random() * this._countries.length), productId = Math.floor(Math.random() * this._products.length), colorId = Math.floor(Math.random() * this._colors.length);
            // create the item
            var item = {
                id: i,
                start: date,
                end: date,
                country: this._countries[countryId],
                capital: this._capitals[countryId],
                product: this._products[productId],
                color: this._colors[colorId],
                amount: Math.random() * 10000 - 5000,
                amount2: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0,
            };
            // add the item to the list
            res.push(item);
        }
        return res;
    };
    DataSvc.prototype.getEmployees = function () {
        return [
            {
                Id: 'E892659',
                Name: 'Robert King',
                Department: 'Sales',
                Position: 'Sales Representative',
                SSN: 'A37830',
                Manager: 'Andrew Fuller',
                Purpose: 'On business',
                Attachment: true,
                Advance: 1000,
                Expenses: this.getExpenses()
            },
            {
                Id: 'E3667093',
                Name: 'John Taylor',
                Department: 'Sales',
                Position: 'Sales Representative',
                SSN: 'A83745',
                Manager: 'Andrew Fuller',
                Purpose: 'On business',
                Attachment: false,
                Advance: 800,
                Expenses: this.getExpenses()
            },
            {
                Id: 'E294989',
                Name: 'Gregory Allen',
                Department: 'Sales',
                Position: 'Sales Representative',
                SSN: 'A23927',
                Manager: 'Andrew Fuller',
                Purpose: 'On business',
                Attachment: true,
                Advance: 1200,
                Expenses: this.getExpenses()
            }
        ];
    };
    DataSvc.prototype.getExpenses = function () {
        // [5; 10]
        var count = 5 + Math.round(Math.random() * 5), res = [], msPerDay = 1000 * 24 * 60 * 60, curDate = Date.now() - 60 * msPerDay;
        for (var i = 0; i < count; i++) {
            res.push({
                Date: new Date(curDate),
                Description: 'Customer visit',
                Hotel: 30 + Math.random() * 200,
                Transport: 10 + Math.random() * 150,
                Fuel: Math.random() * 50,
                Meal: 30 + Math.random() * 170,
                Misc: Math.random() * 220
            });
            res[i].Total = res[i].Hotel + res[i].Transport + res[i].Fuel + res[i].Meal + res[i].Misc;
            curDate += msPerDay * Math.round(Math.random() * 4);
        }
        return res;
    };
    DataSvc.prototype.calculateTotals = function (items) {
        var hotel = 0, transport = 0, fuel = 0, meal = 0, misc = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            hotel += item.Hotel;
            transport += item.Transport;
            fuel += item.Fuel;
            meal += item.Meal;
            misc += item.Misc;
        }
        return [
            { name: 'Hotel', value: hotel },
            { name: 'Transport', value: transport },
            { name: 'Meal', value: meal },
            { name: 'Fuel', value: fuel },
            { name: 'Misc', value: misc }
        ];
    };
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map