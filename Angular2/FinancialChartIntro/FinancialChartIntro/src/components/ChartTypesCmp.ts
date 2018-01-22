

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, ViewChild, Inject} from '@angular/core';

import { DataSvc } from './../services/DataSvc';


//ChartTypes sample component
@Component({
    selector: 'chart-types-cmp',
    templateUrl: 'src/components/ChartTypesCmp.html'
})

export class ChartTypesCmp {
    dataSvc: DataSvc;
    data: any[];
    header: string;
    chartType: string;
    bindingY: string;
    bindingYs;
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.setDataSource();
        this.header = 'Facebook, Inc. (FB)';
        this.chartType = 'Line';
        this.bindingY = 'close';
        this.bindingYs = {
            Column: 'close',
            Line: 'close',
            Area: 'close',
            Candlestick: 'high,low,open,close',
            HighLowOpenClose: 'high,low,open,close',
            HeikinAshi: 'high,low,open,close',
            LineBreak: 'high,low,open,close',
            Renko: 'high,low,open,close',
            Kagi: 'high,low,open,close',
            ColumnVolume: 'close,volume',
            EquiVolume: 'high,low,open,close,volume',
            CandleVolume: 'high,low,open,close,volume',
            ArmsCandleVolume: 'high,low,open,close,volume'
        };
    }

    private setDataSource() {
        this.dataSvc.getData().subscribe(data => {
            this.data = data;
        });
    }

    chartRendered() {
        if (this.chart) {
            this.chart.tooltip.content = ht => {
                var dateStr = 'Date: ' + ht.x + '<br/>',
                    hlocStr = 'Open: ' + wjcCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                        'High: ' + wjcCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                        'Low: ' + wjcCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                        'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2') + '<br/>',
                    closeStr = 'Close: ' + wjcCore.Globalize.format(ht.item.close, 'n2'),
                    volStr = 'Volume: ' + wjcCore.Globalize.format(ht.item.volume, 'n0'),
                    toolTipStr;
                switch (this.chartType) {
                    case 'Line':
                    case 'Column':
                        toolTipStr = dateStr + closeStr;
                        break;
                    case 'ColumnVolume':
                        toolTipStr = dateStr + closeStr + '<br/>' + volStr;
                        break;
                    case 'EquiVolume':
                    case 'CandleVolume':
                    case 'ArmsCandleVolume':
                        toolTipStr = dateStr + hlocStr + volStr;
                        break;
                    default:
                        toolTipStr = dateStr + hlocStr;
                        break;
                }
                return toolTipStr;
            };
        }
    }

    changeType(type) {
        var type = type.selectedValue;
        this.bindingY = this.bindingYs[type];

        switch (type) {
            case 'LineBreak':
                this.chart.options = {
                    lineBreak: {
                        newLineBreaks: 3
                    }
                };
                break;
            case 'Renko':
                this.chart.options = {
                    renko: {
                        boxSize: 2,
                        rangeMode: 'Fixed',
                        fields: 'Close'
                    }
                };
                break;
            case 'Kagi':
                this.chart.options = {
                    kagi: {
                        reversalAmount: 1,
                        rangeMode: 'Fixed',
                        fields: 'Close'
                    }
                };
                break;
            default:
                break;
        }
    }
}
