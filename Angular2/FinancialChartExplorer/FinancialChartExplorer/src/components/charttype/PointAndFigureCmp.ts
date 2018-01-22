

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

//Point&Figure sample component
@Component({
    selector: 'pointAndFigure-cmp',
    templateUrl: 'src/components/charttype/PointAndFigureCmp.html',
})

export class PointAndFigureCmp {
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
    @ViewChild('boxSize') boxSize: wjcInput.InputNumber;
    @ViewChild('reversal') reversal: wjcInput.InputNumber;
    @ViewChild('period') period: wjcInput.InputNumber;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.setDataSource();
        this.title = 'Point & Figure';
        this.options = {
            pointAndFigure: {
                boxSize: 1,
                reversal: 3,
                scaling: 'Traditional',
                fields: 'Close',
                period: 20
            }
        };
        this.style = {
            stroke: 'black'
        };
        this.altStyle = {
            stroke: 'red'
        };
    }

    selectedSymbolChanged() {
        this.setDataSource();
    }

    chartRendered() {
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = '{x:d}<br/>{y}';
        }
    }

    optionChanged() {
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    inputNumberChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || (input.max && input.value > input.max)) {
            return;
        }
        if (this.chart) {
            this.chart.invalidate();
        }
    }

    scalingChanged(menu) {
        this.boxSize.isDisabled = menu.selectedValue != 'Fixed';
        this.period.isDisabled = menu.selectedValue != 'Dynamic';
        this.optionChanged();
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            for (var i = 0; i < data.length; i++) {
                if (!wjcCore.isDate(data[i].date)){
                    data[i].date = wjcCore.Globalize.parseDate(data[i].date, 'MM/dd/yy');
                }  
            }
            this.data = data;
        });
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: PointAndFigureCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, WjInputModule, WjChartFinanceModule, WjChartInteractionModule],
    declarations: [PointAndFigureCmp],
})
export class PointAndFigureModule {
}

