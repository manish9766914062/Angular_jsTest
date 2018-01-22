
'use strict';

import { ElementRef, Component, Self } from '@angular/core';
import { Input, Inject, OnInit, Injector } from '@angular/core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { SortManager } from '../sortManager';
import { ManagerSvc } from '../services/ManagerSvc';


@Component({
    selector: 'sort-dialog-combo-cmp',
    templateUrl: 'src/components/sortDialogComboCmp.html'
})
export class SortDialogComboCmp {

    sortManager: SortManager;
    constructor( @Inject(ManagerSvc) managerSvc: ManagerSvc) {
        this.sortManager = managerSvc.sortManager;
    }
}
