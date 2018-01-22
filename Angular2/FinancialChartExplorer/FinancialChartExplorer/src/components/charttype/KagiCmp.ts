

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcCore from 'wijmo/wijmo';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//Kagi sample component
@Component({
    selector: 'kagi-cmp',
    templateUrl: 'src/components/charttype/KagiCmp.html',
})

export class KagiCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    selectedSymbol: string;
    options: any;
    style: any;
    altStyle: any;
    title: string;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('inputNumber') inputNumber: wjcInput.InputNumber;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.title = 'Kagi';
        this.options = {
            kagi: {
                reversalAmount: 1,
                rangeMode: 'Fixed',
                fields: 'Close'
            }
        };
        this.style = {
            stroke: 'rgb(136, 189, 230)'
        };
        this.altStyle = {
            stroke: 'rgb(136, 189, 230)'
        };
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }

    chartRendered() {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = this.tooltipSvc.getFinancialTooltip;
        }
    }

    optionChanged() {
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    reversalAmountChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    rangeModeChanged(menu) {
        var reversalInput = this.inputNumber;
        if (menu.selectedValue === 'Percentage') {
            reversalInput.format = 'p0';
            reversalInput.min = 0;
            reversalInput.max = 1;
            reversalInput.value = wjcCore.clamp(reversalInput.value, 0, .05);
            reversalInput.step = 0.05;
        } else if (menu.selectedValue === 'ATR') {
            reversalInput.format = 'n0';
            reversalInput.min = 2;
            reversalInput.max = this.data.length - 2;
            reversalInput.value = wjcCore.clamp(reversalInput.value, 14, this.data.length - 2);
            reversalInput.step = 1;
        } else {
            reversalInput.format = 'n0';
            reversalInput.min = 1;
            reversalInput.max = null;
            reversalInput.value = 1;
            reversalInput.step = 1;
        }

        this.optionChanged();
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: KagiCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule, WjChartFinanceModule],
    declarations: [KagiCmp],
})
export class KagiModule {
}

