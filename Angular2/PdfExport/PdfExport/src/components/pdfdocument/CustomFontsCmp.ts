'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-custom-fonts-cmp',
	templateUrl: 'src/components/pdfdocument/customFontsCmp.html'
})
export class CustomFontsCmp {
	export() {
		var doc = new wjcPdf.PdfDocument({
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		doc.registerFont({
			source: 'resources/fonts/fira/FiraSans-Regular.ttf',
			name: 'fira',
			style: 'normal',
			weight: 'normal',
			sansSerif: true
		});

		doc.registerFont({
			source: 'resources/fonts/fira/FiraSans-Bold.ttf',
			name: 'fira',
			style: 'normal',
			weight: 'bold',
			sansSerif: true
		});

		doc.drawText('Here is the standard Times font.');

		var font = new wjcPdf.PdfFont('fira');
		doc.drawText('Here is the FiraSans-Regular font.', null, null, { font: font });

		font.weight = 'bold';
		doc.drawText('Here is the FiraSans-Bold font.', null, null, { font: font });

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: CustomFontsCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [CustomFontsCmp]
})
export class CustomFontsModule {
}

