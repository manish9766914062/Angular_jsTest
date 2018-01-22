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
    selector: 'lazy-loading-cmp',
    templateUrl: 'src/components/nav/lazyLoadingCmp.html'
})

export class LazyLoadingCmp {

    lazyItems = [];
    lazyLoadFunction: Function;
    constructor() {
        this.lazyItems = this._getLazyItems();
        this.lazyLoadFunction = this._lazyLoadFunction.bind(this);
    }

    private _getLazyItems() {
        return [ // start with three lazy-loaded nodes
            { header: 'Lazy Node 1', items: [] },
            { header: 'Lazy Node 2', items: [] },
            { header: 'Lazy Node 3', items: [] }
        ];
    }


    private _lazyLoadFunction(node: wjcNav.TreeNode, callback: Function) {
        setTimeout(function () { // simulate http delay
            var result = [ // simulate result
                { header: 'Another lazy node...', items: [] },
                { header: 'A non-lazy node without children' },
                {
                    header: 'A non-lazy node with child nodes', items: [
                        { header: 'hello' },
                        { header: 'world' }
                    ]
                }
            ];
            callback(result); // return result to control
        }, 2500); // 2.5sec http delay
    }
}

const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: LazyLoadingCmp }
]);

@NgModule({
    imports: [CommonModule, routing, FormsModule, WjNavModule],
    declarations: [LazyLoadingCmp],
})
export class LazyLoadingModule {
}
