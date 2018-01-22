'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';

import { Component, Inject, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

@Component({
	selector: 'gridconverter-highlight-invalid-cells-cmp',
	templateUrl: 'src/components/gridconverter/highlightInvalidCellsCmp.html'
})
export class HighlightInvalidCellsCmp  {

	showErrors = true;
	data: wjcCore.CollectionView;

	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this.data = new wjcCore.CollectionView(dataSvc.getData(10), {
			getError: function (item, property) {
				switch (property) {
					case 'amount':
						return item.amount < 1000
							? 'Cannot be less than 1,000!'
							: null;
					case 'active':
						return item.active && item.country.match(/US|UK/)
							? 'Active items are not allowed in the US or UK!'
							: null;
				}
				return null;
			}
		});
	}

	export() {
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
			documentOptions: {
				info: {
					author: 'C1',
					title: 'PdfDocument sample',
					keywords: 'PDF, C1, sample',
					subject: 'PdfDocument'
				}
			},
			styles: {
				cellStyle: {
					backgroundColor: '#ffffff',
					borderColor: '#c6c6c6'
				},
				altCellStyle: {
					backgroundColor: '#f9f9f9'
				},
				groupCellStyle: {
					backgroundColor: '#dddddd'
				},
				headerCellStyle: {
					backgroundColor: '#eaeaea'
				},
				errorCellStyle: {
					backgroundColor: 'rgba(255, 0, 0, 0.3)'
				}
			}
		});
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: HighlightInvalidCellsCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule, FormsModule],
	declarations: [HighlightInvalidCellsCmp]
})
export class HighlightInvalidCellsModule {
}