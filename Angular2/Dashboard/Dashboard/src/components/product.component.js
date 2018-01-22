"use strict";
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
var router_1 = require("@angular/router");
var DataSvc_1 = require("../services/DataSvc");
var ProductCmp = /** @class */ (function () {
    function ProductCmp(route, dataSvc) {
        var _this = this;
        this.route = route;
        this.dataSvc = dataSvc;
        this.route.params.subscribe(function (params) {
            _this.productId = parseInt(params['id']);
        });
        dataSvc.loadingSucceed = function () {
            _this.dataSvc.selectProduct(_this.productId);
            _this.product = _this.dataSvc.product;
        };
    }
    ProductCmp.prototype.ngAfterViewInit = function () {
        this.dataSvc.selectProduct(this.productId);
        this.product = this.dataSvc.product;
    };
    ProductCmp = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: './src/components/product.component.html'
        }),
        __param(0, core_1.Inject(router_1.ActivatedRoute)), __param(1, core_1.Inject(DataSvc_1.DataSvc))
    ], ProductCmp);
    return ProductCmp;
}());
exports.ProductCmp = ProductCmp;
//# sourceMappingURL=product.component.js.map