'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wjCore = require("wijmo/wijmo");
var wjOData = require("wijmo/wijmo.odata");
var wjGrid = require("wijmo/wijmo.grid");
var serviceUrl = 'MyNorthWind';
var ProductsCmp = /** @class */ (function () {
    function ProductsCmp() {
        var _this = this;
        this.cvSup = new wjOData.ODataCollectionView(serviceUrl, 'Suppliers', {
            keys: ['Supplier_ID'],
            loaded: function (s, e) {
                _this.mapSup = new wjGrid.DataMap(s.sourceCollection, 'Supplier_ID', 'Company_Name');
            }
        });
        this.cvCat = new wjOData.ODataCollectionView(serviceUrl, 'Categories', {
            keys: ['Category_ID'],
            fields: ['Category_ID', 'Category_Name'],
            currentChanged: function (s, e) {
                _this.cvPrd.refresh();
                _this.cvPrd.moveCurrentToFirst();
            }
        });
        this.cvPrd = new wjOData.ODataCollectionView(serviceUrl, 'Products', {
            keys: ['Product_ID'],
            dataTypes: {
                UnitPrice: wjCore.DataType.Number
            },
            filterOnServer: false,
            filter: function (item) {
                var cat = _this.cvCat.currentItem;
                return cat && item.Category_ID == cat.Category_ID;
            },
            newItemCreator: function () {
                return {
                    Category_ID: this.cvCat.currentItem.Category_ID,
                    Product_Name: '',
                    Discontinued: false
                };
            }
        });
    }
    ProductsCmp = __decorate([
        core_1.Component({
            selector: 'products',
            templateUrl: './src/components/products.component.html'
        })
    ], ProductsCmp);
    return ProductsCmp;
}());
exports.ProductsCmp = ProductsCmp;
//# sourceMappingURL=products.component.js.map