'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcCore from 'wijmo/wijmo';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-rich-text-cmp',
	templateUrl: 'src/components/pdfdocument/richTextCmp.html'
})
export class RichTextCmp {
	export() {
		var doc = new wjcPdf.PdfDocument(
			{
				header: {
					height: 0 // no header 
				},
				footer: {
					height: 0 // no footer
				},
				ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
					wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
				}
			}),
			c1 = new wjcCore.Color('#3173c0'),
			c2 = new wjcCore.Color('#e69500');

		// Use a bigger font to show fills and strokes clearly.
		doc.setFont(new wjcPdf.PdfFont('times', 20));

		doc.drawText('Lorem ', null, null, {
			continued: true
		});

		doc.drawText('ipsum ', null, null, {
			continued: true,
			stroke: true
		});

		doc.drawText('dolor ', null, null, {
			continued: true,
			brush: new wjcPdf.PdfSolidBrush(c1),
			fill: true,
			// Override the stroke property. The text settings are retained between drawText calls if the continued property is used.
			stroke: false
		});

		doc.drawText('sit ', null, null, {
			continued: true,
			pen: new wjcPdf.PdfPen(c2),
			fill: false,
			stroke: true
		});

		doc.drawText('amet.', null, null, {
			// A shorthand equivalent of new wijmo.pdf.PdfSolidBrush(c1)
			brush: c1,
			// A shorthand equivalent of new wijmo.pdf.PdfPen(c2)
			pen: c2,
			fill: true,
			stroke: true
		});

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: RichTextCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [RichTextCmp]
})
export class RichTextModule {
}

