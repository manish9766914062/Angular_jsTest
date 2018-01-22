
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'column-chart-cmp',
    templateUrl: 'src/components/columnChartCmp.html'
})

export class ColumnChartCmp extends BaseCmp{

    constructor() {
        super();
    }
}


