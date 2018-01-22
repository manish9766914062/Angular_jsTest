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
var core_2 = require("@angular/core");
var ManagerSvc_1 = require("../services/ManagerSvc");
var SortDialogFlexCmp = /** @class */ (function () {
    function SortDialogFlexCmp(managerSvc) {
        this.sortManager = managerSvc.sortManager;
    }
    SortDialogFlexCmp = __decorate([
        core_1.Component({
            selector: 'sort-dialog-flex-cmp',
            templateUrl: 'src/components/sortDialogFlexCmp.html'
        }),
        __param(0, core_2.Inject(ManagerSvc_1.ManagerSvc))
    ], SortDialogFlexCmp);
    return SortDialogFlexCmp;
}());
exports.SortDialogFlexCmp = SortDialogFlexCmp;
//# sourceMappingURL=SortDialogFlexCmp.js.map