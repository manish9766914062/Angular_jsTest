import { EventEmitter } from '@angular/core';
export declare class GdashTile {
    header: string;
    click: EventEmitter<any>;
    constructor();
    changeTitle(): void;
}
