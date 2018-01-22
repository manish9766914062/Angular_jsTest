import * as wjcCore from 'wijmo/wijmo';

'use strict';

import { Injectable, Inject } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {

    constructor() {
    }

    // get data by symbol
    getData(count: number): wjcCore.ObservableArray {
        var data = new wjcCore.ObservableArray();

        for (var i = 1; i <= count; i++) {
            data.push({
                x: i,
                y: Math.floor(Math.random() * 100)
            });
        }
        return data;
    }

    getWaterfallData(): wjcCore.ObservableArray {
        var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data = new wjcCore.ObservableArray();

        for (var i = 0, len = names.length; i < len; i++) {
            data.push({
                name: names[i],
                value: Math.round((0.5 - Math.random()) * 1000)
            });
        }
        return data;
    }

    getBoxData(): wjcCore.ObservableArray {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = new wjcCore.ObservableArray(),
            d = function () {
                return Math.round(Math.random() * 100);
            };
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                sales: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()],
                expenses: [d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d(), d()]
            });
        }
        return data;
    };

    getErrorBarData(): wjcCore.ObservableArray {
        var countries = 'US,Germany,UK,Japan,Italy,Greece,China,France,Russia'.split(','),
            appData = new wjcCore.ObservableArray(),
            d = function() {
                var val = Math.round(Math.random() * 100);
                return val > 10 ? val : val + 10;
            };
        for (var i = 0; i < countries.length; i++) {
            appData.push({
                country: countries[i],
                downloads: d(),
                sales: d()
            });
        }
        return appData;
    }
}
