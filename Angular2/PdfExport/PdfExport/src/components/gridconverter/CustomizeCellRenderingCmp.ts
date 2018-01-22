'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';

import { Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

@Component({
	selector: 'gridconverter-customize-cell-rendering-cmp',
	templateUrl: 'src/components/gridconverter/customizeCellRenderingCmp.html'
})
export class CustomizeCellRenderingCmp {
	data: any[];
	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this.data = dataSvc.getData(5);
	}

	export() {
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
			maxPages: 10,
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
				}
			},
			formatItem: (args: wjcGridPdf.PdfFormatItemEventArgs) => {
				if (args.panel.cellType === wjcGrid.CellType.RowHeader) {
					args.data = (args.row + 1).toString();
				} else {
					if (args.panel.cellType === wjcGrid.CellType.Cell && args.panel.columns[args.col].binding === 'color') {
						args.style.backgroundColor = args.data;
					}
				}
			}
		});
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: CustomizeCellRenderingCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule],
	declarations: [CustomizeCellRenderingCmp]
})
export class CustomizeCellRenderingModule {
}

