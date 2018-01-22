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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var router_2 = require("@angular/router");
var wijmo_angular2_gauge_1 = require("wijmo/wijmo.angular2.gauge");
var ProductsService_1 = require("../services/ProductsService");
var ProductCmp = /** @class */ (function () {
    function ProductCmp(pdtSvc, router) {
        this._dvaCaption = [
            'Negligible',
            'Low',
            'Average',
            'Good',
            'Great'
        ];
        this._dvaRange = [
            'below 5%',
            'between 5 and 10%',
            'between 10 and 20%',
            'between 20 and 40%',
            'above 40%'
        ];
        this._router = router;
        this.pdtSvc = pdtSvc;
    }
    ProductCmp.prototype.backToStore = function () {
        window.location.href = '';
    };
    // Get the caption of the nutrients
    ProductCmp.prototype.getDvaCaption = function (idx) {
        if (idx < this._dvaCaption.length) {
            return this._dvaCaption[idx];
        }
        else {
            return undefined;
        }
    };
    // Get the range discription of the nutrients
    ProductCmp.prototype.getDvaRange = function (idx) {
        if (idx < this._dvaRange.length) {
            return this._dvaRange[idx];
        }
        else {
            return undefined;
        }
    };
    ProductCmp.prototype.getNutrientsKeys = function () {
        return Object.keys(this.pdtSvc.products.currentItem.nutrients);
    };
    ProductCmp = __decorate([
        core_1.Component({
            selector: 'product-cmp',
            templateUrl: 'src/components/productCmp.html',
        }),
        __param(0, core_1.Inject(ProductsService_1.ProductsService)), __param(1, core_1.Inject(router_1.Router))
    ], ProductCmp);
    return ProductCmp;
}());
exports.ProductCmp = ProductCmp;
var routing = router_2.RouterModule.forChild([
    { path: '', component: ProductCmp }
]);
var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, wijmo_angular2_gauge_1.WjGaugeModule, forms_1.FormsModule, routing],
            declarations: [ProductCmp],
        })
    ], ProductModule);
    return ProductModule;
}());
exports.ProductModule = ProductModule;
//# sourceMappingURL=ProductCmp.js.map