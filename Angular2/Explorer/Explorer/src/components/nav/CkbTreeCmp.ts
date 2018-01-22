'use strict';
import * as wjcNav from 'wijmo/wijmo.nav';

import { Component, EventEmitter, NgModule, Input} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeViewBaseCmp } from './TreeViewBaseCmp';
import { WjNavModule } from 'wijmo/wijmo.angular2.nav';

// Intro sample component.
@Component({
    selector: 'ckb-tree-cmp',
    templateUrl: 'src/components/nav/ckbTreeCmp.html'
})

export class CkbTreeCmp extends TreeViewBaseCmp {

    constructor() {
        super();
    }
    
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: CkbTreeCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjNavModule],
    declarations: [CkbTreeCmp],
})
export class CkbTreeModule {
}
