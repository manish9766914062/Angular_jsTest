'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcChart from 'wijmo/wijmo.chart';

import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawingFlexPieBaseCmp } from './DrawingFlexPieBaseCmp';
import { DataSvc } from '../../services/DataSvc';

@Component({
	selector: 'pdfdocument-drawing-flexpie-cmp',
	templateUrl: 'src/components/pdfdocument/drawingFlexPieCmp.html'
})
export class DrawingFlexPieCmp extends DrawingFlexPieBaseCmp {
	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		super(dataSvc, wjcChart.ImageFormat.Png);
	}

	protected _renderImage(area: wjcPdf.PdfPageArea, url: string) {
		area.drawImage(url);
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingFlexPieCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingFlexPieCmp]
})
export class DrawingFlexPieModule {
}

