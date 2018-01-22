

import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmBaseCmp } from './FrmBaseCmp';

@Component({
    selector: 'popover-form-cmp',
    templateUrl: 'src/components/popoverFormCmp.html'
})
export class PopoverFormCmp extends FrmBaseCmp {
    constructor() {
        super();
    }
}


