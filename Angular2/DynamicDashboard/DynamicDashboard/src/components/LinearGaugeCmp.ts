
'use strict';

import { Component } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'linear-gauge-cmp',
    templateUrl: 'src/components/linearGaugeCmp.html'
})

export class LinearGaugeCmp extends BaseCmp {

    constructor() {
        super();
    }

}

