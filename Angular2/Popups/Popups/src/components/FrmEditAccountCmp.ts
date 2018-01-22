




'use strict';

import { Component, EventEmitter} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FrmBaseCmp } from './FrmBaseCmp';
import { EqualValidator } from '../validators/EqualValidator';

@Component({
    selector: 'frm-edit-account-cmp',
    templateUrl: 'src/components/frmEditAccountCmp.html'
})
export class FrmEditAccountCmp extends FrmBaseCmp {

    constructor() {
        super();
    }

    // Triggers the 'submit' event and shows the specified message.
    onSubmit(e: any, theForm: NgForm) {
        // process the form variables here...
        var form = e.target;
        console.log('** submitting form ' + form.name);
        this.submit.emit({ valid: theForm.valid });
    }
}


