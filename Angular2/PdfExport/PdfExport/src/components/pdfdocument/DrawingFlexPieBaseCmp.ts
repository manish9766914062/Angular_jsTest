'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcChart from 'wijmo/wijmo.chart';

import { Component } from '@angular/core';
import { DataSvc } from '../../services/DataSvc';

// Base class for all components demonstrating FlexPie control export.
@Component({
	selector: '',
	templateUrl: ''
})
export abstract class DrawingFlexPieBaseCmp {
	private _dataSvc: DataSvc;
	private _imgFormat: wjcChart.ImageFormat;

	constructor(dataSvc: DataSvc, format: wjcChart.ImageFormat) {
		this._dataSvc = dataSvc;
		this._imgFormat = format;
	}

	export() {
		var doc = new wjcPdf.PdfDocument(
			{
				ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
					wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
				}
			}),
			data = this._dataSvc.getExpenses(),
			flexPie = new wjcChart.FlexPie('#pie'),
			renderingImageFlag = false;

		try {
			flexPie.initialize({
				itemsSource: [
					{ name: 'Hotel', value: this._summarizeColumn(data, 'Hotel') },
					{ name: 'Transport', value: this._summarizeColumn(data, 'Transport') },
					{ name: 'Meal', value: this._summarizeColumn(data, 'Meal') },
					{ name: 'Fuel', value: this._summarizeColumn(data, 'Fuel') },
					{ name: 'Misc', value: this._summarizeColumn(data, 'Misc') }
				],
				binding: 'value',
				bindingName: 'name',
				innerRadius: 0.75,
				dataLabel: {
					content: '{value:c1}',
					position: wjcChart.PieLabelPosition.Inside
				},
				rendered: (sender: wjcChart.FlexChartBase, args) => {
					if (!renderingImageFlag) {
						renderingImageFlag = true;

						try {
							sender.saveImageToDataUrl(this._imgFormat, (url: string) => {
								flexPie.dispose();

								doc.drawText('Total expenses by category:');
								this._renderImage(doc, url);

								doc.end();
							});
						} catch (ex) {
							flexPie.dispose();
						}
					}
				}
			});
		} catch (ex) {
			flexPie.dispose();
		}
	}

	protected abstract _renderImage(area: wjcPdf.PdfPageArea, url: string): void;

	private _summarizeColumn(data: any[], name: string) {
		var sum = 0;

		data.forEach((item) => {
			sum += item[name]
		});

		return sum;
	}
}


