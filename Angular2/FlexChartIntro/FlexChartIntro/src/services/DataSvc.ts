'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    getData(countries: string[]): any[] {
        var data = [];
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    };

    getFunnelData(countries: string[]): any[] {
        var data = [], sales = 10000;
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: sales
            });
            sales = sales - Math.round(Math.random() * 2000);
        }
        return data;
    };

    getRangeData(countries: string[]): any[] {
        var data = [];
        var year = new Date().getFullYear();
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                num1: Math.random() * 10000,
                num2: Math.random() * 20000,
                date1: new Date(year, Math.floor(Math.random() * 6), Math.floor(Math.random() * 14)),
                date2: new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
            });
        }
        return data;
    };
}