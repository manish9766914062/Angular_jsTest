
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'line-chart-cmp',
    templateUrl: 'src/components/lineChartCmp.html'
})

export class LineChartCmp extends BaseCmp{

    constructor() {
        super();
    }
}


