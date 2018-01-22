'use strict';

import { Component, EventEmitter, Inject, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutoCompleteCmp } from './AutoCompleteCmp';
import { DataSvc } from '../../services/DataSvc';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

// MultiSelect sample component.
@Component({
    selector: 'multi-auto-select-cmp',
    templateUrl: 'src/components/input/multiAutoCompleteCmp.html'
})
export class MultiAutoCompleteCmp extends AutoCompleteCmp {

    selectedCountries = ['Belgium', 'Vietnam'];
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        super(dataSvc);
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: MultiAutoCompleteCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule],
    declarations: [MultiAutoCompleteCmp],
})
export class MultiAutoCompleteModule {
}

