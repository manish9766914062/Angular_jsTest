'use strict';

import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';

import { AfterViewInit, Component, Inject, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataSvc } from '../../services/DataSvc';
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';

@Component({
	selector: 'gridconverter-export-to-file-cmp',
	templateUrl: 'src/components/gridconverter/exportToFileCmp.html'
})
export class ExportToFileCmp implements AfterViewInit {
	// Reference enumerations to use them in markup.
	ExportModeEnum = wjcGridPdf.ExportMode;
	PdfPageOrientationEnum = wjcPdf.PdfPageOrientation;
	ScaleModeEnum = wjcGridPdf.ScaleMode;

	exportMode = wjcGridPdf.ExportMode.All;
	orientation = wjcPdf.PdfPageOrientation.Portrait;
	scaleMode = wjcGridPdf.ScaleMode.ActualSize;
	data: any[];

	@ViewChild('flexGrid') flexGrid: wjcGrid.FlexGrid;

	constructor(@Inject(DataSvc) dataSvc: DataSvc) {
		this.data = dataSvc.getData(25);
	}

	export() {
		wjcGridPdf.FlexGridPdfConverter.export(this.flexGrid, 'FlexGrid.pdf', {
			maxPages: 10,
			exportMode: this.exportMode,
			scaleMode: this.scaleMode,
			documentOptions: {
				pageSettings: {
					layout: this.orientation
				},
				header: {
					declarative: {
						text: '\t&[Page]\\&[Pages]'
					}
				},
				footer: {
					declarative: {
						text: '\t&[Page]\\&[Pages]'
					}
				},
				info: {
					author: 'C1',
					title: 'PdfDocument sample',
					keywords: 'PDF, C1, sample',
					subject: 'PdfDocument'
				}
			},
			styles: {
				cellStyle: {
					backgroundColor: '#ffffff',
					borderColor: '#c6c6c6'
				},
				altCellStyle: {
					backgroundColor: '#f9f9f9'
				},
				groupCellStyle: {
					backgroundColor: '#dddddd'
				},
				headerCellStyle: {
					backgroundColor: '#eaeaea'
				}
			}
		});
	}

	ngAfterViewInit() {
		if (this.flexGrid) {
			this._applyGroupBy();
		}
	}

	private _applyGroupBy() {
		var groupNames = ['Product', 'Country', 'Amount'],
			// get the collection view
			cv = this.flexGrid.collectionView;

		// start update
		cv.beginUpdate();

		// clear existing groups
		cv.groupDescriptions.clear();

		// add new groups
		for (var i = 0; i < groupNames.length; i++) {
			var propName = groupNames[i].toLowerCase(),
				groupDesc;

			if (propName == 'amount') {
				// group amounts in ranges
				// (could use the mapping function to group countries into continents, 
				// names into initials, etc)
				groupDesc = new wjcCore.PropertyGroupDescription(propName, (item, prop) => {
					var value = item[prop];
					if (value > 1000) return 'Large Amounts';
					if (value > 100) return 'Medium Amounts';
					if (value > 0) return 'Small Amounts';
					return 'Negative';
				});
				cv.groupDescriptions.push(groupDesc);
			} else if (propName) {

				// group other properties by their specific values
				groupDesc = new wjcCore.PropertyGroupDescription(propName);
				cv.groupDescriptions.push(groupDesc);
			}
		}

		// done updating
		cv.endUpdate();
	}
}

const routing: ModuleWithProviders = RouterModule.forChild([
	{ path: '', component: ExportToFileCmp }
]);

@NgModule({
	imports: [CommonModule, routing, WjGridModule, WjInputModule],
	declarations: [ExportToFileCmp]
})
export class ExportToFileModule {
}