'use strict';
import { Component } from '@angular/core';
import * as wjCore from 'wijmo/wijmo';
import * as wjOData from 'wijmo/wijmo.odata';
import * as wjGrid from 'wijmo/wijmo.grid';

const serviceUrl = 'MyNorthWind';

@Component({
    selector: 'products',
    templateUrl: './src/components/products.component.html'
})

export class ProductsCmp {

    public cvCat: wjOData.ODataCollectionView;
    public cvPrd: wjOData.ODataCollectionView;
    private cvSup: wjOData.ODataCollectionView;
    private mapSup: wjGrid.DataMap;

    constructor() {

        this.cvSup = new wjOData.ODataCollectionView(serviceUrl, 'Suppliers', {
            keys: ['Supplier_ID'],
            loaded: (s: wjOData.ODataCollectionView, e: wjCore.EventArgs) => {
                this.mapSup = new wjGrid.DataMap(s.sourceCollection, 'Supplier_ID', 'Company_Name');
            }
        });

        this.cvCat = new wjOData.ODataCollectionView(serviceUrl, 'Categories', {
            keys: ['Category_ID'],
            fields: ['Category_ID', 'Category_Name'],
            currentChanged: (s, e) => {
                this.cvPrd.refresh();
                this.cvPrd.moveCurrentToFirst();
            }
        });

        this.cvPrd = new wjOData.ODataCollectionView(serviceUrl, 'Products', {
            keys: ['Product_ID'],
            dataTypes: {
                UnitPrice: wjCore.DataType.Number
            },
            filterOnServer: false,
            filter: (item) => { // show products for current category
                var cat = this.cvCat.currentItem;
                return cat && item.Category_ID == cat.Category_ID;
            },
            newItemCreator: function () { // initialize new products based on current category
                return {
                    Category_ID: this.cvCat.currentItem.Category_ID,
                    Product_Name: '',
                    Discontinued: false
                };
            }
        });
    }
}