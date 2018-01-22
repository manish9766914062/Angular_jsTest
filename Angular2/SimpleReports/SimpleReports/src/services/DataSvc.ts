

import * as wjcOdata from 'wijmo/wijmo.odata';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    products: wjcOdata.ODataCollectionView;
    categories: wjcOdata.ODataCollectionView;
    employees: wjcOdata.ODataCollectionView;
    customers: wjcOdata.ODataCollectionView;
    productSales: wjcOdata.ODataCollectionView;
    invoices: wjcOdata.ODataCollectionView;
    reports: wjcCore.CollectionView;
    minInvoiceAmount = 2000;
    viewsLoaded: number;
    viewsLoadedFun: Function;

    initData() {
        var url = 'http://services.odata.org/V4/Northwind/Northwind.svc';

        this.products = new wjcOdata.ODataCollectionView(url, 'Products', {
            groupDescriptions: [
                new wjcCore.PropertyGroupDescription('ProductName',
                    (item, propName) => {
                        var value = item[propName];
                        return value[0].toUpperCase();
                    }
                )
            ],
            sortDescriptions: ['ProductName'],
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
        this.categories = new wjcOdata.ODataCollectionView(url, 'Categories', {
            fields: ['CategoryID', 'CategoryName', 'Description'],
            sortDescriptions: ['CategoryName'],
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
        this.customers = new wjcOdata.ODataCollectionView(url, 'Customers', {
            sortDescriptions: ['CompanyName'],
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
        this.minInvoiceAmount = 2000;
        this.invoices = new wjcOdata.ODataCollectionView(url, 'Invoices', {
            groupDescriptions: ['Country', 'Salesperson'],
            sortDescriptions: [
                new wjcCore.SortDescription('Country', true),
                new wjcCore.SortDescription('Salesperson', true),
                new wjcCore.SortDescription('ExtendedPrice', false)
            ],
            filterDefinition: 'ExtendedPrice ge ' + this.minInvoiceAmount,
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
        this.employees = new wjcOdata.ODataCollectionView(url, 'Employees', {
            fields: ['EmployeeID', 'LastName', 'FirstName', 'Title', 'TitleOfCourtesy', 'BirthDate', 'HireDate', 'Address', 'City', 'Region', 'PostalCode', 'Country', 'HomePhone', 'Extension', 'Notes', 'ReportsTo'],
            groupDescriptions: ['Country', 'City'],
            sortDescriptions: ['Country', 'City'],
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
        this.productSales = new wjcOdata.ODataCollectionView(url, 'Product_Sales_for_1997', {
            groupDescriptions: ['CategoryName'],
            sortDescriptions: ['CategoryName', 'ProductName'],
            loaded: (s, e) => {
                this.viewLoaded();
            }
        });
    }

    // update scope after loading each view
    viewLoaded() {
        this.viewsLoaded = (this.viewsLoaded || 0) + 1;
        this.viewsLoadedFun();
    }
}
