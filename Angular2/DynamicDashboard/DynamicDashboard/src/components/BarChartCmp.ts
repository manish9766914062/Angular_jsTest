
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'bar-chart-cmp',
    templateUrl: 'src/components/barChartCmp.html'
})

export class BarChartCmp extends BaseCmp{

    constructor() {
        super();
    }
}


