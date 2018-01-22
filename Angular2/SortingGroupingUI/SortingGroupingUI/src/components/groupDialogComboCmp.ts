
'use strict';

import { ElementRef, Component, Self } from '@angular/core';
import { Input, Inject, OnInit, Injector } from '@angular/core';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { GroupManager } from '../groupManager';
import { ManagerSvc } from '../services/ManagerSvc';


@Component({
    selector: 'group-dialog-combo-cmp',
    templateUrl: 'src/components/groupDialogComboCmp.html'
})
export class GroupDialogComboCmp {

    groupManager: GroupManager;
    constructor( @Inject(ManagerSvc) managerSvc: ManagerSvc) {
        this.groupManager = managerSvc.groupManager;
    }
}
