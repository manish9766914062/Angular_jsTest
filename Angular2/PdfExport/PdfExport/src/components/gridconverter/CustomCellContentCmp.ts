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
	selector: 'gridconverter-custom-cell-content-cmp',
	templateUrl: 'src/components/gridconverter/customCellContentCmp.html'
})
export class CustomCellContentCmp {
	data: any[];
	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	private _exportSettings: wjcGridPdf.IFlexGridExportSettings = {
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
		}
	}

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this.data = dataSvc.getData(5);
	}

	export() {
		this._exportSettings.customCellContent = false;
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
	}

	export2() {
		this._exportSettings.customCellContent = true;
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
	}

	export3() {
		this._exportSettings.customCellContent = false;
		this._exportSettings.formatItem = this._formatCountryCell;
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', this._exportSettings);
		this._exportSettings.formatItem = null;
	}

	private _formatCountryCell(args: wjcGridPdf.PdfFormatItemEventArgs) {
		// if this is a regular grid cell...
		if (args.panel.cellType === wjcGrid.CellType.Cell) {
			// ... that belongs to the 'country' column
			if (args.panel.columns[args.col].binding === 'country') {
				var
					// get cell with custom content produced by a cell template or grid.formatItem handler
					cell = args.getFormattedCell(),
					// bound rectangle of cell's content area
					contentRect = args.contentRect,
					// construct flag image url based on country name passed in args.data 
					flagUrl = 'resources/' + args.data + '.png',
					// calculate flag's image size and position
					imageHeight = contentRect.height / 2,
					imageWidth = imageHeight * 3 / 2,
					imageTop = contentRect.top + (contentRect.height - imageHeight) / 2;

				// draw flag image
				args.canvas.drawImage(flagUrl, contentRect.left, imageTop, {
					height: imageHeight, width: imageWidth
				});
				// Draw custom cell text retrieved using the cell.textContent property,
				// right to the image and in the args.textTop vertical position. The latter
				// works because we draw text using default cell font.
				args.canvas.drawText(cell.textContent.trim(), contentRect.left + imageWidth + 3, args.textTop);
				// cancel standard cell content drawing
				args.cancel = true;
			}
		}
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: CustomCellContentCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule],
	declarations: [CustomCellContentCmp]
})
export class CustomCellContentModule {
}

