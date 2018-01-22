'use strict';

import { Injectable } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';

// Common data service
@Injectable()
export class FreezeBarSvc {

    private flex: wjcGrid.FlexGrid;
    private host: HTMLElement;
    private dragging = false;
    private freezeBar: HTMLElement;
    private freeze = -1;

    // add a freezing handle to a FlexGrid
    addFreezeBar(flex: wjcGrid.FlexGrid) {

        // create freeze handle
        var freezeBar = document.createElement('div'),
            host = flex.hostElement;

        this.dragging = false;
        this.flex = flex;
        this.host = host;
        this.freezeBar = freezeBar;
        wjcCore.addClass(freezeBar, 'freeze-bar');

        // add handle to flex
        var root = host.querySelector('[wj-part="root"]');
        root.parentElement.appendChild(freezeBar);
        this._positionfreezeBar(flex, freezeBar, flex.frozenColumns);

        // attach event handlers
        flex.columns.collectionChanged.addHandler(() => {
            this._positionfreezeBar(flex, freezeBar, flex.frozenColumns);
        });
        host.addEventListener('mousedown', this._gridMouseDown.bind(this), true);
        host.addEventListener('mousemove', this._gridMouseMove.bind(this), true);

        // stop dragging when the user releases the mouse button
        host.addEventListener('mouseup', (e) => {
            this._stopDragging(e);
        }, true);

        // stop dragging when the mouse leaves the control
        host.addEventListener('mouseleave', (e) => {
            if (e.target == host) {
                this._stopDragging(e);
            }
        }, true);
    }

    private _gridMouseDown(e: MouseEvent) {
        var el = document.elementFromPoint(e.clientX, e.clientY);
        if (el == this.freezeBar && this.flex.rows.length > 0 && this.flex.columns.length > 0) {

            // prepare to freeze
            this.flex.frozenColumns = 0;
            this.flex.scrollPosition = new wjcCore.Point(0, this.flex.scrollPosition.y);
            this.dragging = true;
            this.freeze = -1;
            this.host.style.cursor = 'col-resize';

            // done with this event
            e.preventDefault();
            e.stopPropagation();
        }
    }

    private _gridMouseMove(e: MouseEvent) {
        if (this.dragging) {

            // find closest edge
            var minDist = null;
            for (var i = 0; i <= this.flex.viewRange.col2; i++) {
                var rc = this.flex.getCellBoundingRect(0, i),
                    dist = Math.abs(rc.left - e.clientX);
                if (minDist == null || dist < minDist) {
                    minDist = dist;
                    this.freeze = i;
                }
            }

            // move element to edge
            this._positionfreezeBar(this.flex, this.freezeBar, this.freeze);

            // done with this event
            e.preventDefault();
            e.stopPropagation();
        }
    }

    // stop dragging when the button is released or when the mouse leaves the control
    private _stopDragging(e: any) {
        if (this.dragging) {
            this.dragging = false;
            if (this.freeze > -1) {
                this.flex.frozenColumns = this.freeze;
            }
            this.host.style.cursor = '';
            e.preventDefault();
            e.stopPropagation();
        } else {
            this._positionfreezeBar(this.flex, this.freezeBar, this.flex.frozenColumns);
        }
    }

    // position the freeze bar on the right of the last frozen column
    private _positionfreezeBar(flex: wjcGrid.FlexGrid, div: HTMLElement, frozen: number) {
        var left = -10;
        if (flex.columns.length > 0 && flex.rows.length > 0) {
            left = frozen > 0
                ? flex.getCellBoundingRect(0, Math.min(frozen, flex.columns.length) - 1).right
                : flex.getCellBoundingRect(0, 0).left;
        }
        left -= div.parentElement.getBoundingClientRect().left;
        div.style.left = left + 'px';
    }
}