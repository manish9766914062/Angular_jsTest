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
    DataSvc_1 = DataSvc;
    // data used to generate random items
    DataSvc.prototype.getData = function (count) {
        var data = [], dt = new Date();
        // add count items
        for (var i = 0; i < count; i++) {
            // constants used to create data items
            var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * DataSvc_1.countries.length), productId = Math.floor(Math.random() * DataSvc_1.products.length), colorId = Math.floor(Math.random() * DataSvc_1.colors.length);
            // create the item
            var item = {
                id: i,
                start: date,
                end: date,
                country: DataSvc_1.countries[countryId],
                product: DataSvc_1.products[productId],
                color: DataSvc_1.colors[colorId],
                amount: Math.random() * 10000 - 5000,
                active: i % 4 === 0,
            };
            // add the item to the list
            data.push(item);
        }
        return data;
    };
    DataSvc.prototype.getNames = function () {
        return ['id', 'start', 'end', 'country', 'product', 'color', 'amount', 'active'];
    };
    DataSvc.countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    DataSvc.products = ['Widget', 'Gadget', 'Doohickey'];
    DataSvc.colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
    DataSvc = DataSvc_1 = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
    var DataSvc_1;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map