'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    getData(dataCount: number): any[] {
        let data = [];
        let date = new Date();
        for (let i = 0; i < dataCount; i++) {
            let low = Math.ceil(Math.random() * 10);
            let high = 10 + Math.ceil(Math.random() * 10);
            let name = 'Task' + (i + 1);
            data.push({
                name: name,
                start: new Date(date.getTime() + low * 3600 * 24 * 1000),
                end: new Date(date.getTime() + high * 3600 * 24 * 1000)
            });
        }
        return data;
    };

    getDepData(): any[] {
        let year = new Date().getFullYear();
        let data = [{
            name: 'Task1',
            start: new Date(year, 0, 1),
            end: new Date(year, 2, 31),
            parent: null,
            percent: 100
        }, {
            name: 'Task2',
            start: new Date(year, 3, 1),
            end: new Date(year, 3, 30),
            parent: 'Task1',
            percent: 100
        }, {
            name: 'Task3',
            start: new Date(year, 4, 1),
            end: new Date(year, 6, 31),
            parent: 'Task2',
            percent: 75
        }, {
            name: 'Task4',
            start: new Date(year, 3, 1),
            end: new Date(year,6, 31),
            parent: 'Task1',
            percent: 33
        }, {
            name: 'Task5',
            start: new Date(year, 7, 1),
            end: new Date(year, 8, 30),
            parent: 'Task3,Task4',
            percent: 0
        }, {
            name: 'Task6',
            start: new Date(year, 9, 1),
            end: new Date(year, 11, 31),
            parent: 'Task1,Task5',
            percent: 0
        }, {
            name: 'Task7',
            start: new Date(year, 0, 1),
            end: new Date(year, 11, 31),
            parent: null,
            percent: 50
        }];
        return data;
    };
}