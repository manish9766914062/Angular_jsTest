'use strict';

import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormGroup  } from '@angular/forms';

@Component({
    selector: 'form-cmp',
    templateUrl: 'src/components/formCmp.html'
})
export class FormCmp {

    @Input() item: any
    @Input() staticLabels: boolean;
    @Output() customSubmit = new EventEmitter<any>();

    countries = 'US,UK,Japan,Germany,France,Italy,Russia,China,India,Korea,Spain,Canada,Denmark,Sweden,Holland,Norway,Portugal'.split(',');
    colors = 'Black,White,Grey,Red,Green,Blue,Yellow,Pink,Purple,Orange'.split(',');

    constructor() {
    }

    // changes have been accepted, hide dialog
    onSubmit(form: NgForm) {
        this.customSubmit.emit(form.valid);
    }
}



