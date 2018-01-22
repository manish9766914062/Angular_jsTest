'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-running-titles-cmp',
	templateUrl: 'src/components/pdfdocument/runningTitlesCmp.html'
})
export class RunningTitlesCmp {
	export() {
		var doc = new wjcPdf.PdfDocument({
			header: {
				declarative: {
					text: '\tTitle\t&[Page]',
					font: new wjcPdf.PdfFont('helvetica', 10, 'normal', 'bold')
				}
			},
			footer: {
				declarative: {
					text: '\t&[Page]\\&[Pages]',
					brush: '#3173c0',
					font: new wjcPdf.PdfFont('helvetica', 10, 'normal', 'bold')
				}
			},
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		doc.drawText('Lorem ipsum');

		doc.addPage();
		doc.drawText('Lorem ipsum');

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: RunningTitlesCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [RunningTitlesCmp]
})
export class RunningTitlesModule {
}

