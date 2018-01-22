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
    selector: 'custom-node-cmp',
    templateUrl: 'src/components/nav/customNodeCmp.html'
})

export class CustomNodeCmp extends TreeViewBaseCmp {

    constructor() {
        super();
    }

    formatItem(treeView: wjcNav.TreeView, e: wjcNav.FormatNodeEventArgs) {
        if (e.dataItem.newItem) {
            e.element.innerHTML +=
                '<img style="margin-left:6px" src="resources/new.png"/>';
        }
    }}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: CustomNodeCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjNavModule],
    declarations: [CustomNodeCmp],
})
export class CustomNodeModule {
}
