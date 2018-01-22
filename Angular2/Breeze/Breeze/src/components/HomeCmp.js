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
var DataSvc_1 = require("../services/DataSvc");
var HomeCmp = /** @class */ (function () {
    function HomeCmp(dataSvc) {
    }
    HomeCmp = __decorate([
        core_1.Component({
            selector: 'home-cmp',
            templateUrl: 'src/components/homeCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], HomeCmp);
    return HomeCmp;
}());
exports.HomeCmp = HomeCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: HomeCmp }
]);
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing],
            declarations: [HomeCmp],
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=HomeCmp.js.map