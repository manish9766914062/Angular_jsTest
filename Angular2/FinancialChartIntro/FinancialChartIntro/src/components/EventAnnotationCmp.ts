




'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';


//EventAnnotation sample component
@Component({
    selector: 'event-annotation-cmp',
    templateUrl: 'src/components/EventAnnotationCmp.html'
})

export class EventAnnotationCmp {
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
