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
var wjcCore = require("wijmo/wijmo");
'use strict';
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var router_2 = require("@angular/router");
var ProductsService_1 = require("../services/ProductsService");
//EventAnnotations sample component
var StoreCmp = /** @class */ (function () {
    function StoreCmp(pdtSvc, router) {
        this._router = router;
        this.pdtSvc = pdtSvc;
        this._filterFunction = this.filterFunction.bind(this);
    }
    // log in or out using Firebase user authorization object
    StoreCmp.prototype.ngOnInit = function () {
        this.products = this.pdtSvc.products;
    };
    Object.defineProperty(StoreCmp.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            var _this = this;
            this._filter = value;
            if (this.toFilter) {
                clearTimeout(this.toFilter);
            }
            this.toFilter = setTimeout(function () {
                _this.toFilter = null;
                var cv = _this.products;
                if (cv) {
                    if (cv.filter != _this._filterFunction) {
                        cv.filter = _this._filterFunction;
                    }
                    else {
                        cv.refresh();
                    }
                }
            }, 500);
        },
        enumerable: true,
        configurable: true
    });
    // define filter function for collectionview
    StoreCmp.prototype.filterFunction = function (item) {
        var filter = this._filter;
        if (filter && item) {
            var value = item['name'];
            if (wjcCore.isString(value) && value.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                return true;
            }
            return false;
        }
        return true;
    };
    ;
    StoreCmp = __decorate([
        core_1.Component({
            selector: 'store-cmp',
            templateUrl: 'src/components/storeCmp.html',
        }),
        __param(0, core_1.Inject(ProductsService_1.ProductsService)), __param(1, core_1.Inject(router_1.Router))
    ], StoreCmp);
    return StoreCmp;
}());
exports.StoreCmp = StoreCmp;
var routing = router_2.RouterModule.forChild([
    { path: '', component: StoreCmp }
]);
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing],
            declarations: [StoreCmp],
        })
    ], StoreModule);
    return StoreModule;
}());
exports.StoreModule = StoreModule;
//# sourceMappingURL=StoreCmp.js.map