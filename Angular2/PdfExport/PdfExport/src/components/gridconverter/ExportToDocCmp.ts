'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';

import { AfterViewInit, Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

@Component({
	selector: 'gridconverter-export-to-doc-cmp',
	templateUrl: 'src/components/gridconverter/exportToDocCmp.html'
})
export class ExportToDocCmp {
	data: any[];
	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	constructor(@Inject(DataSvc) dataSvc: DataSvc) {
		this.data = dataSvc.getData(10);
	}

	export() {
		var doc = new wjcPdf.PdfDocument(
			{
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
				ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
					wjcPdf.saveBlob(args.blob, 'FlexGrid.pdf')
				}
			}),
			settings: wjcGridPdf.IFlexGridDrawSettings = {
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
				}
			};

		doc.drawText('This grid is scaled to fit the width of 200 and drawn using the draw method.', null, null, { width: 200 });
		doc.moveDown();
		wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, 200, null, settings);

		doc.drawText('This grid is drawn in its original size using the drawToPosition method.', 220, 0);
		doc.moveDown();
		wjcGridPdf.FlexGridPdfConverter.drawToPosition(this.flexGrid, doc, new wjcCore.Point(220, doc.y), null, null, settings);

		doc.drawText('This grid is drawn in its original size using the draw method and is split into multiple pages.', 0, 400);
		doc.moveDown();
		wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, null, null, settings);

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: ExportToDocCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule],
	declarations: [ExportToDocCmp]
})
export class ExportToDocModule {
}