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
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var groupManager_1 = require("./groupManager");
var sortManager_1 = require("./sortManager");
var ManagerSvc_1 = require("./services/ManagerSvc");
var SortDialogComboCmp_1 = require("./components/SortDialogComboCmp");
var SortDialogFlexCmp_1 = require("./components/SortDialogFlexCmp");
var GroupDialogComboCmp_1 = require("./components/GroupDialogComboCmp");
var GroupDialogFlexCmp_1 = require("./components/GroupDialogFlexCmp");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp(managerSvc) {
        this.properties = 'country,color,product,active'.split(',');
        this.countries = 'US,Germany,UK,Japan,Italy,Greece,Spain,Canada,Australia,China,Austria'.split(',');
        this.products = 'Widget,Gadget,Doohickey'.split(',');
        this.colors = 'Black,White,Red,Green,Blue'.split(',');
        this.view = new wjcCore.CollectionView(this.getData(100));
        this.sortManager = new sortManager_1.SortManager();
        this.groupManager = new groupManager_1.GroupManager();
        managerSvc.groupManager = this.groupManager;
        managerSvc.sortManager = this.sortManager;
    }
    // some random data
    AppCmp.prototype.getData = function (count) {
        var data = [], countries = this.countries, products = this.products, colors = this.colors, dt = new Date();
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                date: new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                country: countries[Math.floor(Math.random() * countries.length)],
                product: products[Math.floor(Math.random() * products.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                amount: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0,
            });
        }
        return data;
    };
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app-cmp',
            templateUrl: 'src/app.html'
        }),
        __param(0, core_1.Inject(ManagerSvc_1.ManagerSvc))
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [SortDialogComboCmp_1.SortDialogComboCmp, SortDialogFlexCmp_1.SortDialogFlexCmp, GroupDialogComboCmp_1.GroupDialogComboCmp, GroupDialogFlexCmp_1.GroupDialogFlexCmp, AppCmp],
            providers: [ManagerSvc_1.ManagerSvc],
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