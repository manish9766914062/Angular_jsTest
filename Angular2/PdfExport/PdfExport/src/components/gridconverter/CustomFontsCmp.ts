'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';

import { Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

@Component({
	selector: 'gridconverter-custom-fonts-cmp',
	templateUrl: 'src/components/gridconverter/customFontsCmp.html'
})
export class CustomFontsCmp {
	data: any[];
	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this.data = dataSvc.getData(5);
	}

	export() {
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf',
			{
				documentOptions: {
					header: {
						declarative: {
							text: '\t&[Page]\\&[Pages]'
						}
					},
					footer: {
						declarative: {
							text: '\t&[Page]\\&[Pages]'
						}
					},
					info: {
						author: 'C1',
						title: 'PdfDocument sample',
						keywords: 'PDF, C1, sample',
						subject: 'PdfDocument'
					}
				},
				embeddedFonts: [
					{
						source: 'resources/fonts/fira/FiraSans-Regular.ttf',
						name: 'fira',
						style: 'normal',
						weight: 'normal',
						sansSerif: true
					},
					{
						source: 'resources/fonts/fira/FiraSans-Bold.ttf',
						name: 'fira',
						style: 'normal',
						weight: 'bold',
						sansSerif: true
					}
				],
				styles: {
					cellStyle: {
						backgroundColor: '#ffffff',
						borderColor: '#c6c6c6',
						font: <any>{
							family: 'fira'
						}
					},
					altCellStyle: {
						backgroundColor: '#f9f9f9'
					},
					groupCellStyle: {
						backgroundColor: '#dddddd'
					},
					headerCellStyle: {
						backgroundColor: '#eaeaea'
					}
				}
			});
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: CustomFontsCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule],
	declarations: [CustomFontsCmp]
})
export class CustomFontsModule {
}

