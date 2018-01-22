
'use strict';

import { Component} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCmp } from './BaseCmp';

@Component({
    selector: 'bullet-Graph-cmp',
    templateUrl: 'src/components/bulletGraphCmp.html'
})

export class BulletGraphCmp extends BaseCmp{

    constructor() {
        super();
    }
}


