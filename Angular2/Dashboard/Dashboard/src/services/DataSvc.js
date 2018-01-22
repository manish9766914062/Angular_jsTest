'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Product_1 = require("./Product");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
        this.products = [];
        this.chartData = [];
        this.loading = true;
        this.qPrev = Product_1.Product.getQuarter(true);
        this.qThis = Product_1.Product.getQuarter(false);
    }
    ;
    ;
    DataSvc.prototype.selectProduct = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            var p = this.products[i];
            if (p.id == id) {
                this.product = p;
                break;
            }
        }
    };
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map