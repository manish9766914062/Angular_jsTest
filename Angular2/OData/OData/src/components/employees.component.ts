import { Component } from '@angular/core';

import * as wjCore from 'wijmo/wijmo';
import * as wjOData from 'wijmo/wijmo.odata';
import * as wjGrid from 'wijmo/wijmo.grid';
const serviceUrl = 'MyNorthWind';

@Component({
    selector: 'employees',
    templateUrl: './src/components/employees.component.html'
})
export class EmployeesCmp {

    // Employee CollectionView
    public cvEmp: wjOData.ODataCollectionView;
    // Employee DataMap
    public mapEmp: wjGrid.DataMap;

    constructor() {

        // get employees detail
        this.cvEmp = new wjOData.ODataCollectionView(serviceUrl, 'Employees', {
            keys: ['Employee_ID'],
            loaded: (s, e) => { // create data map, update scope
                if (!this.mapEmp) {
                    this.mapEmp = new wjGrid.DataMap(s.sourceCollection, 'Employee_ID', 'Last_Name');
                }
            },
            newItemCreator: () => { // initialize new products based on current category
                return {
                    First_Name: '',
                    Last_Name: ''
                };
            }
        });
    }
}