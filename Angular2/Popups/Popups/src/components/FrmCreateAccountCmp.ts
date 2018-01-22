




'use strict';

import { Component, EventEmitter} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FrmBaseCmp } from './FrmBaseCmp';
import { EqualValidator } from '../validators/EqualValidator';

@Component({
    selector: 'frm-create-account-cmp',
    templateUrl: 'src/components/frmCreateAccountCmp.html'
})
export class FrmCreateAccountCmp extends FrmBaseCmp {
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
