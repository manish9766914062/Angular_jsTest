'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcCore from 'wijmo/wijmo';

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'pdfdocument-drawing-graphics-cmp',
	templateUrl: 'src/components/pdfdocument/drawingGraphicsCmp.html'
})
export class DrawingGraphicsCmp {
	private readonly _sz = 100; // sample area's size.
	private readonly _c1 = new wjcCore.Color('#3173c0');
	private readonly _c2 = new wjcCore.Color('#e69500');

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

		this._sample1(doc);
		this._sample2(doc);
		this._sample3(doc);
		this._sample4(doc);
		this._sample5(doc);

		doc.end();
	}

	private _sample1(doc: wjcPdf.PdfDocument) {
		doc.drawText('Draw a series of lines with different styles: ');

		var y = doc.y + doc.lineHeight();

		// default document's pen (black color)
		doc.paths
			.moveTo(0, y)
			.lineTo(this._sz, y)
			.stroke();

		// color
		doc.paths
			.moveTo(0, y + 20)
			.lineTo(this._sz, y + 20)
			.stroke(this._c1);

		// color, line width = 3
		doc.paths
			.moveTo(0, y + 40)
			.lineTo(this._sz, y + 40)
			.stroke(new wjcPdf.PdfPen(this._c1, 3));

		// opacity color, line width = 3
		doc.paths
			.moveTo(0, y + 60)
			.lineTo(this._sz, y + 60)
			.stroke(new wjcPdf.PdfPen(wjcCore.Color.fromRgba(this._c1.r, this._c1.g, this._c1.b, 0.2), 3));

		// color, dash pattern, line width = 3
		doc.paths
			.moveTo(0, y + 80)
			.lineTo(this._sz, y + 80)
			.stroke(new wjcPdf.PdfPen(this._c1, 3, new wjcPdf.PdfDashPattern(5)));

		doc.y = y + this._sz + doc.lineHeight();
	}

	private _sample2(doc: wjcPdf.PdfDocument) {
		doc.drawText('Draw a rectangle covered with a filled curved path:');

		var y = doc.y + doc.lineHeight();

		doc.paths
			.rect(0, y, this._sz, this._sz)
			.stroke(this._c1);

		doc.paths
			.moveTo(0, y)
			.bezierCurveTo(this._sz / 2, y, this._sz / 2, this._sz + y, this._sz, this._sz + y)
			.lineTo(0, this._sz + y)
			.lineTo(0, y)
			.fill(this._c2);

		doc.y = y + this._sz + doc.lineHeight();
	}

	private _sample3(doc: wjcPdf.PdfDocument) {
		doc.drawText('Draw a rectangle, inscribe a circle into it, fill the circle with an opaque color and stroke it using a dashed line:');

		var y = doc.y + doc.lineHeight();

		doc.paths
			.rect(0, y, this._sz, this._sz)
			.fill(this._c1);

		doc.paths
			.circle(this._sz / 2, y + this._sz / 2, this._sz / 2)
			.fillAndStroke(wjcCore.Color.fromRgba(this._c2.r, this._c2.g, this._c2.b, 0.3), new wjcPdf.PdfPen(this._c2, 2, new wjcPdf.PdfDashPattern(5)));

		doc.y = y + this._sz + doc.lineHeight();
	}

	private _sample4(doc: wjcPdf.PdfDocument) {
		doc.drawText('Draw a simple pattern clipped by a circular clipping path:');

		var y = doc.y + doc.lineHeight(),
			a0 = 10;

		doc.saveState();

		// clipping path
		doc.paths
			.circle(this._sz / 2, y + this._sz / 2, this._sz / 2)
			.clip();

		// draw pattern
		for (var i = 0; i < 10; i++) {
			doc.paths
				.rect(0, y + i * a0, this._sz, a0)
				.fill(i % 2 ? this._c1 : this._c2);
		}

		doc.restoreState();

		doc.y = y + this._sz + doc.lineHeight();
	}

	private _sample5(doc: wjcPdf.PdfDocument) {
		doc.drawText('Draw a series of rectangles and rotate every rectangle by 15 degrees to the previous:');

		var y = doc.y + doc.lineHeight(),
			degrees = 15,
			samples = 90 / degrees;

		doc.saveState();

		for (var i = 0; i < samples; i++) {
			doc
				.rotate(degrees, new wjcCore.Point(this._sz / 2, y + this._sz / 2))
				.paths
				// draw rectangle as if it is inscribed into a circle with the radius of a/ 2
				.rect((this._sz - this._sz / Math.sqrt(2)) / 2, y + ((this._sz - this._sz / Math.sqrt(2)) / 2), this._sz / Math.sqrt(2), this._sz / Math.sqrt(2))
				.fill(wjcCore.Color.interpolate(this._c1, this._c2, i * (1 / (samples - 1))));
		}

		doc.restoreState();

		doc.y = y + this._sz + doc.lineHeight();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: DrawingGraphicsCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [DrawingGraphicsCmp]
})
export class DrawingGraphicsModule {
}

