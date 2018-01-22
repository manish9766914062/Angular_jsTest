'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-fonts-cmp',
	templateUrl: 'src/components/pdfdocument/fontsCmp.html'
})
export class FontsCmp {
	export() {
		var doc = new wjcPdf.PdfDocument({
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		doc.drawText('This text uses the default document font, Times 10.');

		doc.drawText('This text uses Times Bold Oblique 20.', null, null, {
			font: new wjcPdf.PdfFont('times', 20, 'oblique', 'bold')
		});

		doc.setFont(new wjcPdf.PdfFont('helvetica'));
		doc.drawText('This text uses Helvetica 10.');
		doc.drawText('This text also uses Helvetica 10.');

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: FontsCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [FontsCmp]
})
export class FontsModule {
}

