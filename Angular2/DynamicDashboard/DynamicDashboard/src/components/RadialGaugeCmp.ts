
'use strict';

import { Component } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';


@Component({
    selector: 'radial-gauge-cmp',
    templateUrl: 'src/components/radialGaugeCmp.html'
})

export class RadialGaugeCmp extends BaseCmp {

    constructor() {
        super();
    }
}

