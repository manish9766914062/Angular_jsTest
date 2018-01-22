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
var DataSvc_1 = require("../services/DataSvc");
var ExportSvc_1 = require("../services/ExportSvc");
//EventAnnotations sample component
var OrderBaseCmp = /** @class */ (function () {
    function OrderBaseCmp(dataSvc, exportSvc) {
        var _this = this;
        this.pageIndex = -1;
        this.pageCount = -1;
        this.dataSvc = dataSvc;
        this.exportSvc = exportSvc;
        this.fields = dataSvc.fields;
        dataSvc.fieldsChanged = function () {
            _this.fields = dataSvc.fields;
        };
    }
    OrderBaseCmp.prototype.ngAfterViewInit = function () {
        if (this.multiRow) {
            this.getLayoutDef();
        }
    };
    Object.defineProperty(OrderBaseCmp.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (value) {
            if (this._fields != value) {
                this._fields = value;
                if (this.multiRow) {
                    this.getLayoutDef();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    OrderBaseCmp.prototype.moveToFirstPage = function () {
        this.data.moveToFirstPage();
    };
    OrderBaseCmp.prototype.moveToLastPage = function () {
        this.data.moveToLastPage();
    };
    OrderBaseCmp.prototype.moveToPreviousPage = function () {
        this.data.moveToPreviousPage();
    };
    OrderBaseCmp.prototype.moveToNextPage = function () {
        this.data.moveToNextPage();
    };
    OrderBaseCmp.prototype.exportToExcel = function () {
        this.exportSvc.exportXlsx(this.multiRow, this.exportFileName + '.xlsx');
    };
    OrderBaseCmp.prototype.exportToPDF = function () {
        var isJapanese = this.exportSvc.culture === 'ja';
        this.exportSvc.exportPdf(this.multiRow, this.exportFileName + '.pdf', isJapanese, null);
    };
    OrderBaseCmp.prototype.getLayoutDef = function () {
        var _this = this;
        if (this.fields) {
            this.multiRow.layoutDefinition = this.generateLayoutDef();
        }
        else {
            clearTimeout(this.getLayoutDefTimer);
            this.getLayoutDefTimer = null;
            this.getLayoutDefTimer = setTimeout(function () {
                _this.getLayoutDef();
            }, 100);
        }
    };
    // Generate the layout definition for the MultiRow control.
    OrderBaseCmp.prototype.generateLayoutDef = function () {
        return [];
    };
    __decorate([
        core_1.ViewChild('multiRow')
    ], OrderBaseCmp.prototype, "multiRow", void 0);
    OrderBaseCmp = __decorate([
        core_1.Component({
            selector: '',
            templateUrl: ''
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc)), __param(1, core_1.Inject(ExportSvc_1.ExportSvc))
    ], OrderBaseCmp);
    return OrderBaseCmp;
}());
exports.OrderBaseCmp = OrderBaseCmp;
//# sourceMappingURL=OrderBaseCmp.js.map