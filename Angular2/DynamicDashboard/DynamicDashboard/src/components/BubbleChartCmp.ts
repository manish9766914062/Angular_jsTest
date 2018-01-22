
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'bubble-chart-cmp',
    templateUrl: 'src/components/bubbleChartCmp.html'
})

export class BubbleChartCmp extends BaseCmp{

    constructor() {
        super();
    }
}


