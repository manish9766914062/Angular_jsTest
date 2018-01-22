'use strict';

import { Injectable } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';

// Common data service
@Injectable()
export class DataSvc {
    // data used to generate random items
    getData(count: number): wjcCore.ObservableArray {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            citiesByCountry = {
                US: ['New York', 'Los Angeles', 'Chicago', 'Phoenix', 'Dallas'],
                Germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt'],
                UK: ['London', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield'],
                Japan: ['Tokyo', 'Kanagawa', 'Osaka', 'Aichi', 'Hokkaido'],
                Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
                Greece: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa']
            },
            years = [2010, 2011, 2012, 2013, 2014],
            data = new wjcCore.ObservableArray(),
            countriesLen = countries.length,
            country, yearIndex, cityIndex;
        for (var i = 0; i < count; i++) {
            yearIndex = Math.floor(Math.random() * 5);
            cityIndex = Math.floor(Math.random() * 5);
            country = countries[i % countriesLen];
            data.push({
                id: i,
                country: country,
                city: citiesByCountry[country][cityIndex],
                date: new Date(years[yearIndex], i % 12, i % 27 + 1),
                amount: Math.random() * 10000
            });
        }
        return data;
    };
}