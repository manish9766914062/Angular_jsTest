'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
var wjcOlap = require("wijmo/wijmo.olap");
var core_1 = require("@angular/core");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    DataSvc.prototype.initDataSets = function () {
        var url = 'http://demos.componentone.com/ASPNET/c1webapi/4.0.20172.105/api/dataengine/';
        return [
            // server
            { name: 'Data Engine (100k items)', value: url + 'complex10' },
            { name: 'Data Engine (500k items)', value: url + 'complex50' },
            { name: 'Data Engine (1m items)', value: url + 'complex100' },
            { name: 'Data Source (100k items)', value: url + 'dataset10' },
            { name: 'Data Source (500k items)', value: url + 'dataset50' },
            { name: 'Data Source (1m items)', value: url + 'dataset100' },
            { name: 'SSAS (Adventure Works Cube)', value: url + 'cube' },
            // client
            { name: 'Client (100 items)', value: this.getDataSet(100) },
            { name: 'Client (50k items)', value: this.getDataSet(50000) },
            { name: 'Client (100k items)', value: this.getDataSet(100000) },
            { name: 'Client (500k items)', value: this.getDataSet(500000) },
        ];
    };
    DataSvc.prototype.initShowTotals = function () {
        return [
            { name: 'None', value: wjcOlap.ShowTotals.None },
            { name: 'Grand totals', value: wjcOlap.ShowTotals.GrandTotals },
            { name: 'Subtotals', value: wjcOlap.ShowTotals.Subtotals }
        ];
    };
    DataSvc.prototype.initChartTypes = function () {
        return [
            { name: 'Column', value: wjcOlap.PivotChartType.Column },
            { name: 'Bar', value: wjcOlap.PivotChartType.Bar },
            { name: 'Scatter', value: wjcOlap.PivotChartType.Scatter },
            { name: 'Line', value: wjcOlap.PivotChartType.Line },
            { name: 'Area', value: wjcOlap.PivotChartType.Area },
            { name: 'Pie', value: wjcOlap.PivotChartType.Pie }
        ];
    };
    DataSvc.prototype.initViewDefs = function () {
        return [
            {
                name: "Sales by Product",
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":1,\"fields\":[{\"binding\":\"Id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"Sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Product\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
            },
            {
                name: "Sales by Country",
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":1,\"fields\":[{\"binding\":\"Id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"Sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Country\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
            },
            {
                name: "Sales and Downloads by Country",
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":1,\"fields\":[{\"binding\":\"Id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"Sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Country\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\",\"Downloads\"]}}"
            },
            {
                name: "Sales Trend by Product",
                def: "{\"showZeros\":false,\"showColumnTotals\":0,\"showRowTotals\":0,\"defaultFilterType\":1,\"fields\":[{\"binding\":\"Id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"MMM yyyy\",\"isContentHtml\":false},{\"binding\":\"Sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":3,\"showAs\":2,\"descending\":false,\"format\":\"p2\",\"isContentHtml\":false},{\"binding\":\"Downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"Active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"Discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Date\"]},\"columnFields\":{\"items\":[\"Product\"]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
            }
        ];
    };
    DataSvc.prototype.initCubeFields = function () {
        return [
            {
                header: 'Product (dimension fields)', dimensionType: 0, subFields: [
                    { dataType: 1, binding: '[Product].[Product]', header: 'Product', dimensionType: 0 },
                    {
                        header: 'Stocking', dimensionType: 0, subFields: [
                            { dataType: 1, binding: '[Product].[Class]', header: 'Class', dimensionType: 0 },
                            { dataType: 1, binding: '[Product].[Color]', header: 'Color', dimensionType: 0 }
                        ]
                    }
                ]
            },
            {
                header: 'Internet Sales (measure fields)', dimensionType: 0, subFields: [
                    { dataType: 2, format: 'n0', aggregate: 1, binding: '[Measures].[Internet Sales Amount]', header: 'Internet Sales Amount', dimensionType: 1 },
                    { dataType: 2, format: 'n0', aggregate: 1, binding: '[Measures].[Internet Order Quantity]', header: 'Internet Order Quantity', dimensionType: 1 },
                    { dataType: 2, format: 'n0', aggregate: 1, binding: '[Measures].[Internet Gross Profit]', header: 'Internet Gross Profit', dimensionType: 1 }
                ]
            }
        ];
    };
    // gets a simple data set for basic demos
    DataSvc.prototype.getSimpleDataSet = function (cnt) {
        var dtOct = new Date(2015, 9, 1), dtDec = new Date(2015, 11, 1), data = [
            { product: 'Wijmo', country: 'USA', sales: 10, downloads: 100, date: dtOct, active: true },
            { product: 'Wijmo', country: 'Japan', sales: 10, downloads: 100, date: dtOct, active: false },
            { product: 'Aoba', country: 'USA', sales: 10, downloads: 100, date: dtDec, active: true },
            { product: 'Aoba', country: 'Japan', sales: 10, downloads: 100, date: dtDec, active: false }
        ];
        for (var i = 0; i < cnt - 4; i++) {
            data.push({
                product: this.randomInt(1) ? 'Wijmo' : 'Aoba',
                country: this.randomInt(1) ? 'USA' : 'Japan',
                active: i % 2 == 0,
                date: new Date(2015 + this.randomInt(2), this.randomInt(11), this.randomInt(27) + 1),
                sales: 10 + this.randomInt(10),
                downloads: 10 + this.randomInt(190)
            });
        }
        return new wjcCore.CollectionView(data);
    };
    // gets a slightly more complex data set for more advanced demos
    DataSvc.prototype.getDataSet = function (cnt) {
        var countries = 'US,Germany,UK,Japan,Italy,Greece,Spain,Portugal'.split(','), products = 'Wijmo,Aoba,Xuni,Olap'.split(','), data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                id: i,
                product: products[this.randomInt(products.length - 1)],
                country: countries[this.randomInt(countries.length - 1)],
                date: new Date(2015 + this.randomInt(2), this.randomInt(11), this.randomInt(27) + 1),
                sales: this.randomInt(10000),
                downloads: this.randomInt(10000),
                active: this.randomInt(1) ? true : false,
                discount: Math.random()
            });
        }
        return new wjcCore.CollectionView(data);
    };
    // gets a random integer between zero and max
    DataSvc.prototype.randomInt = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    DataSvc = __decorate([
        core_1.Injectable()
    ], DataSvc);
    return DataSvc;
}());
exports.DataSvc = DataSvc;
//# sourceMappingURL=DataSvc.js.map