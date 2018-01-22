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
var wjcGridPdf = require("wijmo/wijmo.grid.pdf");
var wjcPdf = require("wijmo/wijmo.pdf");
var wjcCore = require("wijmo/wijmo");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var DataSvc_1 = require("../../services/DataSvc");
var wijmo_angular2_grid_1 = require("wijmo/wijmo.angular2.grid");
var wijmo_angular2_input_1 = require("wijmo/wijmo.angular2.input");
var ExportToFileCmp = /** @class */ (function () {
    function ExportToFileCmp(dataSvc) {
        // Reference enumerations to use them in markup.
        this.ExportModeEnum = wjcGridPdf.ExportMode;
        this.PdfPageOrientationEnum = wjcPdf.PdfPageOrientation;
        this.ScaleModeEnum = wjcGridPdf.ScaleMode;
        this.exportMode = wjcGridPdf.ExportMode.All;
        this.orientation = wjcPdf.PdfPageOrientation.Portrait;
        this.scaleMode = wjcGridPdf.ScaleMode.ActualSize;
        this.data = dataSvc.getData(25);
    }
    ExportToFileCmp.prototype.export = function () {
        wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
            maxPages: 10,
            exportMode: this.exportMode,
            scaleMode: this.scaleMode,
            documentOptions: {
                pageSettings: {
                    layout: this.orientation
                },
                header: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                footer: {
                    declarative: {
                        text: '\t&[Page]\\&[Pages]'
                    }
                },
                info: {
                    author: 'C1',
                    title: 'PdfDocument sample',
                    keywords: 'PDF, C1, sample',
                    subject: 'PdfDocument'
                }
            },
            styles: {
                cellStyle: {
                    backgroundColor: '#ffffff',
                    borderColor: '#c6c6c6'
                },
                altCellStyle: {
                    backgroundColor: '#f9f9f9'
                },
                groupCellStyle: {
                    backgroundColor: '#dddddd'
                },
                headerCellStyle: {
                    backgroundColor: '#eaeaea'
                }
            }
        });
    };
    ExportToFileCmp.prototype.ngAfterViewInit = function () {
        if (this.flexGrid) {
            this._applyGroupBy();
        }
    };
    ExportToFileCmp.prototype._applyGroupBy = function () {
        var groupNames = ['Product', 'Country', 'Amount'], 
        // get the collection view
        cv = this.flexGrid.collectionView;
        // start update
        cv.beginUpdate();
        // clear existing groups
        cv.groupDescriptions.clear();
        // add new groups
        for (var i = 0; i < groupNames.length; i++) {
            var propName = groupNames[i].toLowerCase(), groupDesc;
            if (propName == 'amount') {
                // group amounts in ranges
                // (could use the mapping function to group countries into continents, 
                // names into initials, etc)
                groupDesc = new wjcCore.PropertyGroupDescription(propName, function (item, prop) {
                    var value = item[prop];
                    if (value > 1000)
                        return 'Large Amounts';
                    if (value > 100)
                        return 'Medium Amounts';
                    if (value > 0)
                        return 'Small Amounts';
                    return 'Negative';
                });
                cv.groupDescriptions.push(groupDesc);
            }
            else if (propName) {
                // group other properties by their specific values
                groupDesc = new wjcCore.PropertyGroupDescription(propName);
                cv.groupDescriptions.push(groupDesc);
            }
        }
        // done updating
        cv.endUpdate();
    };
    __decorate([
        core_1.ViewChild('flexGrid')
    ], ExportToFileCmp.prototype, "flexGrid", void 0);
    ExportToFileCmp = __decorate([
        core_1.Component({
            selector: 'gridconverter-export-to-file-cmp',
            templateUrl: 'src/components/gridconverter/exportToFileCmp.html'
        }),
        __param(0, core_1.Inject(DataSvc_1.DataSvc))
    ], ExportToFileCmp);
    return ExportToFileCmp;
}());
exports.ExportToFileCmp = ExportToFileCmp;
var routing = router_1.RouterModule.forChild([
    { path: '', component: ExportToFileCmp }
]);
var ExportToFileModule = /** @class */ (function () {
    function ExportToFileModule() {
    }
    ExportToFileModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, routing, wijmo_angular2_grid_1.WjGridModule, wijmo_angular2_input_1.WjInputModule],
            declarations: [ExportToFileCmp]
        })
    ], ExportToFileModule);
    return ExportToFileModule;
}());
exports.ExportToFileModule = ExportToFileModule;
//# sourceMappingURL=ExportToFileCmp.js.map