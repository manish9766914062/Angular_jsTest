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
	selector: 'pdfdocument-drawing-flexpie-svg-cmp',
	templateUrl: 'src/components/pdfdocument/drawingFlexPieSvgCmp.html'
})
export class DrawingFlexPieSvgCmp extends DrawingFlexPieBaseCmp {
	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		super(dataSvc, wjcChart.ImageFormat.Svg);
	}

	protected _renderImage(area: wjcPdf.PdfPageArea, url: string) {
		area.drawSvg(url);
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingFlexPieSvgCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingFlexPieSvgCmp]
})
export class DrawingFlexPieSvgModule {
}

