"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcOlap = require("wijmo/wijmo.olap");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_olap_1 = require("wijmo/wijmo.angular2.olap");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
'use strict';
// The Explorer application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        // create and initialize pivot engine used by all controls on the page
        var ng = new wjcOlap.PivotEngine();
        this.theEngine = ng;
        // give the engine a data source and some fields
        ng.autoGenerateFields = false;
        ng.itemsSource = this.getData(20000);
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.name', 'Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.first', 'First Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'person.last', 'Last Name'));
        ng.fields.push(new wjcOlap.PivotField(ng, 'timeInHours', 'Time (hrs)', { format: 'n3', dataType: wjcCore.DataType.Number, aggregate: 'Sum' }));
        ng.fields.push(new wjcOlap.PivotField(ng, 'bug.fogbugzId', 'Fogbugz #', { format: 'f0', dataType: wjcCore.DataType.Number }));
        ng.fields.push(new wjcOlap.PivotField(ng, 'bug.severity', 'Severity', { format: 'f0', dataType: wjcCore.DataType.Number }));
        // build the initial view
        ng.rowFields.push('Last Name');
        ng.columnFields.push('Severity');
        ng.valueFields.push('Time (hrs)');
    }
    AppCmp.prototype.refresh = function () {
        var _this = this;
        window.setTimeout(function () {
            _this.pivotPnl.refresh();
        }, 200);
    };
    // sample data
    AppCmp.prototype.getData = function (cnt) {
        var data = [];
        for (var i = 0; i < cnt; i++) {
            var minutes = Math.round(Math.random() * 160);
            var firstNames = 'Liam,Dylan,Jacob,Noah,Jayden,Ethan,Matthew,Sebastian,Alexander,Daniel,Angel'.split(',');
            var lastNames = 'Smith,Lam,Martin,Brown,Roy,Tremblay,Lee,Gagnon,Wilson,Navin'.split(',');
            data.push({
                id: i,
                person: this.getPerson(i, firstNames, lastNames),
                bug: this.getBug(i),
                timeInMinutes: minutes,
                timeInHours: minutes / 60,
            });
        }
        return data;
    };
    AppCmp.prototype.getPerson = function (i, firstNames, lastNames) {
        var first = firstNames[i % firstNames.length];
        var last = lastNames[i % lastNames.length];
        return {
            id: i,
            name: first + ' ' + last,
            first: first,
            last: last,
            email: first[0] + last + '@componentone.com',
            value: Math.random() * 400
        };
    };
    AppCmp.prototype.getBug = function (i) {
        return {
            id: i,
            fogbugzId: Math.round(100000 + Math.random() * 200000),
            severity: i % 4 == 0 ? 'High' : i % 4 == 1 ? 'Average' : 'Low'
        };
    };
    __decorate([
        core_1.ViewChild('pivotPnl')
    ], AppCmp.prototype, "pivotPnl", void 0);
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        })
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_olap_1.WjOlapModule, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [AppCmp],
            providers: [],
            bootstrap: [AppCmp]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
// Bootstrap application with hash style navigation and global services.
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.js.map