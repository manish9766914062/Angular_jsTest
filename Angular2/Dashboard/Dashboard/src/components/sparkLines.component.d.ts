import { SimpleChange } from '@angular/core';
export declare class SparkLinesCmp {
    value: any;
    width: string;
    height: string;
    lines: any[];
    constructor();
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    private _getSparklines(data);
    private _scaleY(value, min, max);
}
