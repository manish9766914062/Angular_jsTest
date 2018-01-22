
'use strict';

import { ElementRef, Component, Self } from '@angular/core';
import { Input, Inject, OnInit, Injector } from '@angular/core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { SortManager } from '../sortManager';
import { ManagerSvc } from '../services/ManagerSvc';


@Component({
    selector: 'sort-dialog-flex-cmp',
    templateUrl: 'src/components/sortDialogFlexCmp.html'
})
export class SortDialogFlexCmp {

    sortManager: SortManager;
    constructor( @Inject(ManagerSvc) managerSvc: ManagerSvc) {
        this.sortManager = managerSvc.sortManager;
    }
}
