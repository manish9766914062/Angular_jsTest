import * as wjcCore from 'wijmo/wijmo';
import * as wjcData from 'wijmo/wijmo.odata';
import * as wjcNav from 'wijmo/wijmo.nav';

// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WjNavModule } from 'wijmo/wijmo.angular2.nav';
import { TabsModule } from './components/AppTab';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })
    export class AppCmp implements AfterViewInit{
        items = [];
        editableItems = [];
        accordionItems = [];
        lazyItems = [];
        lazyLoadODataItems = [];
        dragItems1 = [];
        dragItems2 = [];
        isAnimated = true;
        autoCollapse = true;
        expandOnClick = true;
        useCustomCss = true;
        navItem = '';
        accordioItem = '';
        chkStatus = '';
        allowDraggingParentNodes = true;
        allowDroppingIntoEmpty = true;
        allowDragging = true;
        lazyLoadFunction: Function;
        lazyLoadODataFunction: Function;

        @ViewChild('tvAccordion') tvAccordion: wjcNav.TreeView;

        private _saveCheckedItems: any;
        private _nwindService = 'http://services.odata.org/V4/Northwind/Northwind.svc';

        constructor() {
            var employees;
            this.items = this._getItems();
            this.editableItems = JSON.parse(JSON.stringify(this.items)); // separate copy for editing (TFS 242748)
            this.accordionItems = this._getAccordionItems();
            this.lazyItems = this._getLazyItems();
            employees = new wjcData.ODataCollectionView(this._nwindService, 'Employees', {
                fields: 'EmployeeID,FirstName,LastName'.split(','),
                loaded: ()=> {
                    var items = employees.items.map((e)=> {
                        e.FullName = e.FirstName + ' ' + e.LastName;
                        e.Orders = []; // lazy-load orders
                        return e;
                    });
                    this.lazyLoadODataItems = items;
                }
            });
            this.dragItems1 = [
                { header: 'Item 1.1' },
                { header: 'Item 1.2' },
                { header: 'Item 1.3' },
            ];
            this.dragItems2 = [
                { header: 'Item 2.1' },
                { header: 'Item 2.2' },
                { header: 'Item 2.3' },
            ];


            // lazy loading function
            this.lazyLoadFunction = this._lazyLoadFunction.bind(this);
            this.lazyLoadODataFunction = this._lazyLoadODataFunction.bind(this);
        }

        ngAfterViewInit() {
            this.tvAccordion.hostElement.addEventListener('click',  (e:any) =>{
                if (e.target.tagName == 'A') {
                    this.accordioItem = 'Navigating to *** ' + e.target.href + ' ***';
                    e.preventDefault();
                }
            })
        }

        // 'Navigation' display
        navTo(treeView: wjcNav.TreeView) {
            this.navItem = 'Navigating to *** ' + treeView.selectedItem.header + ' ***';
        }

        // use dragStart event to honor the allowDraggingParentNodes setting
        // by setting the 'cancel' event parameter to true
        dragStart(sender: wjcNav.TreeView, e: wjcNav.TreeNodeEventArgs) {
            if (e.node.hasChildren) {
                if (!this.allowDraggingParentNodes) {
                    e.cancel = true; // prevent dragging parent nodes
                } else {
                    e.node.isCollapsed = true; // collapse parent nodes when dragging
                }
            }
        }

        // use dragOver event to honor the allowDroppingIntoEmpty setting
        // by changing the 'position' event parameter to 'Before'
        dragOver(sender: wjcNav.TreeView, e: wjcNav.TreeNodeDragDropEventArgs) {
            if (!this.allowDroppingIntoEmpty &&
                !e.dropTarget.hasChildren &&
                e.position == wjcNav.DropPosition.Into) {
                e.position = wjcNav.DropPosition.Before;
            }
        }

        // allow drag/drop between tvDragDrop1 and tvDragDrop2
        dragOverBetweenTrees(tvDragDrop1: wjcNav.TreeView, tvDragDrop2: wjcNav.TreeView, e: wjcNav.TreeNodeDragDropEventArgs) {
            var t1 = e.dragSource.treeView;
            var t2 = e.dropTarget.treeView;
            if (t1 == tvDragDrop1 || t1 == tvDragDrop2) {
                if (t2 == tvDragDrop1 || t2 == tvDragDrop2) {
                    e.cancel = false;
                }
            }
        }
        
        // editing support
        nodeEditStarting(sender: wjcNav.TreeView, e: wjcNav.TreeNodeEventArgs) {
            if (e.node.hasChildren) {
                e.cancel = true;
            }
        }

        // display checked items
        checkedItems(treeView: wjcNav.TreeView) {
            var items = treeView.checkedItems,
                msg = '';
            if (items.length) {
                msg = '<p><b>Checked Items:</b></p><ol>\r\n';
                for (var i = 0; i < items.length; i++) {
                    msg += '<li>' + items[i].header + '</li>\r\n';
                }
                msg += '</ol>';
            }
            this.chkStatus = msg;
        }

        // save checked items
        saveCheckedItems(treeView: wjcNav.TreeView) {
            this._saveCheckedItems = treeView.checkedItems;
        }

        // restore checked items
        restoreCheckedItems(treeView: wjcNav.TreeView) {
            treeView.checkedItems = this._saveCheckedItems || [];
        }

        // disable node
        disableNode(treeView: wjcNav.TreeView) {
            var nd = treeView.selectedNode;
            if (nd) {
                nd.isDisabled = true;
            }
        }

        // enable all nodes
        enableAllNodes(treeView: wjcNav.TreeView) {
            for (var nd = treeView.getFirstNode(); nd; nd = nd.next()) {
                nd.isDisabled = false;
            }
        }

        // custom item
        formatItem(treeView: wjcNav.TreeView, e: wjcNav.FormatNodeEventArgs) {
            if (e.dataItem.newItem) {
                e.element.innerHTML +=
                    '<img style="margin-left:6px" src="resources/new.png"/>';
            }
        }

        private _lazyLoadFunction(node: wjcNav.TreeNode, callback: Function) {
            setTimeout(function () { // simulate http delay
                var result = [ // simulate result
                    { header: 'Another lazy node...', items: [] },
                    { header: 'A non-lazy node without children' },
                    {
                        header: 'A non-lazy node with child nodes', items: [
                            { header: 'hello' },
                            { header: 'world' }
                        ]
                    }
                ];
                callback(result); // return result to control
            }, 2500); // 2.5sec http delay
        }

        private _lazyLoadODataFunction(node: wjcNav.TreeNode, callback: Function) {
            switch (node.level) {

                // load orders for an employee
                case 0:
                    var url = 'Employees(' + node.dataItem.EmployeeID + ')/Orders';
                    var orders = new wjcData.ODataCollectionView(this._nwindService, url, {
                        fields: 'OrderID,ShipName,ShipCountry'.split(','),
                        loaded:  ()=> {
                            var items = orders.items.map( (e)=> {
                                e.Order_Details = []; // lazy-order details
                                return e;
                            });
                            callback(items);
                        }
                    });
                    break;

                // load extended details for an order
                case 1:
                    var url = "Order_Details_Extendeds/?$filter=OrderID eq " + node.dataItem.OrderID;
                    var details = new wjcData.ODataCollectionView(this._nwindService, url, {
                        fields: 'ProductName,ExtendedPrice'.split(','),
                        loaded: () => {
                            var items = details.items.map(function (e) {
                                e.Summary = wjcCore.format('{ProductName}: {ExtendedPrice:c}', e);
                                return e;
                            });
                            callback(items);
                        }
                    });
                    break;

                // default
                default:
                    callback(null);
            }
        }

        private _getItems() {
            return [
                {
                    header: 'Electronics', img: 'resources/electronics.png', items: [
                        { header: 'Trimmers/Shavers' },
                        { header: 'Tablets' },
                        {
                            header: 'Phones', img: 'resources/phones.png', items: [
                                { header: 'Apple' },
                                { header: 'Motorola', newItem: true },
                                { header: 'Nokia' },
                                { header: 'Samsung' }
                            ]
                        },
                        { header: 'Speakers', newItem: true },
                        { header: 'Monitors' }
                    ]
                },
                {
                    header: 'Toys', img: 'resources/toys.png', items: [
                        { header: 'Shopkins' },
                        { header: 'Train Sets' },
                        { header: 'Science Kit', newItem: true },
                        { header: 'Play-Doh' },
                        { header: 'Crayola' }
                    ]
                },
                {
                    header: 'Home', img: 'resources/home.png', items: [
                        { header: 'Coffeee Maker' },
                        { header: 'Breadmaker', newItem: true },
                        { header: 'Solar Panel', newItem: true },
                        { header: 'Work Table' },
                        { header: 'Propane Grill' }
                    ]
                }
            ];
        }

        private _getAccordionItems() {
            return [
                {
                    header: 'Angular', items: [
                        { header: '<a href="ng/intro">Introduction</a>' },
                        { header: '<a href="ng/samples">Samples</a>' },
                        { header: '<a href="ng/perf">Performance</a>' }
                    ]
                },
                {
                    header: 'React', items: [
                        { header: '<a href="rc/intro">Introduction</a>' },
                        { header: '<a href="rc/samples">Samples</a>' },
                        { header: '<a href="rc/perf">Performance</a>' }
                    ]
                },
                {
                    header: 'Vue', items: [
                        { header: '<a href="vue/intro">Introduction</a>' },
                        { header: '<a href="vue/samples">Samples</a>' },
                        { header: '<a href="vue/perf">Performance</a>' }
                    ]
                },
                {
                    header: 'Knockout', items: [
                        { header: '<a href="ko/intro">Introduction</a>' },
                        { header: '<a href="ko/samples">Samples</a>' },
                        { header: '<a href="ko/perf">Performance</a>' }
                    ]
                },
            ];
        }

        private _getLazyItems() {
            return [ // start with three lazy-loaded nodes
                { header: 'Lazy Node 1', items: [] },
                { header: 'Lazy Node 2', items: [] },
                { header: 'Lazy Node 3', items: [] }
            ];
        }
    }


    @NgModule({
        imports: [WjNavModule, BrowserModule, TabsModule, FormsModule],
        declarations: [AppCmp],
        bootstrap: [AppCmp]
    })
    export class AppModule {
    }


    enableProdMode();
    // Bootstrap application 
    platformBrowserDynamic().bootstrapModule(AppModule);