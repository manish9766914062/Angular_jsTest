'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var GridBaseCmp_1 = require("./GridBaseCmp");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var appPipes_1 = require("../../pipes/appPipes");
var DataSvc_1 = require("../../services/DataSvc");
// FlexGrid Introduction sample component.
var GridIntroCmp = /** @class */ (function (_super) {
    __extends(GridIntroCmp, _super);
    function GridIntroCmp(dataSvc) {
        return _super.call(this, dataSvc) || this;
    }
    GridIntroCmp = __decorate([
        core_1.Component({
            selector: 'grid-intro-cmp',
            templateUrl: 'src/components/grid/gridIntroCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], GridIntroCmp);
    return GridIntroCmp;
}(GridBaseCmp_1.GridBaseCmp));
exports.GridIntroCmp = GridIntroCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: GridIntroCmp }
]);
var GridIntroModule = /** @class */ (function () {
    function GridIntroModule() {
    }
    GridIntroModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, forms_1.FormsModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_input_1.WjInputModule, appPipes_1.AppPipesModule],
            declarations: [GridIntroCmp],
        })
    ], GridIntroModule);
    return GridIntroModule;
}());
exports.GridIntroModule = GridIntroModule;
//# sourceMappingURL=GridIntroCmp.js.map