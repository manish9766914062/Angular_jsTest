




'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';

//GettingStarted sample component
@Component({
    selector: 'getting-started-cmp',
    templateUrl: 'src/components/GettingStartedCmp.html'
})

export class GettingStartedCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
    }

    private setDataSource() {
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }
}
