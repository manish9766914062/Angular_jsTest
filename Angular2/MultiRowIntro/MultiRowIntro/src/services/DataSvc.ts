

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    cityMap: wjcGrid.DataMap;
    orders: wjcCore.CollectionView;
    groupedOrders: wjcCore.CollectionView;
    pagedOrders: wjcCore.CollectionView;
    addNewOrders: wjcCore.CollectionView;
    ordersRefreshing: boolean = false;
    addNewOrdersRefreshing: boolean = false;
    groupedOrdersRefreshing: boolean = false;
    pagedOrdersRefreshing: boolean = false;

    constructor() {
        // create some data    
        var self = this;  
        var customers = [];
        var shippers = [
            { id: 0, name: 'Speedy Express', email: 'speedy@gmail.com', phone: '431-3234', express: true },
            { id: 1, name: 'Flash Delivery', email: 'flash@gmail.com', phone: '431-6563', express: true },
            { id: 2, name: 'Logitrax', email: 'logitrax@gmail.com', phone: '431-3981', express: false },
            { id: 3, name: 'Acme Inc', email: 'acme@gmail.com', phone: '431-3113', express: false }
        ];
        var firstNames = 'Aaron,Paul,John,Mark,Sue,Tom,Bill,Joe,Tony,Brad,Frank,Chris,Pat'.split(',');
        var lastNames = 'Smith,Johnson,Richards,Bannon,Wong,Peters,White,Brown,Adams,Jennings'.split(',');
        var cities = 'York,Paris,Rome,Cairo,Florence,Sidney,Hamburg,Vancouver'.split(',');
        var states = 'SP,RS,RN,SC,CS,RT,BC'.split(',');
        for (var i = 0; i < 50; i++) {
            var first = firstNames[self.randBetween(0, firstNames.length - 1)],
                last = lastNames[self.randBetween(0, lastNames.length - 1)];
           customers.push({
                id: i,
                name: first + ' ' + last,
                address: self.randBetween(100, 10000) + ' ' + lastNames[self.randBetween(0, lastNames.length - 1)] + ' St.',
                city: cities[self.randBetween(0, cities.length - 1)],
                state: states[self.randBetween(0, states.length - 1)],
                zip: wjcCore.format('{p1:d5}-{p2:d3}', {
                    p1: self.randBetween(10000, 99999),
                    p2: self.randBetween(100, 999)
                }),
                email: first + '.' + last + '@gmail.com',
                phone: wjcCore.format('{p1:d3}-{p2:d4}', {
                    p1: self.randBetween(100, 999),
                    p2: self.randBetween(1000, 9999)
                })
            });
        }
        self.cityMap = new wjcGrid.DataMap(cities);

        var orderItems = [];
        var today = new Date();
        for (var i = 0; i < 20; i++) {
            var shipped = wjcCore.DateTime.addDays(today, -self.randBetween(1, 3000));
            orderItems.push({
                id: i,
                date: wjcCore.DateTime.addDays(shipped, -self.randBetween(1, 5)),
                shippedDate: shipped,
                amount: self.randBetween(10000, 500000) / 100,
                customer: customers[self.randBetween(0, customers.length - 1)],
                shipper: shippers[self.randBetween(0, shippers.length - 1)]
            });
        }
        self.orders = new wjcCore.CollectionView(orderItems); 
        self.groupedOrders = new wjcCore.CollectionView(orderItems, {
            groupDescriptions: [
                'customer.city'
            ]
        });
        self.pagedOrders = new wjcCore.CollectionView(orderItems, {
            pageSize: 4
        });

        // create 'addNewOrders' collection, start with last item selected
        self.addNewOrders = new wjcCore.CollectionView(orderItems, {
            newItemCreator: _ => {
                return { // add empty customer and shipper objects to new orders
                    customer: {},
                    shipper: {}
                }
            },
        });
        
        self.orders.collectionChanged.addHandler(_ => {
            self.ordersRefreshing = true;
            if (!self.pagedOrdersRefreshing) {
                self.pagedOrders.refresh();
            }
            if (!self.groupedOrdersRefreshing) {
                self.groupedOrders.refresh();
            }
            if (!self.addNewOrdersRefreshing) {
                self.addNewOrders.refresh();
            }
            self.ordersRefreshing = false;
        });

        self.addNewOrders.collectionChanged.addHandler(_ => {
            self.addNewOrdersRefreshing = true;
            if (!self.ordersRefreshing) {
                self.orders.refresh();
            }
            if (!self.pagedOrdersRefreshing) {
                self.pagedOrders.refresh();
            }
            if (!self.groupedOrdersRefreshing) {
                self.groupedOrders.refresh();
            }
            self.addNewOrdersRefreshing = false;
        });

        self.groupedOrders.collectionChanged.addHandler(_ => {
            self.groupedOrdersRefreshing = true;
            if (!self.ordersRefreshing) {
                self.orders.refresh();
            }
            if (!self.pagedOrdersRefreshing) {
                self.pagedOrders.refresh();
            }
            if (!self.addNewOrdersRefreshing) {
                self.addNewOrders.refresh();
            }
            self.groupedOrdersRefreshing = false;
        });

        self.pagedOrders.collectionChanged.addHandler(_ => {
            self.pagedOrdersRefreshing = true;
            if (!self.ordersRefreshing) {
                self.orders.refresh();
            }
            if (!self.addNewOrdersRefreshing) {
                self.addNewOrders.refresh();
            }
            if (!self.groupedOrdersRefreshing) {
                self.groupedOrders.refresh();
            }
            self.pagedOrdersRefreshing = false;
        });
    }

    randBetween(min, max) {
         return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
