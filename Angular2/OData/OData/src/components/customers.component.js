"use strict";
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
var CustomersCmp = /** @class */ (function () {
    function CustomersCmp() {
        var _this = this;
        this.cvCst = new wjOData.ODataCollectionView(serviceUrl, 'Customers', {
            keys: ['Customer_ID'],
            fields: ['Customer_ID', 'Company_Name'],
            currentChanged: function () {
                // show orders for current customer
                _this.cvOrd.refresh();
            }
        });
        this.cvOrd = new wjOData.ODataCollectionView(serviceUrl, 'Orders', {
            keys: ['Order_ID'],
            dataTypes: {
                Order_Date: wjCore.DataType.Date,
                Required_Date: wjCore.DataType.Date,
                Shipped_Date: wjCore.DataType.Date,
                Freight: wjCore.DataType.Number
            },
            filterOnServer: false,
            filter: function (item) {
                // show orders for selected customer
                var cst = _this.cvCst.currentItem;
                return cst && item.Customer_ID == cst.Customer_ID;
            },
            currentChanged: function (s, e) {
                // show details for current order
                _this.getOrderDetail();
            },
            collectionChanged: function (s, e) {
                // show details for current order
                _this.getOrderDetail();
                //select first cell
                s.moveCurrentToFirst();
            },
            newItemCreator: function () {
                return {
                    Order_ID: _this.getNewId(_this.cvOrd, 'Order_ID'),
                    Customer_ID: _this.cvCst.currentItem.Customer_ID
                };
            }
        });
        var _data = new wjOData.ODataCollectionView(serviceUrl, 'Employees', {
            keys: ['Employee_ID'],
            loaded: function (s, e) {
                // create data map, update scope
                if (!_this.mapEmp) {
                    _this.mapEmp = new wjGrid.DataMap(s.sourceCollection, 'Employee_ID', 'Last_Name');
                }
            }
        });
        var _shp = new wjOData.ODataCollectionView(serviceUrl, 'Shippers', {
            keys: ['Shipper_ID'],
            loaded: function (s, e) {
                // create data map, update scope
                _this.mapShp = new wjGrid.DataMap(s.sourceCollection, 'Shipper_ID', 'Company_Name');
            }
        });
    }
    // Get the order details for current selected order.
    CustomersCmp.prototype.getOrderDetail = function () {
        var _this = this;
        if (!this.cvOrd.currentItem) {
            return;
        }
        var Order_ID = this.cvOrd.currentItem.Order_ID;
        if (Order_ID) {
            this.cvDtl = new wjOData.ODataCollectionView(serviceUrl, 'Order_Details', {
                keys: ['Order_ID', 'Product_ID'],
                dataTypes: {
                    Unit_Price: wjCore.DataType.Number
                },
                filterOnServer: false,
                filter: function (item) {
                    return item.Order_ID == Order_ID;
                },
                collectionChanged: function () {
                    _this.cvDtl.moveCurrentToFirst();
                },
                newItemCreator: function () {
                    return {
                        Order_ID: _this.cvOrd.currentItem.Order_ID,
                        Product_ID: 1
                    };
                }
            });
        }
    };
    // get new ID for an item by adding one to the maximum ID present in the
    // source (unfiltered) collection
    CustomersCmp.prototype.getNewId = function (view, idField) {
        var items = view.sourceCollection;
        return items.length > 0 ? wjCore.getAggregate(wjCore.Aggregate.Max, view.sourceCollection, idField) + 1 : 0;
    };
    CustomersCmp = __decorate([
        core_1.Component({
            selector: 'customers',
            templateUrl: './src/components/customers.component.html'
        })
    ], CustomersCmp);
    return CustomersCmp;
}());
exports.CustomersCmp = CustomersCmp;
//# sourceMappingURL=customers.component.js.map