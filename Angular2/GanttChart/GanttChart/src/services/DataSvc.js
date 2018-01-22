'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    // data used to generate random items
    DataSvc.prototype.getData = function (dataCount) {
        var data = [];
        var date = new Date();
        for (var i = 0; i < dataCount; i++) {
            var low = Math.ceil(Math.random() * 10);
            var high = 10 + Math.ceil(Math.random() * 10);
            var name_1 = 'Task' + (i + 1);
            data.push({
                name: name_1,
                start: new Date(date.getTime() + low * 3600 * 24 * 1000),
                end: new Date(date.getTime() + high * 3600 * 24 * 1000)
            });
        }
        return data;
    };
    ;
    DataSvc.prototype.getDepData = function () {
        var year = new Date().getFullYear();
        var data = [{
                name: 'Task1',
                start: new Date(year, 0, 1),
                end: new Date(year, 2, 31),
                parent: null,
                percent: 100
            }, {
                name: 'Task2',
                start: new Date(year, 3, 1),
                end: new Date(year, 3, 30),
                parent: 'Task1',
                percent: 100
            }, {
                name: 'Task3',
                start: new Date(year, 4, 1),
                end: new Date(year, 6, 31),
                parent: 'Task2',
                percent: 75
            }, {
                name: 'Task4',
                start: new Date(year, 3, 1),
                end: new Date(year, 6, 31),
                parent: 'Task1',
                percent: 33
            }, {
                name: 'Task5',
                start: new Date(year, 7, 1),
                end: new Date(year, 8, 30),
                parent: 'Task3,Task4',
                percent: 0
            }, {
                name: 'Task6',
                start: new Date(year, 9, 1),
                end: new Date(year, 11, 31),
                parent: 'Task1,Task5',
                percent: 0
            }, {
                name: 'Task7',
                start: new Date(year, 0, 1),
                end: new Date(year, 11, 31),
                parent: null,
                percent: 50
            }];
        return data;
    };
    ;
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map