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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var wijmo_angular2_grid_sheet_1 = require("wijmo/wijmo.angular2.grid.sheet");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var DataSvc_1 = require("../services/DataSvc");
var TableCmp = /** @class */ (function () {
    function TableCmp(dataSvc) {
        this.selectedTable = null;
        this.tableStyleNames = null;
        this.dataSvc = dataSvc;
    }
    TableCmp.prototype.flexSheetInit = function (flexSheet) {
        var tableStyle, table, i, self = this;
        self.tableStyleNames = [];
        for (i = 1; i <= 21; i++) {
            self.tableStyleNames.push('TableStyleLight' + i);
        }
        for (i = 1; i <= 28; i++) {
            self.tableStyleNames.push('TableStyleMedium' + i);
        }
        for (i = 1; i <= 11; i++) {
            self.tableStyleNames.push('TableStyleDark' + i);
        }
        tableStyle = flexSheet.getBuiltInTableStyle('TableStyleDark9');
        table = flexSheet.addTableFromDataSource(2, 1, self.dataSvc.getTableData(10), 'Table1', tableStyle, { showTotalRow: true });
        flexSheet.selectionChanged.addHandler(function (sender, args) {
            var selection = args.range;
            if (selection.isValid) {
                self._getSelectedTable(selection, flexSheet);
            }
            else {
                self.selectedTable = null;
            }
        });
        flexSheet.updatedLayout.addHandler(function () {
            if (flexSheet.selection && flexSheet.selection.isValid) {
                self._getSelectedTable(flexSheet.selection, flexSheet);
            }
            else {
                self.selectedTable = null;
            }
        });
    };
    TableCmp.prototype.cboTableStylesInit = function (cboTableStyles) {
        var self = this;
        if (cboTableStyles) {
            cboTableStyles.selectedIndexChanged.addHandler(function () {
                // apply the table style for the selected table
                if (self.selectedTable) {
                    var tableStyle = self.flexSheet.getBuiltInTableStyle(cboTableStyles.selectedValue);
                    self.selectedTable.style = tableStyle;
                }
            });
            if (self.selectedTable) {
                cboTableStyles.selectedValue = self.selectedTable.style.name;
            }
        }
    };
    // Get selected table in FlexSheet.
    TableCmp.prototype._getSelectedTable = function (selection, flexSheet) {
        this.selectedTable = flexSheet.selectedSheet.findTable(selection.row, selection.col);
        if (this.selectedTable && this.cboTableStyles) {
            var tableStyle = flexSheet.getBuiltInTableStyle(this.selectedTable.style.name);
            if (tableStyle) {
                this.cboTableStyles.selectedValue = tableStyle.name;
            }
        }
    };
    __decorate([
        core_1.ViewChild('flexSheet')
    ], TableCmp.prototype, "flexSheet", void 0);
    __decorate([
        core_1.ViewChild('cboTableStyles')
    ], TableCmp.prototype, "cboTableStyles", void 0);
    TableCmp = __decorate([
        core_1.Component({
            selector: 'table-cmp',
            templateUrl: 'src/components/tableCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], TableCmp);
    return TableCmp;
}());
exports.TableCmp = TableCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: TableCmp }
]);
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, routing, wijmo_angular2_grid_sheet_1.WjGridSheetModule, wijmo_angular2_input_1.WjInputModule],
            declarations: [TableCmp],
        })
    ], TableModule);
    return TableModule;
}());
exports.TableModule = TableModule;
//# sourceMappingURL=TableCmp.js.map