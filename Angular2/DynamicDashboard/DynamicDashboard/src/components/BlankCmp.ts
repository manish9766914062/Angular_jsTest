
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'blank-cmp',
    templateUrl: 'src/components/blankCmp.html'
})

export class BlankCmp extends BaseCmp{

    constructor() {
        super();
    }
}


