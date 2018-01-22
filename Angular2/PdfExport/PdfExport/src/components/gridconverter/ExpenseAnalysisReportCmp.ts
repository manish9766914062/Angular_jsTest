'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcChart from 'wijmo/wijmo.chart';
import * as wjcCore from 'wijmo/wijmo';
																				  
import { AfterViewInit, Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc, Employee, Total } from '../../services/DataSvc';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';

@Component({
	selector: 'gridconverter-expense-analysis-report-cmp',
	templateUrl: 'src/components/gridconverter/expenseAnalysisReportCmp.html'
})
export class ExpenseAnalysisReportCmp {
	employee: Employee;
	totals: Total[];
	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;
	@ViewChild('flexPie') flexPie: wjcChart.FlexPie;

	constructor( @Inject(DataSvc) dataSvc: DataSvc) {
		this.employee = dataSvc.getEmployees()[0];
		this.totals = dataSvc.calculateTotals(this.employee.Expenses);
	}

	export() {
		var doc = new wjcPdf.PdfDocument({
			header: {
				declarative: {
					text: 'Expense Analysis Report',
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

		this._drawEmployee(doc, this.employee, () => doc.end());
	}

	private _drawEmployee(doc: wjcPdf.PdfDocument, employee: Employee, done: Function) {
		var expenses = employee.Expenses.sort((a, b) => a.Date.getTime() - b.Date.getTime()),
			minDate = expenses[0].Date,
			maxDate = expenses[expenses.length - 1].Date,
			bold = new wjcPdf.PdfFont('times', 10, 'normal', 'bold');

		doc.moveDown(2);

		doc.drawText('Name: ', undefined, undefined, { font: bold, continued: true });
		doc.drawText(employee.Name);

		doc.drawText('From: ', undefined, undefined, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(minDate, wjcCore.DataType.String, 'd'));

		doc.drawText('To: ', undefined, undefined, { font: bold, continued: true });
		doc.drawText(wjcCore.changeType(maxDate, wjcCore.DataType.String, 'd'));

		doc.moveDown(2);
		var y = doc.y;

		doc.drawText('Expense details:', 0, y)
		doc.drawText('Total expenses by category:', doc.width * 0.5 + 20, y);
		y = doc.y;

		wjcGridPdf.FlexGridPdfConverter.draw(this.flexGrid, doc, doc.width * 0.5, null, {
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

		this.flexPie.saveImageToDataUrl(wjcChart.ImageFormat.Png, (url: string) => {
			doc.drawImage(url, doc.width * 0.5 + 20, y, { width: doc.width * 0.5 - 20 });
			done();
		});
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: ExpenseAnalysisReportCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule, WjChartModule],
	declarations: [ExpenseAnalysisReportCmp]
})
export class ExpenseAnalysisReportModule {
}