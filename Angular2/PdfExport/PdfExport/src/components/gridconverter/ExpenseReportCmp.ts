'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';

import { AfterViewInit, Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc, Employee } from '../../services/DataSvc';

@Component({
	selector: 'gridconverter-expense-report-cmp',
	templateUrl: 'src/components/gridconverter/expenseReportCmp.html'
})
export class ExpenseReportCmp {
	private _dataSvc: DataSvc;

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
				wjcPdf.saveBlob(args.blob, 'FlexGrid.pdf');
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
				{ header: 'Date', binding: 'Date', width: 105 },
				{ header: 'Description', binding: 'Description', format: 'c', width: 105 },
				{ header: 'Hotel', binding: 'Hotel', format: 'c', width: 105 },
				{ header: 'Transport', binding: 'Transport', format: 'c', width: 105 },
				{ header: 'Meal', binding: 'Meal', format: 'c', width: 105 },
				{ header: 'Fuel', binding: 'Fuel', format: 'c', width: 105 },
				{ header: 'Misc', binding: 'Misc', format: 'c', width: 105 },
				{ header: 'Total', binding: 'Total', format: 'c', width: 105 }
			],
			bold = new wjcPdf.PdfFont('times', 10, 'normal', 'bold'),
			thinPen = new wjcPdf.PdfPen('#000000', 0.5);

		var grandTotal = this._summarizeColumn(expenses, 'Total');

		try {
			// * setup FlexGrid *
			var grid = new wjcGrid.FlexGrid('#grid'),
				footer = new wjcGrid.FlexGrid('#footer');

			grid.initialize({
				autoGenerateColumns: false,
				allowMerging: wjcGrid.AllowMerging.All,
				columns: columns,
				headersVisibility: wjcGrid.HeadersVisibility.Column,
				itemsSource: expenses
			});

			footer.initialize({
				allowMerging: wjcGrid.AllowMerging.All,
				autoGenerateColumns: false,
				headersVisibility: wjcGrid.HeadersVisibility.None,
				columns: columns,
				itemsSource: [{
					Date: null,
					Decsription: null,
					Hotel: this._summarizeColumn(expenses, 'Hotel'),
					Transport: this._summarizeColumn(expenses, 'Transport'),
					Meal: this._summarizeColumn(expenses, 'Meal'),
					ParkingRate: this._summarizeColumn(expenses, 'ParkingRate'),
					Misc: this._summarizeColumn(expenses, 'Misc'),
					Total: grandTotal,
				}]
			});

			footer.cells.setCellData(0, 'Date', 'Total', false);
			footer.cells.setCellData(0, 'Description', 'Total', false);
			footer.cells.rows[0].allowMerging = true;

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

			// * draw FlexGrid *
			wjcGridPdf.FlexGridPdfConverter.draw(grid, doc, doc.width, null, {
				styles: {
					cellStyle: {
						backgroundColor: '#ffffff',
						borderColor: '#c6c6c6'
					},
					altCellStyle: {
						backgroundColor: '#f9f9f9'
					},
					groupCellStyle: {
						font: <any>{ weight: 'bold' },
						backgroundColor: '#dddddd'
					},
					headerCellStyle: {
						backgroundColor: '#eaeaea'
					}
				}
			});

			wjcGridPdf.FlexGridPdfConverter.draw(footer, doc, doc.width, null, {
				styles: {
					cellStyle: {
						font: <any>{ weight: 'bold' },
						backgroundColor: '#dddddd',
						borderColor: '#c6c6c6'
					}
				}
			});

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

			y = doc.y;
			var sz = doc.drawText('Employee signature: ', 0, y);
			doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
			sz = doc.drawText('Date: ', 300, y);
			doc.paths.moveTo(300 + sz.size.width + 5, doc.y).lineTo(300 + sz.size.width + 100, doc.y).stroke(thinPen);
			doc.moveDown();

			this._checkLineAvailable(doc);

			y = doc.y;
			sz = doc.drawText('Approved by: ', 0, y);
			doc.paths.moveTo(sz.size.width, doc.y).lineTo(sz.size.width + 150, doc.y).stroke(thinPen);
			sz = doc.drawText('Date: ', 300, y);
			doc.paths.moveTo(300 + sz.size.width, doc.y).lineTo(300 + sz.size.width + 100, doc.y).stroke(thinPen);
		}
		finally {
			if (grid) {
				grid.dispose();
			}

			if (footer) {
				footer.dispose();
			}
		}
	}

	private _checkLineAvailable(doc: wjcPdf.PdfDocument) {
		if (doc.height - doc.y < doc.lineHeight() + doc.lineGap) {
			doc.addPage();
		}
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