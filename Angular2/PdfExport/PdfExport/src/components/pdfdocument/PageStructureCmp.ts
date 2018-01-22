'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-page-structure-cmp',
	templateUrl: 'src/components/pdfdocument/pageStructureCmp.html'
})
export class PageStructureCmp {
	export() {
		var doc = new wjcPdf.PdfDocument({
			pageSettings: {
				layout: wjcPdf.PdfPageOrientation.Portrait,
				size: wjcPdf.PdfPageSize.Letter,
				margins: {
					left: 72,
					top: 72,
					right: 72,
					bottom: 72
				}
			},
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		// stroke areas
		doc.header.paths
			.rect(0, 0, doc.header.width, doc.header.height)
			.stroke();

		doc.paths
			.rect(0, 0, doc.width, doc.height)
			.stroke();

		doc.footer.paths
			.rect(0, 0, doc.footer.width, doc.footer.height)
			.stroke();

		// write descriptions
		doc.header.drawText('Header');
		doc.drawText('Body');
		doc.footer.drawText('Footer')

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: PageStructureCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [PageStructureCmp]
})
export class PageStructureModule {
}

