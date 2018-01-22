﻿import { Pipe, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as wjcCore from 'wijmo/wijmo';
@Pipe({
    name: 'glbz',
    // stateful pipe
    pure: false
})
export class GlbzPipe {
    transform(value: any, args: string[]): any {
        return wjcCore.Globalize.format(value, args[0]);
    }
}
