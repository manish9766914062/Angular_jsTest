

import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmBaseCmp } from './FrmBaseCmp';

@Component({
    selector: 'popover-cmp',
    templateUrl: 'src/components/popoverCmp.html'
})
export class PopoverCmp extends FrmBaseCmp {
    constructor() {
        super();
    }
    
}


