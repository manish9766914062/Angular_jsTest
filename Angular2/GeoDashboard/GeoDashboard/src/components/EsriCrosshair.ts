'use strict';

import { Component, Input } from '@angular/core';

@Component({
    selector: 'esri-crosshair',
    templateUrl: 'src/components/esriCrosshair.html'
})

export class EsriCrosshair {

    @Input() color: string;
    constructor() {
    }
}



