'use strict';
import * as wjcCore from 'wijmo/wijmo';
import { Component, EventEmitter, enableProdMode, NgModule, Inject } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Routes, RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import { WjGaugeModule } from 'wijmo/wijmo.angular2.gauge';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { BulletsCmp } from './components/bullets.component';
import { ChartCmp } from './components/chart.component';
import { ProductCmp } from './components/product.component';
import { SparkLinesCmp } from './components/sparkLines.component';
import { Product } from './services/Product';
import { DataSvc } from './services/DataSvc';
//// AppCmp  component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    qStart = new Date().getFullYear() + '-Q1';
    qThis: string;
    dataSvc: DataSvc;
    loading = true;
    error = null;
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
        this.dataSvc = dataSvc;
        this.qThis = dataSvc.qThis;
        wjcCore.httpRequest('GetData.ashx', {
            success: (xhr) => {
                this.loading = false;
                let data = JSON.parse(xhr.response);
                this.qStart = data.startYear + '-Q1';
                // get products, chart data
                for (var i = 0; i < data.products.length; i++) {
                    var p = new Product(data.products[i]);
                    this.dataSvc.products.push(p);
                }

                // update chart data (sales per product in this quarter)
                this.dataSvc.chartData = [];
                for (var i = 1; i < this.dataSvc.products.length; i++) {
                    var p2 = this.dataSvc.products[i];
                    this.dataSvc.chartData.push({ product: p2.name, sales: p2.sales.qThis });
                }
                if (this.dataSvc.loadingSucceed) {
                    this.dataSvc.loadingSucceed();
                }
            },
            error: (xhr) => {
                this.error = 'Error downloading data from the server'
            }
        });
        dataSvc.loadingSucceed = () => {
            this.qStart = dataSvc.qStart;
            this.loading = false;
        };
    }
}

export const routes: Routes = [
    { path: '', redirectTo: 'bullets', pathMatch: 'full' },
    { path: 'bullets', component: BulletsCmp },
    { path: 'chart', component: ChartCmp },
    { path: 'product/:id', component: ProductCmp }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
    imports: [BrowserModule, WjCoreModule, WjGaugeModule, WjChartModule, routing, HttpModule],
    declarations: [AppCmp, SparkLinesCmp, BulletsCmp, ChartCmp, ProductCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application
platformBrowserDynamic().bootstrapModule(AppModule);