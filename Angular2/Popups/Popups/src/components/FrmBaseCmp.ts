



'use strict';

import {Component, EventEmitter, Output} from '@angular/core';
import {  NgForm } from '@angular/forms';

// Base class for all form components.
@Component({
    selector: '',
    templateUrl: ''
})
export abstract class FrmBaseCmp {
    @Output() submit = new EventEmitter();

    // Triggers the 'submit' event and shows the specified message.
    onSubmit(e: any, theForm: NgForm) {
        // process the form variables here...
        var form = e.target;
        console.log('** submitting form ' + form.name);
        this.submit.next(null);

    }
}



