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
    selector: 'nav-tree-cmp',
    templateUrl: 'src/components/nav/navTreeCmp.html'
})

export class NavTreeCmp extends TreeViewBaseCmp {

    navItem = '';

    constructor() {
        super();
    }

    // 'Navigation' display
    navTo(treeView: wjcNav.TreeView) {
        this.navItem = 'Navigating to *** ' + treeView.selectedItem.header + ' ***';
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: NavTreeCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjNavModule],
    declarations: [NavTreeCmp],
})
export class NavTreeModule {
}
