'use strict';
import { Component, EventEmitter, enableProdMode, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

import { HomeCmp } from './components/home.component';
import { ProductsCmp } from './components/products.component';
import { CustomersCmp } from './components/customers.component';
import { EmployeesCmp } from './components/employees.component';
//// AppCmp  component.
@Component({
    selector: 'app-cmp',
    templateUrl: 'src/app.html'
})
export class AppCmp {
    title: 'Wijmo';
    constructor() {
    }
}

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeCmp },
    { path: 'products', component: ProductsCmp },
    { path: 'customers', component: CustomersCmp },
    { path: 'employees', component: EmployeesCmp }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
    imports: [BrowserModule, routing, WjGridModule, WjInputModule],
    declarations: [AppCmp, HomeCmp, ProductsCmp, CustomersCmp, EmployeesCmp],
    providers: [],
    bootstrap: [AppCmp]
})
export class AppModule {
}

enableProdMode();
// Bootstrap application
platformBrowserDynamic().bootstrapModule(AppModule);