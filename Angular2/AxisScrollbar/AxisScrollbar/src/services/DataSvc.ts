'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    rand(): number {
        return Math.round(Math.random() * 100);
    };

    // data used to generate random items
    getData(): any[] {
        var dataCount = 3000,
            rand = this.rand,
            data = [], mod;

        for (var i = 0; i < dataCount; i++) {
            mod = Math.floor(i / 10) % 10;
            data.push({
                date: new Date(2005, 0, i),
                yval: mod == 0 ? null : rand()
            });
        }
        return data;
    };
}
