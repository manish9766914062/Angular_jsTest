// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjChartAnimationModule } from 'wijmo/wijmo.angular2.chart.animation';
import { WjChartFinanceModule } from 'wijmo/wijmo.angular2.chart.finance';
import { WjChartAnnotationModule } from 'wijmo/wijmo.angular2.chart.annotation';
import { WjChartInteractionModule } from 'wijmo/wijmo.angular2.chart.interaction';
import { WjChartAnalyticsModule } from 'wijmo/wijmo.angular2.chart.analytics';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

// Sample components
import { GettingStartedCmp } from './components/GettingStartedCmp';
import { ChartTypesCmp } from './components/ChartTypesCmp';
import { MarkerCmp } from './components/MarkerCmp';
import { RangeSelectorCmp } from './components/RangeSelectorCmp';
import { TrendLinesCmp } from './components/TrendLinesCmp';
import { EventAnnotationCmp } from './components/EventAnnotationCmp';
import { AnimationCmp } from './components/AnimationCmp';


    'use strict';

    // The FinancialChartIntro application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })
    export class AppCmp {
        constructor() {
        }

    }


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartAnimationModule, WjChartFinanceModule,
        WjChartAnnotationModule, WjChartInteractionModule, WjChartAnalyticsModule,        
        HttpModule,BrowserModule, FormsModule, TabsModule],
    declarations: [GettingStartedCmp, ChartTypesCmp, MarkerCmp, RangeSelectorCmp, TrendLinesCmp,
        EventAnnotationCmp, AnimationCmp, AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
