'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-drawing-images-cmp',
	templateUrl: 'src/components/pdfdocument/drawingImagesCmp.html'
})
export class DrawingImagesCmp {
	export() {
		var doc = new wjcPdf.PdfDocument({
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

		var image = 'resources/wijmo1.png';

		doc.drawText('This image is rendered in its original size:');
		doc.drawImage(image);
		doc.moveDown();

		doc.drawText('This image is scaled to fit the width of 100:');
		doc.drawImage(image, null, null, { width: 100 });
		doc.moveDown();

		doc.drawText('This image is scaled to fit the height of 25:');
		doc.drawImage(image, null, null, { height: 25 });
		doc.moveDown();

		doc.drawText('This image is stretched to fit a rectangle of dimensions 100x25:');
		doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
		doc.drawImage(image, null, null, {
			width: 100,
			height: 25
		});
		doc.moveDown();

		doc.drawText('This image is centered and stretched proportionally to fit a rectangle of dimensions 100x25:');
		doc.paths.rect(doc.x, doc.y, 100, 25).stroke();
		doc.drawImage(image, null, null, {
			width: 100,
			height: 25,
			stretchProportionally: true,
			align: wjcPdf.PdfImageHorizontalAlign.Center
		});

		doc.end();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingImagesCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingImagesCmp]
})
export class DrawingImagesModule {
}

