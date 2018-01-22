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
'use strict';
// The application root component.
var AppSorter = /** @class */ (function () {
    function AppSorter(elRef) {
        var _this = this;
        this.elRef = elRef;
        var e = elRef.nativeElement;
        // make cursor a hand
        var p = e.parentElement;
        p.style.cursor = 'pointer';
        // change sort on click
        p.addEventListener('click', function (args) {
            if (_this.view) {
                _this.applySort(args);
            }
        });
    }
    AppSorter.prototype.ngAfterViewInit = function () {
        var _this = this;
        // save header to update on clicks
        if (!this.header) {
            this.header = this.elRef.nativeElement.textContent;
        }
        // show sort indicator
        this.updateSortIndicator(this.elRef.nativeElement);
        if (this.view) {
            this.view.collectionChanged.addHandler(function () {
                _this.updateSortIndicator(_this.elRef.nativeElement);
            });
        }
    };
    // update element content to show whether is the sorted column
    AppSorter.prototype.updateSortIndicator = function (element) {
        if (this.view) {
            var sd = this.view.sortDescriptions, sortIndicator = '';
            if (sd.length > 0 && sd[0].property == this.binding) {
                sortIndicator = sd[0].ascending ? ' ▲' : ' ▼';
            }
            element.innerText = this.header + sortIndicator;
        }
    };
    ;
    // apply/change/remove sort on this column
    AppSorter.prototype.applySort = function (args) {
        if (this.view) {
            var sd = this.view.sortDescriptions;
            if (args.ctrlKey) {
                sd.clear();
            }
            else {
                var ascending = true;
                if (sd.length > 0 && sd[0].property == this.binding) {
                    ascending = !sd[0].ascending;
                }
                var sdNew = new wjcCore.SortDescription(this.binding, ascending);
                sd.splice(0, sd.length, sdNew);
            }
        }
    };
    ;
    __decorate([
        core_1.Input()
    ], AppSorter.prototype, "view", void 0);
    __decorate([
        core_1.Input()
    ], AppSorter.prototype, "binding", void 0);
    __decorate([
        core_1.Input()
    ], AppSorter.prototype, "header", void 0);
    AppSorter = __decorate([
        core_1.Component({
            selector: 'app-sorter',
            template: '<span><ng-content></ng-content></span>'
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], AppSorter);
    return AppSorter;
}());
exports.AppSorter = AppSorter;
//# sourceMappingURL=AppSorter.js.map