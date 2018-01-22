import { Component, Input, SimpleChange } from '@angular/core';

@Component({
    selector: 'spark-lines',
    templateUrl: './src/components/sparkLines.component.html'
})
export class SparkLinesCmp {
    @Input() value: any;
    @Input() width: string;
    @Input() height: string;
    lines = [];

    constructor() {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }): any {
        if (!this.value) return;
        this.lines = this._getSparklines(this.value);
    }

    private _getSparklines(data:any):any{
        if (!data) {
            return [];
        }
        // create line elements
        var min = Math.min.apply(Math, data),
            max = Math.max.apply(Math, data),
            x1 = 0,
            y1 = this._scaleY(data[0], min, max),
            x2, y2, svg;
        var lines = [];
        for (var i = 1; i < data.length; i++) {
            x2 = Math.round((i) / (data.length - 1) * 100);
            y2 = this._scaleY(data[i], min, max);
            lines.push({
                x1: x1 + '%',
                y1: y1 + '%',
                x2: x2 + '%',
                y2: y2 + '%'
            });
            x1 = x2;
            y1 = y2;
        }

        return lines;
    }

    private _scaleY(value: number, min: number, max: number):number {
        return 100 - Math.round((value - min) / (max - min) * 100);
    }
}