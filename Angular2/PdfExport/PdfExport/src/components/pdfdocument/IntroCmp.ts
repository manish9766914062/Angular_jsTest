'use strict';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-intro-cmp',
	templateUrl: 'src/components/pdfdocument/introCmp.html'
})
export class IntroCmp {
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: IntroCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [IntroCmp]
})
export class IntroModule {
}

