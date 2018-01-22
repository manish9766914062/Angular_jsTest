"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcOdata = require("wijmo/wijmo.odata");
// Angular
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        var _this = this;
        this.services = new wjcCore.CollectionView([
            { name: 'Northwind', url: 'http://services.odata.org/Northwind/Northwind.svc' },
            { name: 'OData Test', url: 'http://services.odata.org/V3/OData/OData.svc' }
        ]);
        this.entities = new wjcCore.CollectionView();
        // load entity list for the selected service
        this.loadEntityList();
        this.loadEntityData();
        this.services.currentChanged.addHandler(function () {
            _this.loadEntityList();
        });
        this.entities.currentChanged.addHandler(function () {
            _this.loadEntityData();
        });
        this.entities.collectionChanged.addHandler(function () {
            _this.loadEntityData();
        });
    }
    AppCmp.prototype.loadEntityList = function () {
        var _this = this;
        var url = this.services.currentItem.url, entityList = new wjcOdata.ODataCollectionView(url, // service
        null, // null to get entity list
        {
            loaded: function (sender, e) {
                _this.entities.sourceCollection = sender.items;
            }
        });
    };
    AppCmp.prototype.loadEntityData = function () {
        var svc = this.services.currentItem, // current service
        ent = this.entities.currentItem; // current entity
        if (svc && ent) {
            this.data = new wjcOdata.ODataCollectionView(svc.url, // service url
            ent.name, // entity name
            {
                pageSize: this.data ? this.data.pageSize : 0,
                loaded: function () {
                },
                error: function (sender, e) {
                    var msg = e.request.response.match(/"internalexception":{"message":"(.*?)"/);
                    if (msg) {
                        console.error(msg[1]);
                        e.cancel = true;
                    }
                }
            });
        }
    };
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
            imports: [wijmo_angular2_input_1.WjInputModule, wijmo_angular2_grid_1.WjGridModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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