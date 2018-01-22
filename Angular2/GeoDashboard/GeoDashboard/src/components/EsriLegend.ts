'use strict';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'esri-legend',
    templateUrl: 'src/components/esriLegend.html'
})
export class EsriLegend {
    @Input() source: any;

    constructor() {
    }
}



