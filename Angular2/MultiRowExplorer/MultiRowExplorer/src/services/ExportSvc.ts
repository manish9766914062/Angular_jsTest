
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGridXlsx from 'wijmo/wijmo.grid.xlsx';
import * as wjcPdf from 'wijmo/wijmo.pdf';
import * as wjcGridPdf from 'wijmo/wijmo.grid.pdf';

'use strict';

import { Injectable } from '@angular/core';

// Common data service
@Injectable()
export class ExportSvc {
    culture='';
    exportXlsx(multiRow, fileName) {
        wjcGridXlsx.FlexGridXlsxConverter.save(multiRow, null, fileName);
    }

    exportPdf(multiRow, fileName, isJapanese, customStyles) {
        var doc = new wjcPdf.PdfDocument({
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
            ended: function (sender, args) {
                wjcPdf.saveBlob(args.blob, fileName)
            }
        }),
            settings = {
                styles: {
                    cellStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#c6c6c6'
                    },
                    altCellStyle: {
                        backgroundColor: '#f9f9f9'
                    },
                    headerCellStyle: {
                        backgroundColor: '#eaeaea'
                    }
                }
            };

        if (!!customStyles) {
            settings.styles = customStyles;
        }

        // Set Japanese font for Japanese culture.
        if (isJapanese) {
            doc.registerFont({
                source: 'resources/fonts/ipaexg00201/ipaexg.ttf',
                name: 'ipaexg',
                style: 'normal',
                weight: 'normal',
                sansSerif: true
            });
            settings.styles.cellStyle['font'] = <any>new wjcPdf.PdfFont('ipaexg');
        }

        wjcGridPdf.FlexGridPdfConverter.draw(multiRow, doc, null, null, <any>settings);
        doc.end();
    }

}
