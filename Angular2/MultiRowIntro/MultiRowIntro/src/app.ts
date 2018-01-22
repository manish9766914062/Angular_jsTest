import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
import * as wjcMultiRow from 'wijmo/wijmo.grid.multirow';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridMultirowModule } from 'wijmo/wijmo.angular2.grid.multirow';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })


    export class AppCmp implements AfterViewInit {
        // generate some random data
        protected dataSvc: DataSvc;
        orders: wjcCore.CollectionView;
        groupedOrders: wjcCore.CollectionView;
        pagedOrders: wjcCore.CollectionView;
        addNewOrders: wjcCore.CollectionView;
        layoutDefs: wjcCore.CollectionView;
        ldOneLine: any[];
        ldTwoLines: any[];
        ldThreeLines: any[];

        @ViewChild('frozenGrid') frozenGrid: wjcGrid.FlexGrid;
        @ViewChild('filterGrid') filterGrid: wjcGrid.FlexGrid;
        @ViewChild('expandedHeadersGrid') expandedHeadersGrid: wjcMultiRow.MultiRow;

        constructor( @Inject(DataSvc) dataSvc: DataSvc) {
            this.dataSvc = dataSvc;
            this.orders = dataSvc.orders;
            this.groupedOrders = dataSvc.groupedOrders;
            this.pagedOrders = dataSvc.pagedOrders;

            // create 'addNewOrders' collection, start with last item selected
            this.addNewOrders = dataSvc.addNewOrders;
            this.addNewOrders.moveCurrentToLast();


            // sample layout definitions
            this.ldOneLine = [
                { cells: [{ binding: 'id', header: 'ID', cssClass: 'id' }] },
                { cells: [{ binding: 'date', header: 'Ordered' }] },
                { cells: [{ binding: 'shippedDate', header: 'Shipped' }] },
                { cells: [{ binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' }] },
                { cells: [{ binding: 'customer.name', header: 'Customer' }] },
                { cells: [{ binding: 'customer.address', header: 'Address' }] },
                { cells: [{ binding: 'customer.city', header: 'City', dataMap: dataSvc.cityMap }] },
                { cells: [{ binding: 'customer.state', header: 'State', width: 45 }] },
                { cells: [{ binding: 'customer.zip', header: 'Zip' }] },
                { cells: [{ binding: 'customer.email', header: 'Customer Email', cssClass: 'email' }] },
                { cells: [{ binding: 'customer.phone', header: 'Customer Phone' }] },
                { cells: [{ binding: 'shipper.name', header: 'Shipper' }] },
                { cells: [{ binding: 'shipper.email', header: 'Shipper Email', cssClass: 'email' }] },
                { cells: [{ binding: 'shipper.phone', header: 'Shipper Phone' }] },
                { cells: [{ binding: 'shipper.express', header: 'Express' }] }
            ];
            this.ldTwoLines = [
                {
                    header: 'Order', colspan: 2, cells: [
                        { binding: 'id', header: 'ID', cssClass: 'id' },
                        { binding: 'date', header: 'Ordered' },
                        { binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' },
                        { binding: 'shippedDate', header: 'Shipped' }
                    ]
                },
                {
                    header: 'Customer', colspan: 3, cells: [
                        { binding: 'customer.name', header: 'Name' },
                        { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                        { binding: 'customer.address', header: 'Address' },
                        { binding: 'customer.city', header: 'City', dataMap: dataSvc.cityMap },
                        { binding: 'customer.state', header: 'State', width: 45 }
                    ]
                },
                {
                    header: 'Shipper', cells: [
                        { binding: 'shipper.name', header: 'Shipper', colspan: 2 },
                        { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                        { binding: 'shipper.express', header: 'Express' }
                    ]
                }
            ];
            this.ldThreeLines = [
                {
                    header: 'Order', colspan: 2, cells: [
                        { binding: 'id', header: 'ID', colspan: 2, cssClass: 'id' },
                        { binding: 'amount', header: 'Amount', format: 'c', colspan: 2, cssClass: 'amount' },
                        { binding: 'date', header: 'Ordered' },
                        { binding: 'shippedDate', header: 'Shipped' }
                    ]
                },
                {
                    header: 'Customer', colspan: 3, cells: [
                        { binding: 'customer.name', header: 'Name' },
                        { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                        { binding: 'customer.address', header: 'Address', colspan: 2 },
                        { binding: 'customer.phone', header: 'Phone' },
                        { binding: 'customer.city', header: 'City', dataMap: dataSvc.cityMap },
                        { binding: 'customer.state', header: 'State', width: 45 },
                        { binding: 'customer.zip', header: 'Zip' },
                    ]
                },
                {
                    header: 'Shipper', cells: [
                        { binding: 'shipper.name', header: 'Shipper' },
                        { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                        { binding: 'shipper.express', header: 'Express' }
                    ]
                }
            ]
            this.layoutDefs = new wjcCore.CollectionView([
                {
                    name: 'Traditional',
                    description: 'Traditional grid view, with one row per record. The user must scroll horizontally to see the whole record.',
                    def: this.ldOneLine
                },
                {
                    name: 'Compact',
                    description: 'This view uses two rows per record. The layout is divided into three groups: order, customer, and shipper',
                    def: this.ldTwoLines
                },
                {
                    name: 'Detailed',
                    description: 'This view uses three rows per record. The layout is divided into three groups: order, customer, and shipper',
                    def: this.ldThreeLines
                }
            ]);

        }

        // toggle frozen rows/columns
        toggleFreeze(rows: number, cols: number) {
            var flex = this.frozenGrid;
            if (flex) {
                flex.frozenColumns = flex.frozenColumns ? 0 : cols;
                flex.frozenRows = flex.frozenRows ? 0 : rows;
            }
        }

        ngAfterViewInit() {
            var filter = new wjcGridFilter.FlexGridFilter(this.filterGrid);
            this.expandedHeadersGrid.collapsedHeaders = null;
        }
    }


    @NgModule({
        imports: [WjInputModule, WjGridMultirowModule, BrowserModule, FormsModule, TabsModule],
        declarations: [AppCmp],
        providers: [DataSvc],
        bootstrap: [AppCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application with hash style navigation and global services.
    platformBrowserDynamic().bootstrapModule(AppModule);
