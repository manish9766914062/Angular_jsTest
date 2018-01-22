import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcChartInteraction from 'wijmo/wijmo.chart.interaction';





// Angular
import { Component, EventEmitter, Input, Inject, enableProdMode, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import {WjChartInteractionModule} from 'wijmo/wijmo.angular2.chart.interaction';
import { DataSvc } from './services/DataSvc';



    'use strict';

    // The FlexChartZoom application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })
    export class AppCmp {
        data: any[];
        mouseAction: string;
        interactiveAxes: string;
        disabled: boolean;
        isTouch: boolean;
        // references control in the view
        @ViewChild('zoomChart') zoomChart: wjcChart.FlexChart;
        @ViewChild('chartGestures') chartGestures: wjcChartInteraction.ChartGestures;

        constructor( @Inject(DataSvc) dataSvc: DataSvc) {
            dataSvc.getData().subscribe(data => {
                this.data = data;
                setTimeout(()=> {
                    this.chartGestures.posX = 0.1;
                    this.chartGestures.posY = 0.1;
                    this.chartGestures.scaleX = 0.5;
                    this.chartGestures.scaleY = 0.5;
                }, 100);
            });
            this.mouseAction = 'Zoom';
            this.interactiveAxes = 'X';
            this.isTouch = navigator.userAgent.match(/iPad/i) != null || /Android/i.test(navigator.userAgent);
        }

        ngAfterViewInit() {
            this._disableBtn(200);
        }

        resetAxes() {
            if (this.chartGestures) {
                this.chartGestures.reset();
            }
            this._disableBtn();
        }

        rangeChanged() {
            this.disabled = false;
        }

        private _disableBtn(time?) {
            window.setTimeout(() => {
                this.disabled = true;
            }, time || 20);
        }
        
    }


@NgModule({
    imports: [WjInputModule, WjChartModule, WjChartInteractionModule, HttpModule, BrowserModule, FormsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
