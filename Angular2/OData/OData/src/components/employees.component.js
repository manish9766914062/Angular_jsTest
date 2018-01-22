"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wjOData = require("wijmo/wijmo.odata");
var wjGrid = require("wijmo/wijmo.grid");
var serviceUrl = 'MyNorthWind';
var EmployeesCmp = /** @class */ (function () {
    function EmployeesCmp() {
        var _this = this;
        // get employees detail
        this.cvEmp = new wjOData.ODataCollectionView(serviceUrl, 'Employees', {
            keys: ['Employee_ID'],
            loaded: function (s, e) {
                if (!_this.mapEmp) {
                    _this.mapEmp = new wjGrid.DataMap(s.sourceCollection, 'Employee_ID', 'Last_Name');
                }
            },
            newItemCreator: function () {
                return {
                    First_Name: '',
                    Last_Name: ''
                };
            }
        });
    }
    EmployeesCmp = __decorate([
        core_1.Component({
            selector: 'employees',
            templateUrl: './src/components/employees.component.html'
        })
    ], EmployeesCmp);
    return EmployeesCmp;
}());
exports.EmployeesCmp = EmployeesCmp;
//# sourceMappingURL=employees.component.js.map