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
var wjcOData = require("wijmo/wijmo.odata");
var core_1 = require("@angular/core");
// Common data service
var DataSvc = /** @class */ (function () {
    function DataSvc() {
    }
    DataSvc.prototype.initDataSets = function () {
        return [
            { name: 'Simple (1,000 items)', value: this.getSimpleDataSet(1000) },
            { name: 'Simple (10,000 items)', value: this.getSimpleDataSet(10000) },
            { name: 'Complex (100 items)', value: this.getDataSet(100) },
            { name: 'Complex (50,000 items)', value: this.getDataSet(50000) },
            { name: 'Complex (100,000 items)', value: this.getDataSet(100000) },
            { name: 'Northwind Orders (read-only)', value: this.getNorthwindOrders() },
            { name: 'Northwind Sales (read-only)', value: this.getNorthwindSales() }
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
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":3,\"fields\":[{\"binding\":\"id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Product\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
            },
            {
                name: "Sales by Country",
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":3,\"fields\":[{\"binding\":\"id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Country\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
            },
            {
                name: "Sales and Downloads by Country",
                def: "{\"showZeros\":false,\"showColumnTotals\":2,\"showRowTotals\":2,\"defaultFilterType\":3,\"fields\":[{\"binding\":\"id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"d\",\"isContentHtml\":false},{\"binding\":\"sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Country\"]},\"columnFields\":{\"items\":[]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\",\"Downloads\"]}}"
            },
            {
                name: "Sales Trend by Product",
                def: "{\"showZeros\":false,\"showColumnTotals\":0,\"showRowTotals\":0,\"defaultFilterType\":3,\"fields\":[{\"binding\":\"id\",\"header\":\"Id\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"product\",\"header\":\"Product\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"country\",\"header\":\"Country\",\"dataType\":1,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"date\",\"header\":\"Date\",\"dataType\":4,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"format\":\"yyyy \\\"Q\\\"q\",\"isContentHtml\":false},{\"binding\":\"sales\",\"header\":\"Sales\",\"dataType\":2,\"aggregate\":3,\"showAs\":2,\"descending\":false,\"format\":\"p2\",\"isContentHtml\":false},{\"binding\":\"downloads\",\"header\":\"Downloads\",\"dataType\":2,\"aggregate\":3,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false},{\"binding\":\"active\",\"header\":\"Active\",\"dataType\":3,\"aggregate\":2,\"showAs\":0,\"descending\":false,\"isContentHtml\":false},{\"binding\":\"discount\",\"header\":\"Discount\",\"dataType\":2,\"aggregate\":1,\"showAs\":0,\"descending\":false,\"format\":\"n0\",\"isContentHtml\":false}],\"rowFields\":{\"items\":[\"Date\"]},\"columnFields\":{\"items\":[\"Product\"]},\"filterFields\":{\"items\":[]},\"valueFields\":{\"items\":[\"Sales\"]}}"
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
    // get Northwind data (these are not very good sources for this demo, but are so easy to get...)
    DataSvc.prototype.getNorthwindOrders = function () {
        var urlNWind = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
        return new wjcOData.ODataCollectionView(urlNWind, 'Order_Details_Extendeds', {
            sortOnServer: false,
            pageOnServer: false,
            filterOnServer: false
        });
    };
    DataSvc.prototype.getNorthwindSales = function () {
        var urlNWind = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
        return new wjcOData.ODataCollectionView(urlNWind, 'Product_Sales_for_1997', {
            sortOnServer: false,
            pageOnServer: false,
            filterOnServer: false
        });
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