

import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmBaseCmp } from './FrmBaseCmp';

@Component({
    selector: 'frm-log-in-cmp',
    templateUrl: 'src/components/frmLogInCmp.html'
})
export class FrmLogInCmp extends FrmBaseCmp {
    @Output() createAccount = new EventEmitter();

    constructor() {
        super();
    }

    onCreateAccount() {
        this.createAccount.next(null);
    }

}


