'use strict';

import { Component, Input, ElementRef, Inject, ViewChild } from '@angular/core';

@Component({
    selector: 'gdash-slider',
    templateUrl: 'src/components/gdashSlider.html'
})
export class GdashSlider {

    @Input() value: number;
    @Input() color: string;
    @ViewChild('marker') marker: HTMLDivElement;

    constructor() {
    }

    ngOnChanges(changes: any) {
        if (!changes.extent) {
            return;
        }
        var value = changes.extent.currentValue;
        // calculate slider position (as a percentage)
        value = Math.log(this.value / 100);
        value = Math.min(Math.max(value, -1.5), +1.5);
        value = (value + 1.5) / 3;

        // convert to pixels
        value = value * 230 - 15;

        // apply position
        this.marker['css']['left'] = value + 'px';
    }
}



