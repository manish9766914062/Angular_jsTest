import { Component } from '@angular/core';

import * as wjCore from 'wijmo/wijmo';
import * as wjOData from 'wijmo/wijmo.odata';
import * as wjGrid from 'wijmo/wijmo.grid';

const serviceUrl = 'MyNorthWind';

@Component({
    selector: 'customers',
    templateUrl: './src/components/customers.component.html'
})
export class CustomersCmp {

    // customers CollectionView
    public cvCst: wjOData.ODataCollectionView;
    // order CollectionView
    public cvOrd: wjOData.ODataCollectionView;
    // Detail CollectionView
    public cvDtl: wjOData.ODataCollectionView;
    // Shipper DataMap
    public mapShp: wjGrid.DataMap;
    // Employee DataMap
    public mapEmp: wjGrid.DataMap;

    constructor() {

        this.cvCst = new wjOData.ODataCollectionView(serviceUrl, 'Customers', {
            keys: ['Customer_ID'],
            fields: ['Customer_ID', 'Company_Name'],
            currentChanged: () => {
                // show orders for current customer
                this.cvOrd.refresh();
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
            filter: (item) => {
                // show orders for selected customer
                var cst = this.cvCst.currentItem;
                return cst && item.Customer_ID == cst.Customer_ID;
            },
            currentChanged: (s, e) => {
                // show details for current order
                this.getOrderDetail();
            },
            collectionChanged: (s: wjOData.ODataCollectionView, e) => {
                // show details for current order
                this.getOrderDetail();
                //select first cell
                s.moveCurrentToFirst();
            },
            newItemCreator: () => { // initialize new Order based on current customer
                return {
                    Order_ID: this.getNewId(this.cvOrd, 'Order_ID'),
                    Customer_ID: this.cvCst.currentItem.Customer_ID
                };
            }
        });

        let _data = new wjOData.ODataCollectionView(serviceUrl, 'Employees', {
            keys: ['Employee_ID'],
            loaded: (s, e) => {
                // create data map, update scope
                if (!this.mapEmp) {
                    this.mapEmp = new wjGrid.DataMap(s.sourceCollection, 'Employee_ID', 'Last_Name');
                }
            }
        });
        let _shp = new wjOData.ODataCollectionView(serviceUrl, 'Shippers', {
            keys: ['Shipper_ID'],
            loaded: (s, e) => {
                // create data map, update scope
                this.mapShp = new wjGrid.DataMap(s.sourceCollection, 'Shipper_ID', 'Company_Name');
            }
        });
    }
    // Get the order details for current selected order.
    private getOrderDetail() {
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
                filter: (item) => {
                    return item.Order_ID == Order_ID
                },
                collectionChanged: () => {
                    this.cvDtl.moveCurrentToFirst();
                },
                newItemCreator: () => { // initialize new OrderDetail based on current order
                    return {
                        Order_ID: this.cvOrd.currentItem.Order_ID,
                        Product_ID: 1
                    };
                }
            });
        }
    }

    // get new ID for an item by adding one to the maximum ID present in the
    // source (unfiltered) collection
    private getNewId(view, idField) {
        var items = view.sourceCollection;
        return items.length > 0 ? wjCore.getAggregate(wjCore.Aggregate.Max, view.sourceCollection, idField) + 1 : 0;
    }
}