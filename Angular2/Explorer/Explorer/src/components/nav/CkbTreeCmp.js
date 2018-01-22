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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var TreeViewBaseCmp_1 = require("./TreeViewBaseCmp");
var wijmo_angular2_nav_1 = require("wijmo/wijmo.angular2.nav");
// Intro sample component.
var CkbTreeCmp = /** @class */ (function (_super) {
    __extends(CkbTreeCmp, _super);
    function CkbTreeCmp() {
        return _super.call(this) || this;
    }
    CkbTreeCmp = __decorate([
        core_1.Component({
            selector: 'ckb-tree-cmp',
            templateUrl: 'src/components/nav/ckbTreeCmp.html'
        })
    ], CkbTreeCmp);
    return CkbTreeCmp;
}(TreeViewBaseCmp_1.TreeViewBaseCmp));
exports.CkbTreeCmp = CkbTreeCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: CkbTreeCmp }
]);
var CkbTreeModule = /** @class */ (function () {
    function CkbTreeModule() {
    }
    CkbTreeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, forms_1.FormsModule, wijmo_angular2_nav_1.WjNavModule],
            declarations: [CkbTreeCmp],
        })
    ], CkbTreeModule);
    return CkbTreeModule;
}());
exports.CkbTreeModule = CkbTreeModule;
//# sourceMappingURL=CkbTreeCmp.js.map