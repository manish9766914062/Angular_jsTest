




'use strict';

import { Component, EventEmitter, Inject, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../services/DataSvc';

@Component({
    selector: 'home-cmp',
    templateUrl: 'src/components/homeCmp.html'
})

export class HomeCmp {
    
    constructor( @Inject(DataSvc) dataSvc: DataSvc) {
    }
}


const routing: ModuleWithProviders = RouterModule.forChild([
    { path: '', component: HomeCmp }
]);

@NgModule({
    imports: [CommonModule, routing],
    declarations: [HomeCmp],
})
export class HomeModule {
}
