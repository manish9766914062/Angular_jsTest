

import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Injectable } from '@angular/core';

// Application tooltip service.
@Injectable()
export class TooltipSvc {

    getTooltip(ht) {
        var date = ht.item && ht.item.date ? ht.item.date : null,
            content = '';
        if (wjcCore.isDate(date)) {
            date = wjcCore.Globalize.formatDate(date, 'MM/dd/yy');
        }

        if (ht && ht.item) {
            content =
                '<b>' + ht.name + '</b><br/>' +
                'Date: ' + date + '<br/>' +
                'Y: ' + wjcCore.Globalize.format(ht.y, 'n2');
        }

        if (ht && ht.item && ht.item.volume) {
            content +=
                '<br/>' +
                'Volume: ' + wjcCore.Globalize.format(ht.item.volume, 'n0');
        }

        return content;
    }

    getFinancialTooltip(ht) {
        var date = ht.item && ht.item.date ? ht.item.date : null,
            content = '';

        if (wjcCore.isDate(date)) {
            date = wjcCore.Globalize.formatDate(date, 'MM/dd/yy');
        }

        if (ht && ht.item) {
            content =
                '<b>' + ht.name + '</b><br/>' +
                'Date: ' + date + '<br/>' +
                'Open: ' + wjcCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                'High: ' + wjcCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                'Low: ' + wjcCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                'Volume: ' + wjcCore.Globalize.format(ht.item.volume, 'n0');
        }

        return content;
    }
    
}
