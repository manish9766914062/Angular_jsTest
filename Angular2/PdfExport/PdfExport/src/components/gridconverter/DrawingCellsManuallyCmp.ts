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
	selector: 'gridconverter-drawing-cells-manually-cmp',
	templateUrl: 'src/components/gridconverter/drawingCellsManuallyCmp.html'
})
export class DrawingCellsManuallyCmp {
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
			customCellContent: true,
			formatItem: (args: wjcGridPdf.PdfFormatItemEventArgs) => {
				if (args.panel.cellType === wjcGrid.CellType.Cell) {
					if (args.panel.columns[args.col].binding === 'country') {
						var r = args.contentRect,
							sz = args.canvas.measureText(args.data, args.style.font, {
								height: r.height,
								width: r.width
							}),
							imageHeight = r.height / 2,
							imageWidth = imageHeight * 3 / 2,
							imageTop = r.top + (r.height - imageHeight) / 2,
							textTop = r.top + (r.height - sz.size.height) / 2;

						// draw flag image
						args.canvas.drawImage('resources/' + args.data + '.png', r.left, imageTop, {
							height: imageHeight,
							width: imageWidth
						});

						// draw text
						args.canvas.drawText(args.data, r.left + imageWidth + 3, textTop, {
							brush: args.style.color,
							font: args.style.font,
							height: r.height,
							width: r.width
						});

						// cancel standard cell content drawing
						args.cancel = true;
					}
				}
			}
		});
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingCellsManuallyCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule],
	declarations: [DrawingCellsManuallyCmp]
})
export class DrawingCellsManuallyModule {
}

