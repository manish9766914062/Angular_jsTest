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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var BreezeInput_1 = require("./BreezeInput");
var DataSvc_1 = require("../services/DataSvc");
var BreezeCollectionView_1 = require("../BreezeCollectionView");
var CustomersCmp = /** @class */ (function () {
    function CustomersCmp(dataSvc) {
        var _this = this;
        this.dataSvc = dataSvc;
        //this.dataSvc.init();
        this.customers = new BreezeCollectionView_1.BreezeCollectionView(dataSvc.getManager(), dataSvc.getEntityQuery("Customers"), true, true, true);
        this.customers.currentChanged.addHandler(function () {
            _this.customer = _this.customers.currentItem;
        });
        this.customers.collectionChanged.addHandler(function () {
            _this.customer = _this.customers.currentItem;
        });
        this.customers.querySucceeded.addHandler(function (sender, e) {
            if (_this.numberInput) {
                _this.numberInput.max = _this.customers.pageCount;
            }
            _this.dataSvc.querySucceeded(e.data);
        });
        this.customers.queryFailed.addHandler(function (sender, e) {
            _this.dataSvc.queryFailed(e.data.message);
        });
        this.customers.saveSucceeded.addHandler(function (sender, e) {
            _this.dataSvc.saveSucceeded(e.data);
        });
        this.customers.saveFailed.addHandler(function (sender, e) {
            _this.dataSvc.saveFailed(e.data);
        });
    }
    Object.defineProperty(CustomersCmp.prototype, "filterText", {
        get: function () {
            return this._filterText;
        },
        set: function (value) {
            if (value !== this._filterText) {
                this._filterText = value;
                this.customers.filterPredicate = this.dataSvc.getCompanyNamePredicate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    CustomersCmp.prototype.update = function (customer) {
        this.customers.editItem(customer);
        this.customers.commitEdit();
    };
    ;
    CustomersCmp.prototype.reset = function (customer) {
        this.customer.entityAspect.rejectChanges();
        this.customers.cancelEdit();
    };
    CustomersCmp = __decorate([
        core_1.Component({
            selector: 'customers-cmp',
            templateUrl: 'src/components/customersCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], CustomersCmp);
    return CustomersCmp;
}());
exports.CustomersCmp = CustomersCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: CustomersCmp }
]);
var CustomersModule = /** @class */ (function () {
    function CustomersModule() {
    }
    CustomersModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, BreezeInput_1.BreezeInputModule, forms_1.FormsModule, routing],
            providers: [DataSvc_1.DataSvc],
            declarations: [CustomersCmp],
        })
    ], CustomersModule);
    return CustomersModule;
}());
exports.CustomersModule = CustomersModule;
//# sourceMappingURL=CustomersCmp.js.map