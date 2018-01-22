




'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    getData(): any[] {
        var data = [],
            countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');

        // populate itemsSource
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.ceil(Math.random() * 80) + 20,
                sales: Math.ceil(Math.random() * 80) + 20
            });
        }
        return data;
    }

    getPolarData(): any[] {
        var data = [],
            len = 360;

        // populate itemsSource
        for (var i = 0; i <= len; i += 10) {
            data.push({
                longitude: i,
                latitude1: Math.ceil(Math.random() * 30) + 60,
                latitude2: Math.ceil(Math.random() * 30) + 30
            });
        }
        return data;
    }
}
