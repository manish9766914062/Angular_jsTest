'use strict';

import { Component, EventEmitter, NgModule, Input} from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeViewBaseCmp } from './TreeViewBaseCmp';
import { WjNavModule } from 'wijmo/wijmo.angular2.nav';

// Intro sample component.
@Component({
    selector: 'tv-intro-cmp',
    templateUrl: 'src/components/nav/treeViewIntroCmp.html'
})

export class TreeViewIntroCmp extends TreeViewBaseCmp {

    constructor() {
        super();
    }
    
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: TreeViewIntroCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjNavModule],
    declarations: [TreeViewIntroCmp],
})
export class TreeViewIntroModule {
}
