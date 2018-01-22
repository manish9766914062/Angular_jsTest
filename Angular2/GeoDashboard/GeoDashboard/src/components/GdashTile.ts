'use strict';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'gdash-tile',
    templateUrl: 'src/components/gdashTile.html',

})
export class GdashTile {

    @Input() header: string;
    @Output() click = new EventEmitter<any>();

    constructor() {
    }

    changeTitle() {
        this.click.emit();
    }
}



