'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';

@Component({
	selector: 'pdfdocument-drawing-tables-cmp',
	templateUrl: 'src/components/pdfdocument/drawingTablesCmp.html'
})
export class DrawingTablesCmp {
	private _dataSvc: DataSvc;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this._dataSvc = dataSvc;
	}

	export() {
		var doc = new wjcPdf.PdfDocument({
			header: {
				height: 0
			},
			footer: {
				height: 0
			},
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		var colWidth = 100,
			rowHeight = 18,
			data = this._dataSvc.getData(50),
			dataKeyMap = ['id', 'product', 'country'],
			y = 0;

		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < 3; j++) {
				var x = j * colWidth;

				doc.paths
					.rect(x, y, colWidth, rowHeight)
					.stroke();

				doc.drawText(data[i][dataKeyMap[j]] + '', x + 2, y + 2, {
					height: rowHeight,
					width: colWidth
				});
			}

			y += rowHeight;

			if (y >= doc.height) {
				y = 0;
				doc.addPage();
			}
		}

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingTablesCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingTablesCmp]
})
export class DrawingTablesModule {
}

