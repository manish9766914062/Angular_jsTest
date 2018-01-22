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
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_grid_grouppanel_1 = require("wijmo/wijmo.angular2.grid.grouppanel");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this._url = 'http://services.odata.org/V4/Northwind/Northwind.svc';
        this.products = new wjcOdata.ODataCollectionView(this._url, 'Products', {
            sortOnServer: false,
            filterOnServer: false,
            loaded: function (s, e) {
            }
        });
    }
    // initialize grid's sticky toolbar
    AppCmp.prototype.init = function (s) {
        // move header element into grid layout
        var host = s.hostElement, hdr = document.querySelector('.grid-header');
        hdr.style.position = 'relative';
        hdr.style.zIndex = '10';
        host.insertBefore(hdr, host.children[0]);
        // adjust root element height to make room for the header
        var root = s.cells.hostElement.parentElement;
        s.updatingLayout.addHandler(function () {
            root.style.minHeight = '200px';
            root.style.height = 'calc(100% - ' + hdr.offsetHeight + 'px)';
        });
        // update header's stickiness (TFS 300181)
        s.updatedLayout.addHandler(function () {
            var sticky = s.columnHeaders.hostElement.parentElement, stickyClass = 'wj-state-sticky';
            hdr.style.top = sticky.style.top;
            root.parentElement.scrollTop = 0;
            wjcCore.toggleClass(hdr, stickyClass, wjcCore.hasClass(sticky, stickyClass));
        });
    };
    // toggle filter, group panel
    AppCmp.prototype.toggleFilter = function (filter) {
        filter.showFilterIcons = !filter.showFilterIcons;
    };
    AppCmp.prototype.toggleGroupPanel = function (theGroupPanel, theGrid) {
        var style = theGroupPanel.hostElement.style;
        style.display = (style.display == 'none' ? '' : 'none');
        theGrid.invalidate(); // force layout update
        // wijmo.Control.invalidateAll(); also works, but less efficient...
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
            imports: [wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, wijmo_angular2_grid_grouppanel_1.WjGridGrouppanelModule, platform_browser_1.BrowserModule, forms_1.FormsModule],
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