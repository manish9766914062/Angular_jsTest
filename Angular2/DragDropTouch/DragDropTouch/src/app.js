"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
// Angular
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var wijmo_angular2_olap_1 = require("wijmo/wijmo.angular2.olap");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_grid_filter_1 = require("wijmo/wijmo.angular2.grid.filter");
var wijmo_angular2_grid_grouppanel_1 = require("wijmo/wijmo.angular2.grid.grouppanel");
'use strict';
// The application root component.
var AppCmp = /** @class */ (function () {
    function AppCmp() {
        this.data = this._getData();
    }
    AppCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._cols = document.querySelectorAll('#columns .column');
        for (var i = 0; i < this._cols.length; i++) {
            var col = this._cols[i];
            col.addEventListener('dragstart', function (e) { _this._handleDragStart(e); }, false);
            col.addEventListener('dragenter', function (e) { _this._handleDragEnter(e); }, false);
            col.addEventListener('dragover', function (e) { _this._handleDragOver(e); }, false);
            col.addEventListener('dragleave', function (e) { _this._handleDragLeave(e); }, false);
            col.addEventListener('drop', function (e) { _this._handleDrop(e); }, false);
            col.addEventListener('dragend', function (e) { _this._handleDragEnd(e); }, false);
        }
    };
    AppCmp.prototype._handleDragStart = function (e) {
        if (wjcCore.hasClass(e.target, 'column')) {
            this._dragSrcEl = e.target;
            this._dragSrcEl.style.opacity = '0.4';
            var dt = e.dataTransfer;
            dt.effectAllowed = 'move';
            dt.setData('text', this._dragSrcEl.innerHTML);
            // customize drag image for one of the panels
            if (dt.setDragImage instanceof Function && e.target.innerHTML.indexOf('X') > -1) {
                var img = new Image();
                img.src = 'resources/dragimage.jpg';
                dt.setDragImage(img, img.width / 2, img.height / 2);
            }
        }
    };
    AppCmp.prototype._handleDragOver = function (e) {
        if (this._dragSrcEl) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    };
    AppCmp.prototype._handleDragEnter = function (e) {
        if (this._dragSrcEl) {
            e.target.classList.add('over');
        }
    };
    AppCmp.prototype._handleDragLeave = function (e) {
        if (this._dragSrcEl) {
            e.target.classList.remove('over');
        }
    };
    AppCmp.prototype._handleDragEnd = function (e) {
        this._dragSrcEl = null;
        [].forEach.call(this._cols, function (col) {
            col.style.opacity = '';
            col.classList.remove('over');
        });
    };
    AppCmp.prototype._handleDrop = function (e) {
        if (this._dragSrcEl) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            if (this._dragSrcEl != e.target) {
                this._dragSrcEl.innerHTML = e.target.innerHTML;
                e.target.innerHTML = e.dataTransfer.getData('text');
            }
        }
    };
    AppCmp.prototype._getData = function () {
        var products = 'Alpina,Gumpert,Isdera,Keinath,Adler,Borgward'.split(','), countries = 'USA,UK,Japan,Germany'.split(','), data = [];
        for (var i = 0; i < 100; i++) {
            data.push({
                id: i,
                product: products[i % products.length],
                country: countries[i % countries.length],
                sales: Math.round(20 + Math.random() * 100),
                inquiries: Math.round(100 + Math.random() * 1000)
            });
        }
        return data;
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
            imports: [wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_olap_1.WjOlapModule, wijmo_angular2_grid_filter_1.WjGridFilterModule, wijmo_angular2_grid_grouppanel_1.WjGridGrouppanelModule, platform_browser_1.BrowserModule],
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