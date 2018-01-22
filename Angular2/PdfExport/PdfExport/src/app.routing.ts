'use strict';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export type RouteTree = { section: string, routes: Routes }[];
// Application route tree. "data.caption" defines captions for navigation links in markup.
export const routeTree: RouteTree = [
	{
		section: 'FlexGridPdfConverter',
		routes: [
			{
				path: '',
				redirectTo: 'gridconverter/intro',
				pathMatch: 'full'
			},
			{
				path: 'gridconverter/intro',
				data: { caption: 'Introduction' },
				loadChildren: 'src/components/gridconverter/IntroCmp#IntroModule'
			},
			{
				path: 'gridconverter/exporttofile',
				data: { caption: 'Export to a file' },
				loadChildren: 'src/components/gridconverter/ExportToFileCmp#ExportToFileModule'
			},
			{
				path: 'gridconverter/exporttodoc',
				data: { caption: 'Export to PdfDocument' },
				loadChildren: 'src/components/gridconverter/ExportToDocCmp#ExportToDocModule'
			},
			{
				path: 'gridconverter/customfonts',
				data: { caption: 'Custom fonts' },
				loadChildren: 'src/components/gridconverter/CustomFontsCmp#CustomFontsModule'
			},
			{
				path: 'gridconverter/expensereport',
				data: { caption: 'Expense report' },
				loadChildren: 'src/components/gridconverter/ExpenseReportCmp#ExpenseReportModule'
			},
			{
				path: 'gridconverter/expenseanalysisreport',
				data: { caption: 'Expense analysis report' },
				loadChildren: 'src/components/gridconverter/ExpenseAnalysisReportCmp#ExpenseAnalysisReportModule'
			},
			{
				path: 'gridconverter/customcellcontent',
				data: { caption: 'Custom cell content' },
				loadChildren: 'src/components/gridconverter/CustomCellContentCmp#CustomCellContentModule'
			},
			{
				path: 'gridconverter/customizecellrendering',
				data: { caption: 'Customize cell rendering' },
				loadChildren: 'src/components/gridconverter/CustomizeCellRenderingCmp#CustomizeCellRenderingModule'
			},
			{
				path: 'gridconverter/drawingcellsmanually',
				data: { caption: 'Drawing cells manually' },
				loadChildren: 'src/components/gridconverter/DrawingCellsManuallyCmp#DrawingCellsManuallyModule'
			},
			{
				path: 'gridconverter/highlightinvalidcells',
				data: { caption: 'Highlight invalid cells' },
				loadChildren: 'src/components/gridconverter/HighlightInvalidCellsCmp#HighlightInvalidCellsModule'
			}
		]
	},
	{
		section: 'PdfDocument',
		routes: [
			{
				path: 'pdfdocument/intro',
				data: { caption: 'Introduction' },
				loadChildren: 'src/components/pdfdocument/IntroCmp#IntroModule'
			},
			{
				path: 'pdfdocument/pagestructure',
				data: { caption: 'Page structure' },
				loadChildren: 'src/components/pdfdocument/PageStructureCmp#PageStructureModule'
			},
			{
				path: 'pdfdocument/drawinggraphics',
				data: { caption: 'Drawing graphics' },
				loadChildren: 'src/components/pdfdocument/DrawingGraphicsCmp#DrawingGraphicsModule'
			},
			{
				path: 'pdfdocument/drawingtext',
				data: { caption: 'Drawing text' },
				loadChildren: 'src/components/pdfdocument/DrawingTextCmp#DrawingTextModule'
			},
			{
				path: 'pdfdocument/fonts',
				data: { caption: 'Fonts' },
				loadChildren: 'src/components/pdfdocument/FontsCmp#FontsModule'
			},
			{
				path: 'pdfdocument/customfonts',
				data: { caption: 'Custom fonts' },
				loadChildren: 'src/components/pdfdocument/CustomFontsCmp#CustomFontsModule'
			},
			{
				path: 'pdfdocument/richtext',
				data: { caption: 'Rich text' },
				loadChildren: 'src/components/pdfdocument/RichTextCmp#RichTextModule'
			},
			{
				path: 'pdfdocument/drawingimages',
				data: { caption: 'Drawing images' },
				loadChildren: 'src/components/pdfdocument/DrawingImagesCmp#DrawingImagesModule'
			},
			{
				path: 'pdfdocument/runningtitles',
				data: { caption: 'Running titles' },
				loadChildren: 'src/components/pdfdocument/RunningTitlesCmp#RunningTitlesModule'
			},
			{
				path: 'pdfdocument/drawingtables',
				data: { caption: 'Drawing tables' },
				loadChildren: 'src/components/pdfdocument/DrawingTablesCmp#DrawingTablesModule'
			},
			{
				path: 'pdfdocument/expensereport',
				data: { caption: 'Expense report' },
				loadChildren: 'src/components/pdfdocument/ExpenseReportCmp#ExpenseReportModule'
			},
			{
				path: 'pdfdocument/drawingflexpie',
				data: { caption: 'Drawing FlexPie (raster image)' },
				loadChildren: 'src/components/pdfdocument/DrawingFlexPieCmp#DrawingFlexPieModule'
			},
			{
				path: 'pdfdocument/drawingflexpiesvg',
				data: { caption: 'Drawing FlexPie (SVG)' },
				loadChildren: 'src/components/pdfdocument/DrawingFlexPieSvgCmp#DrawingFlexPieSvgModule'
			}
		]
	}
];

// Flattens RouteTree to an array of Route(s).
function getRoutes(routeTree: RouteTree): Routes {
	return routeTree.reduce((prev, cur, idx) => {
		return prev.concat(cur.routes);
	}, <Routes>[]);
}

export const routing: ModuleWithProviders =
	RouterModule.forRoot(getRoutes(routeTree), { useHash: true });
