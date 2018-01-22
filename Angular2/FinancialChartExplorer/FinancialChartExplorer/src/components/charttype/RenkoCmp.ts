

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
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//Renko sample component
@Component({
    selector: 'renko-cmp',
    templateUrl: 'src/components/charttype/RenkoCmp.html',
})

export class RenkoCmp {
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
        this.title = 'Renko';
        this.options = {
            renko: {
                boxSize: 2,
                rangeMode: 'Fixed',
                fields: 'Close'
            }
        };
        this.style = {
            stroke: 'rgb(136, 189, 230)',
            fill: 'rgba(136, 189, 230, 0.701961)'
        };
        this.altStyle = {
            stroke: 'rgb(136, 189, 230)',
            fill: 'transparent'
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

    boxSizeChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    rangeModeChanged(menu) {
        var input = this.inputNumber;
        if (menu.selectedValue === 'ATR') {
            input.format = 'n0';
            input.min = 2;
            input.max = this.data.length - 2;
            input.value = wjcCore.clamp(input.value, 14, this.data.length - 2);
            input.step = 1;
        } else {
            input.format = 'n0';
            input.min = 1;
            input.max = null;
            input.step = 1;
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
    { path: '', component: RenkoCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule, WjChartFinanceModule, WjChartInteractionModule],
    declarations: [RenkoCmp],
})
export class RenkoModule {
}

