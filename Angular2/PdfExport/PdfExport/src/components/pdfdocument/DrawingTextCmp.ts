'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-drawing-text-cmp',
	templateUrl: 'src/components/pdfdocument/drawingTextCmp.html'
})
export class DrawingTextCmp {
	export() {
		var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia.',
			doc = new wjcPdf.PdfDocument({
				header: {
					height: 0 // no header 
				},
				footer: {
					height: 0 // no footer
				},
				ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
					wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
				}
			});

		var bold = new wjcPdf.PdfFont();
		bold.weight = 'bold';

		doc.drawText('This text is aligned to left (default):', null, null, { font: bold});
		doc.drawText(lorem);
		doc.moveDown();

		doc.drawText('This text is aligned to right:', null, null, { font: bold });
		doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Right });
		doc.moveDown();

		doc.drawText('This text is centered:', null, null, { font: bold });
		doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Center });
		doc.moveDown();

		doc.drawText('This text is justified:', null, null, { font: bold });
		doc.drawText(lorem, null, null, { align: wjcPdf.PdfTextHorizontalAlign.Justify });
		doc.moveDown();

		doc.drawText('This text is wrapped and clipped by a rectangle of dimensions 100x100:', null, null, { font: bold });
		doc.drawText(lorem, null, null, { width: 100, height: 100 });

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingTextCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingTextCmp]
})
export class DrawingTextModule {
}

