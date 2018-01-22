

import * as wjcCore from 'wijmo/wijmo';



import {Pipe} from '@angular/core';

// ToDate pipe - converts date/time string to a Date object
@Pipe({
    name: 'toDate'
})
export class ToDatePipe {
    transform(value: any, args: string[]): any {
        if (value && wjcCore.isString(value)) {
            // parse date/time using RFC 3339 pattern
            var dt = wjcCore.changeType(value, wjcCore.DataType.Date, 'r');
            if (wjcCore.isDate(dt)) {
                return dt;
            }
        }
        return value;
    }
}


