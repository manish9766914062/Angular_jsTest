'use strict';

import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcCore from 'wijmo/wijmo';

import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc, Employee } from '../../services/DataSvc';

@Component({
	selector: 'pdfdocument-expense-report-cmp',
	templateUrl: 'src/components/pdfdocument/expenseReportCmp.html'
})
export class ExpenseReportCmp {
	private _dataSvc: DataSvc;
	private readonly _colWidth = 80;
	private readonly _rowHeight = 18;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this._dataSvc = dataSvc;
	}

	export() {
		var doc = new wjcPdf.PdfDocument({
			header: {
				declarative: {
					text: 'Expense Report\t&[Page]\\&[Pages]',
					font: new wjcPdf.PdfFont('times', 12),
					brush: '#bfc1c2'
				}
			},
			lineGap: 2,
			pageSettings: {
				margins: {
					left: 36,
					right: 36,
					top: 36,
					bottom: 36
				}
			},
			ended: (sender, args: wjcPdf.PdfDocumentEndedEventArgs) => {
				wjcPdf.saveBlob(args.blob, 'PdfDocument.pdf');
			}
		});

		var employees = this._dataSvc.getEmployees();
		for (var i = 0; i < employees.length; i++) {
			this._drawEmployee(doc, employees[i]);

			if (i < employees.length - 1) {
				doc.addPage();
			}
		}

		doc.end();
	}

	private _drawEmployee(doc: wjcPdf.PdfDocument, employee: Employee) {
		var expenses = employee.Expenses.sort((a, b) => a.Date.getTime() - b.Date.getTime()),
			minDate = expenses[0].Date,
			maxDate = expenses[expenses.length - 1].Date,
			columns = [
				{ header: 'Date', binding: 'Date', format: 'd' },
				{ header: 'Description', binding: 'Description', format: 'c' },
				{ header: 'Hotel', binding: 'Hotel', format: 'c' },
				{ header: 'Transport', binding: 'Transport', format: 'c' },
				{ header: 'Meal', binding: 'Meal', format: 'c' },
				{ header: 'Fuel', binding: 'Fuel', format: 'c' },
				{ header: 'Misc', binding: 'Misc', format: 'c' },
				{ header: 'Total', binding: 'Total', format: 'c' }
			],
			bold = new wjcPdf.PdfFont('times', 10, 'normal', 'bold');

		var grandTotal = this._summarizeColumn(expenses, 'Total'),
			totals = [
				'Total',
				'',
				this._summarizeColumn(expenses, 'Hotel'),
				this._summarizeColumn(expenses, 'Transport'),
				this._summarizeColumn(expenses, 'Meal'),
				this._summarizeColumn(expenses, 'Fuel'),
				this._summarizeColumn(expenses, 'Misc'),
				grandTotal
			];

		// * draw captions *
		doc.drawText('Purpose: ', null, null, { font: bold, continued: true });
		doc.drawText(employee.Purpose);

		doc.drawText('From: ', 380, 0, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(minDate, wjcCore.DataType.String, 'd'));

		doc.drawText('To: ', 470, 0, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(maxDate, wjcCore.DataType.String, 'd'));

		doc.moveDown(2);

		var y = doc.y;
		doc.drawText('Name: ', 20, y, { font: bold, continued: true });
		doc.drawText(employee.Name);

		doc.drawText('Position: ', 190, y, { font: bold, continued: true });
		doc.drawText(employee.Position);

		doc.drawText('SSN: ', 360, y, { font: bold, continued: true });
		doc.drawText(employee.SSN);

		y = doc.y;
		doc.drawText('Department: ', 20, y, { font: bold, continued: true });
		doc.drawText(employee.Department);

		doc.drawText('Manager: ', 190, y, { font: bold, continued: true });
		doc.drawText(employee.Manager);

		doc.drawText('Employee ID: ', 360, y, { font: bold, continued: true });
		doc.drawText(employee.Id);

		doc.moveDown(2);

		// * draw table *
		doc.saveState();

		var scale = doc.width / (columns.length * this._colWidth),
			docY = doc.y;

		y = 0;

		if (scale > 1) {
			scale = 1;
		}

		doc.scale(scale, scale, new wjcCore.Point(0, docY));
		doc.translate(0, docY);

		// header
		this._renderRow(doc, y, columns, column => column.header, null, bold, '#fad9cd');

		y += this._rowHeight;

		// body
		expenses.forEach((item) => {
			this._renderRow(doc, y, columns,
				column => item[column.binding],
				column => column.format);

			y += this._rowHeight;
		});

		// footer
		this._renderRow(doc, y, totals, null, 'c', bold, '#fad9cd');

		y += this._rowHeight;

		doc.y = docY + y * scale;

		doc.restoreState();

		doc.moveDown(2);

		// * draw captions *
		doc.drawText('Subtotal: ', 400, doc.y, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(grandTotal - employee.Advance, wjcCore.DataType.String, 'c'));

		doc.drawText('Cash Advance: ', 400, doc.y, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(employee.Advance, wjcCore.DataType.String, 'c'));

		doc.drawText('Total: ', 400, doc.y, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(grandTotal, wjcCore.DataType.String, 'c'));
		doc.moveDown(2);

		this._checkLineAvailable(doc);

		var thinPen = new wjcPdf.PdfPen('#000000', 0.5)

		y = doc.y;
		var sz = doc.drawText('Employee signature:', 0, y);
		doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
		sz = doc.drawText('Date:', 300, y);
		doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);

		doc.moveDown();

		this._checkLineAvailable(doc);

		y = doc.y;
		var sz = doc.drawText('Approved by:', 0, y);
		doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
		sz = doc.drawText('Date:', 300, y);
		doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 75, doc.y).stroke(thinPen);
	}

	private _checkLineAvailable(doc: wjcPdf.PdfDocument) {
		if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
			doc.addPage();
		}
	}

	private _renderRow(doc: wjcPdf.PdfDocument,	y: number, values: any[], getter: string | ((val) => any), formatter: string | ((val) => any), font?: wjcPdf.PdfFont, brush?: string | wjcPdf.PdfBrush) {
		values.forEach((v, idx) => {
			var x = idx * this._colWidth;

			doc.paths
				.rect(x, y, this._colWidth, this._rowHeight)
				.fill(brush || '#f4b19b');

			var value = wjcCore.isFunction(getter)
				? (<Function>getter)(v)
				: v || '';

			var format = wjcCore.isFunction(formatter)
				? (<Function>formatter)(v)
				: formatter || '';

			if (value !== 'Total') {
				value = wjcCore.changeType(value, wjcCore.DataType.String, format);
			}

			doc.drawText(value, x + 3, y + 5, {
				font: font,
				height: this._rowHeight,
				width: this._colWidth
			});
		});
	}

	private _summarizeColumn(data: any[], name: string) {
		var sum = 0;

		data.forEach((item) => {
			sum += item[name]
		});

		return sum;
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: ExpenseReportCmp }
]);

@NgModule({
	imports: [CommonModule, routing],
	declarations: [ExpenseReportCmp]
})
export class ExpenseReportModule {
}

