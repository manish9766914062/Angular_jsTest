

import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcInput from 'wijmo/wijmo.input';



'use strict';

import { Component, EventEmitter, Inject, ViewChild, Input, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartFinanceAnalyticsModule } from 'wijmo/wijmo.angular2.chart.finance.analytics';

import { DataSvc } from './../../services/DataSvc';
import { TooltipSvc } from './../../services/TooltipSvc';

//Indicators sample component
@Component({
    selector: 'indicators-cmp',
        templateUrl: 'src/components/analytics/IndicatorsCmp.html',
})

export class IndicatorsCmp {
    dataSvc: DataSvc;
    tooltipSvc: TooltipSvc;
    dataList: any[];
    item: string;
    data: any[];
    title: string;
    selectedSymbol: string;
    indicators: any[];
    selectedIndicator: string;
    properties: any;
    // references control in the view
    @ViewChild('chart') chart: wjcChartFinance.FinancialChart;
    @ViewChild('indicatorChart') indicatorChart: wjcChartFinance.FinancialChart;

    constructor( @Inject(DataSvc) dataSvc: DataSvc, @Inject(TooltipSvc) tooltipSvc: TooltipSvc) {
        this.data = [];
        this.dataSvc = dataSvc;
        this.tooltipSvc = tooltipSvc;
        this.dataList = dataSvc.getDataList();
        this.indicators = dataSvc.getIndicatorList();
        this.selectedSymbol = this.dataList[0].symbol;
        this.selectedIndicator = this.indicators[0].abbreviation;
        this.setDataSource();
        this.title = 'Indicators';
        this.properties = {
            // ATR, CCI, RSI, Williams %R
            atrPeriod: 14,
            cciPeriod: 20,
            rsiPeriod: 14,
            williamsRPeriod: 14,

            // MACD
            fastPeriod: 12,
            slowPeriod: 26,
            smoothingPeriod: 9,
            macdStyles: {   // named styles
                macdLine: {
                    stroke: '#bfa554'
                },
                signalLine: {
                    stroke: '#bf8c54'
                }
            },

            // Fast Stochastic
            stochKPeriod: 14,
            stochDPeriod: 3,
            stochSmoothingPeriod: 1,
            stochStyles: {   // named styles
                kLine: {
                    stroke: '#eddd46'
                },
                dLine: {
                    stroke: '#edb747'
                }
            }
        };
    }

    selectedSymbolChanged(s, e) {
        this.setDataSource();
    }

    chartRendered(s, e) {
        var tooltip = this.tooltipSvc.getFinancialTooltip;
        // customize tooltips
        if (this.chart) {
            this.chart.tooltip.content = tooltip;
        }
        if (this.indicatorChart) {
            this.indicatorChart.tooltip.content = tooltip;
        }
        if (this.chart && this.indicatorChart && !isNaN(this.chart.axisX.actualMax) 
                && !isNaN(this.chart.axisX.actualMin)) {
            this.indicatorChart.axisX.max = this.chart.axisX.actualMax;
            this.indicatorChart.axisX.min = this.chart.axisX.actualMin;
        }
    }
    
    fastSlowPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, smoothing;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        smoothing = props.smoothingPeriod;

        props.fastPeriod = wjcCore.clamp(props.fastPeriod, 2, Math.abs(len - smoothing));
        props.slowPeriod = wjcCore.clamp(props.slowPeriod, 2, Math.abs(len - smoothing));
    }

    smoothingPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.max(props.fastPeriod, props.slowPeriod);
        props.smoothingPeriod = wjcCore.clamp(props.smoothingPeriod, 2, Math.abs(len - max));
    }

    stochKPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochDPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochKPeriod = wjcCore.clamp(props.stochKPeriod, 2, max);
    }

    stochDPeriodChanged() {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod);
        if (props.stochSmoothingPeriod > 1) {
            max -= props.stochSmoothingPeriod;
        }
        props.stochDPeriod = wjcCore.clamp(props.stochDPeriod, 2, max);
    }

    stochSmoothingPeriodChanged(input: wjcInput.InputNumber) {
        var data = this.data,
            props = this.properties,
            len, max;

        if (data.length <= 0 || input.value <= 1) {
            return;
        }
        len = data.length;
        max = Math.abs(len - props.stochKPeriod - props.stochDPeriod);
        max = max || 1;
        props.stochSmoothingPeriod = wjcCore.clamp(input.value, 1, max);
    }

    private setDataSource() {
        var symbol = this.selectedSymbol;

        this.dataSvc.getData(symbol).subscribe(data => {
            this.data = data;
        });
    }

    atrPeriodChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.atrPeriod = input.value;
    }

    rsiPeriodChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.rsiPeriod = input.value;
    }

    cciPeriodChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.cciPeriod = input.value;
    }

    wrPeriodChanged(input: wjcInput.InputNumber) {
        if (input.value < input.min || input.value > input.max) {
            return;
        }
        this.properties.williamsRPeriod = input.value;
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: IndicatorsCmp }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing,
        WjInputModule, WjChartModule, WjChartFinanceModule, WjChartFinanceAnalyticsModule],
    declarations: [IndicatorsCmp],
})
export class IndicatorsModule {
}

