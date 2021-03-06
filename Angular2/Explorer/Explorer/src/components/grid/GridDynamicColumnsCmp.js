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
var GridBaseCmp_1 = require("./GridBaseCmp");
var DataSvc_1 = require("../../services/DataSvc");
var router_1 = require("@angular/router");
var wijmo_angular2_core_1 = require("wijmo/wijmo.angular2.core");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
// FlexGrid Dynamic Columns sample component.
var GridDynamicColumnsCmp = /** @class */ (function (_super) {
    __extends(GridDynamicColumnsCmp, _super);
    function GridDynamicColumnsCmp(dataSvc) {
        var _this = _super.call(this, dataSvc) || this;
        _this.columns = [
            { header: 'ID', binding: 'id', width: 80 },
            { header: 'Date', binding: 'start' },
            { header: 'Product', binding: 'product' },
            { header: 'Revenue', binding: 'amount', format: 'n0' },
            { header: 'Expense', binding: 'amount2', format: 'n0' },
            {
                header: 'Expense (with template)', binding: 'amount2', width: 180, cellTemplate: ExpenceCellCmp,
                cellEditTemplate: ExpenceCellEditCmp
            },
            { header: 'Discount', binding: 'discount', format: 'p0' }
        ];
        return _this;
    }
    GridDynamicColumnsCmp = __decorate([
        core_1.Component({
            selector: 'grid-dynamic-columns-cmp',
            templateUrl: 'src/components/grid/gridDynamicColumnsCmp.html',
            entryComponents: [core_1.forwardRef(function () { return ExpenceCellCmp; }), core_1.forwardRef(function () { return ExpenceCellEditCmp; })]
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], GridDynamicColumnsCmp);
    return GridDynamicColumnsCmp;
}(GridBaseCmp_1.GridBaseCmp));
exports.GridDynamicColumnsCmp = GridDynamicColumnsCmp;
var ExpenceCellCmp = /** @class */ (function () {
    function ExpenceCellCmp() {
    }
    ExpenceCellCmp = __decorate([
        core_1.Component({
            selector: 'expence-cell-cmp',
            template: "\n        <div [ngStyle]=\"{color: item.amount2 > 2000 ? 'red' : 'green'}\">\n            {{item.amount2 | currency:'USD':true}}\n            <span [ngSwitch]=\"item.amount2 > 2000\">\n              <span *ngSwitchCase=\"true\">&#9650;</span>\n              <span *ngSwitchDefault>&#9660;</span>\n            </span>\n        </div>\n        ",
        })
    ], ExpenceCellCmp);
    return ExpenceCellCmp;
}());
exports.ExpenceCellCmp = ExpenceCellCmp;
var ExpenceCellEditCmp = /** @class */ (function () {
    function ExpenceCellEditCmp() {
    }
    ExpenceCellEditCmp = __decorate([
        core_1.Component({
            selector: 'expence-cell-edit-cmp',
            template: "\n        <wj-input-number [(value)]=\"cell.value\" [isRequired]=\"false\" [step]=\"1\">\n        </wj-input-number>                        \n        "
            //directives: [wjNg2Input.WjInputNumber]
        })
    ], ExpenceCellEditCmp);
    return ExpenceCellEditCmp;
}());
exports.ExpenceCellEditCmp = ExpenceCellEditCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: GridDynamicColumnsCmp }
]);
var GridDynamicColumnsModule = /** @class */ (function () {
    function GridDynamicColumnsModule() {
    }
    GridDynamicColumnsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_core_1.WjCoreModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_input_1.WjInputModule],
            declarations: [GridDynamicColumnsCmp, ExpenceCellEditCmp, ExpenceCellCmp],
        })
    ], GridDynamicColumnsModule);
    return GridDynamicColumnsModule;
}());
exports.GridDynamicColumnsModule = GridDynamicColumnsModule;
//# sourceMappingURL=GridDynamicColumnsCmp.js.map