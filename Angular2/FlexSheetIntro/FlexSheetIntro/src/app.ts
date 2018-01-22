import * as wjcGridSheet from 'wijmo/wijmo.grid.sheet';
import * as wjcInput from 'wijmo/wijmo.input';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';





// Angular
import { Component, EventEmitter, Inject, enableProdMode, ViewChild, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { WjGridSheetModule } from 'wijmo/wijmo.angular2.grid.sheet';
import { WjInputModule } from 'wijmo/wijmo.angular2.input';
import { TabsModule } from './components/AppTab';
import { DataSvc } from './services/DataSvc';

    'use strict';

    // The Explorer application root component.
    @Component({
        selector: 'app-cmp',
        templateUrl: 'src/app.html'
    })
    export class AppCmp {
        protected dataSvc: DataSvc;
        data: any[];
        sortManager: wjcGridSheet.SortManager;
        columns: string[];
        fonts: any[];
        fontSizeList: any[];
        selectionFormatState: wjcGridSheet.IFormatState;
        selection: any = {
            content: '',
            position: '',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '8px'
        };
        mergeState: any;
        isFrozen: boolean = false;
        undoStack: wjcGridSheet.UndoStack;
        currentCellData: any;
        fileName: string;
        tableStyleNames = null;
        selectedTable: wjcGridSheet.Table = null;

        private _format = '';
        private _updatingSelection = false;
        private _applyFillColor = false;

        // references FlexSheet named 'flexSheetIntro' in the view
        @ViewChild('flexSheetIntro') flexSheetIntro: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'sortSheet' in the view
        @ViewChild('sortSheet') sortSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'formatSheet' in the view
        @ViewChild('formatSheet') formatSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'mergeCellSheet' in the view
        @ViewChild('mergeCellSheet') mergeCellSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'dragDropSheet' in the view
        @ViewChild('dragDropSheet') dragDropSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'frozenSheet' in the view
        @ViewChild('frozenSheet') frozenSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'undoSheet' in the view
        @ViewChild('undoSheet') undoSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'formulaSheet' in the view
        @ViewChild('formulaSheet') formulaSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'customFuncSheet' in the view
        @ViewChild('customFuncSheet') customFuncSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'tableSheet' in the view
        @ViewChild('tableSheet') tableSheet: wjcGridSheet.FlexSheet;

        // references FlexSheet named 'excelIOSheet' in the view
        @ViewChild('excelIOSheet') excelIOSheet: wjcGridSheet.FlexSheet;

        // references Combobox named 'cboFontName' in the view
        @ViewChild('cboFontName') cboFontName: wjcInput.ComboBox;

        // references Combobox named 'cboFontSize' in the view
        @ViewChild('cboFontSize') cboFontSize: wjcInput.ComboBox;

        // references Combobox named 'cboTableStyles' in the view
        @ViewChild('cboTableStyles') cboTableStyles: wjcInput.ComboBox;

        // references Combobox named 'cboFontSize' in the view
        @ViewChild('colorPicker') colorPicker: wjcInput.ColorPicker;

        constructor(@Inject(DataSvc) dataSvc: DataSvc) {
            this.dataSvc = dataSvc;
            this.data = dataSvc.getData(50);
            this.fonts = [{ name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
                { name: 'Arial Black', value: '"Arial Black", Gadget, sans-serif' },
                { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
                { name: 'Courier New', value: '"Courier New", Courier, monospace' },
                { name: 'Georgia', value: 'Georgia, serif' },
                { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
                { name: 'Lucida Console', value: '"Lucida Console", Monaco, monospace' },
                { name: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif' },
                { name: 'Palatino Linotype', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
                { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
                { name: 'Segoe UI', value: '"Segoe UI", "Roboto", sans-serif' },
                { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
                { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
                { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' }];
            this.fontSizeList = [{ name: '8', value: '8px' }, { name: '9', value: '9px' }, { name: '10', value: '10px' },
                { name: '11', value: '11px' }, { name: '12', value: '12px' }, { name: '14', value: '14px' },
                { name: '16', value: '16px' }, { name: '18', value: '18px' }, { name: '20', value: '20px' },
                { name: '22', value: '22px' }, { name: '24', value: '24px' }];
            this.selectionFormatState = {};
            this.mergeState = {};
        }

        // Gets or sets _format for the formatSheet.
        get format(): string {
            return this._format;
        }
        set format(value: string) {
            if (this._format !== value) {
                this._format = value;
                if (!this._updatingSelection) {
                    this.formatSheet.applyCellsStyle({ format: this._format });
                }
            }
        }

        flexSheetInit(flexSheetIntro: wjcGridSheet.FlexSheet) {
            let self = this;

            if (flexSheetIntro) {
                flexSheetIntro.deferUpdate(() => {
                    flexSheetIntro.selectedSheetIndex = 0;
                    flexSheetIntro.selectedSheet.itemsSource = self.data;
                    self._initDataMapForBindingSheet(flexSheetIntro);
                });
            }
        }

        sortSheetInit(sortSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (sortSheet) {
                sortSheet.deferUpdate(() => {
                    sortSheet.selectedSheetIndex = 0;
                    sortSheet.selectedSheet.itemsSource = self.data;
                    self._initDataMapForBindingSheet(sortSheet);
                    self.sortManager = sortSheet.sortManager;
                    self.columns = self._getColumns(sortSheet);
                });

                sortSheet.selectedSheetChanged.addHandler(() => {
                    self.columns = self._getColumns(sortSheet);
                    if (!self.sortManager) {
                        self.sortManager = sortSheet.sortManager;
                    }
                });
            }
        }

        formatSheetInit(formatSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (formatSheet) {
                formatSheet.deferUpdate(() => {
                    let sheetIdx,
                        sheetName,
                        colIdx,
                        rowIdx,
                        date;

                    for (sheetIdx = 0; sheetIdx < formatSheet.sheets.length; sheetIdx++) {
                        formatSheet.selectedSheetIndex = sheetIdx;
                        sheetName = formatSheet.selectedSheet.name;
                        for (colIdx = 0; colIdx < formatSheet.columns.length; colIdx++) {
                            for (rowIdx = 0; rowIdx < formatSheet.rows.length; rowIdx++) {
                                if (sheetName === 'Number') {
                                    formatSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                                } else {
                                    date = new Date(2015, colIdx, rowIdx + 1);
                                    formatSheet.setCellData(rowIdx, colIdx, date);
                                }
                            }
                        }
                    }
                    formatSheet.selectedSheetIndex = 0;
                    self._updateSelection(formatSheet, formatSheet.selection);
                });

                formatSheet.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
                    self._updateSelection(formatSheet, args.range);
                    self.selectionFormatState = formatSheet.getSelectionFormatState();
                });
            }
        }

        mergeCellSheetInit(mergeCellSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (mergeCellSheet) {
                mergeCellSheet.deferUpdate(() => {
                    let colIdx,
                        rowIdx;

                    for (colIdx = 0; colIdx < mergeCellSheet.columns.length; colIdx++) {
                        for (rowIdx = 0; rowIdx < mergeCellSheet.rows.length; rowIdx++) {
                            mergeCellSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        }
                    }
                });
                mergeCellSheet.selectionChanged.addHandler(() => {
                    self.mergeState = mergeCellSheet.getSelectionFormatState();
                });
            }
        }

        dragDropSheetInit(dragDropSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (dragDropSheet) {
                dragDropSheet.deferUpdate(() => {
                    let colIdx,
                        rowIdx;
                        
                    for (colIdx = 0; colIdx < dragDropSheet.columns.length; colIdx++) {
                        for (rowIdx = 0; rowIdx < dragDropSheet.rows.length; rowIdx++) {
                            dragDropSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        }
                    }
                    dragDropSheet.applyCellsStyle({ fontWeight: 'bold' }, [new wjcGrid.CellRange(0, 0, 5, 0),
                        new wjcGrid.CellRange(6, 1, 11, 1)]);
                    dragDropSheet.applyCellsStyle({ textDecoration: 'underline' }, [new wjcGrid.CellRange(0, 2, 5, 2),
                        new wjcGrid.CellRange(6, 3, 11, 3)]);
                    dragDropSheet.applyCellsStyle({ fontStyle: 'italic' }, [new wjcGrid.CellRange(0, 4, 5, 4),
                        new wjcGrid.CellRange(6, 5, 11, 5)]);
                    dragDropSheet.applyCellsStyle({ format: 'c2' }, [new wjcGrid.CellRange(0, 0, 5, 7)]);
                    dragDropSheet.applyCellsStyle({ backgroundColor: '#4488CC' }, [new wjcGrid.CellRange(0, 0, 11, 0),
                        new wjcGrid.CellRange(0, 2, 11, 2), new wjcGrid.CellRange(0, 4, 11, 4)]);
                    dragDropSheet.applyCellsStyle({ color: '#CC8844' }, [new wjcGrid.CellRange(0, 1, 11, 1),
                        new wjcGrid.CellRange(0, 3, 11, 3), new wjcGrid.CellRange(0, 5, 11, 5)]);
                    dragDropSheet.applyCellsStyle({ color: '#336699' }, [new wjcGrid.CellRange(0, 6, 5, 7)]);
                    dragDropSheet.applyCellsStyle({ backgroundColor: '#996633' }, [new wjcGrid.CellRange(6, 6, 11, 7)]);
                });
            }
        }

        frozenSheetInit(frozenSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (frozenSheet) {
                frozenSheet.deferUpdate(() => {
                    let colIdx,
                        rowIdx;

                    for (colIdx = 0; colIdx < frozenSheet.columns.length; colIdx++) {
                        for (rowIdx = 0; rowIdx < frozenSheet.rows.length; rowIdx++) {
                            frozenSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        }
                    }
                });

                frozenSheet.selectedSheetChanged.addHandler(() => {
                    if (frozenSheet.frozenColumns > 0 || frozenSheet.frozenRows > 0) {
                        self.isFrozen = true;
                    } else {
                        self.isFrozen = false;
                    }
                });
            }
        }

        undoSheetInit(undoSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (undoSheet) {
                undoSheet.deferUpdate(() => {
                    let colIdx, rowIdx;
                    self.undoStack = undoSheet.undoStack;

                    for (colIdx = 0; colIdx < undoSheet.columns.length; colIdx++) {
                        for (rowIdx = 0; rowIdx < undoSheet.rows.length; rowIdx++) {
                            undoSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                        }
                    }
                });
            }
        }

        formulaSheetInit(formulaSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (formulaSheet) {
                formulaSheet.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
                    let selection = args.range;
                    if (selection.isValid) {
                        self.currentCellData = formulaSheet.getCellData(selection.row, selection.col, true);
                    }
                });
                formulaSheet.deferUpdate(() => {
                    self._generateExpenceReport(formulaSheet);
                });
            }
        }

        customFuncSheetInit(customFuncSheet: wjcGridSheet.FlexSheet) {
            if (customFuncSheet) {
                customFuncSheet.addFunction('customSumProduct', (...params: any[][][]) => {
                    let result = 0,
                        range1 = params[0],
                        range2 = params[1];

                    if (range1.length > 0 && range1.length === range2.length && range1[0].length === range2[0].length) {
                        for (let i = 0; i < range1.length; i++) {
                            for (let j = 0; j < range1[0].length; j++) {
                                result += range1[i][j] * range2[i][j];
                            }
                        }
                    }
                    return result;
                }, 'Custom SumProduct Function', 2, 2);

                customFuncSheet.unknownFunction.addHandler((sender: any, e: wjcGridSheet.UnknownFunctionEventArgs) => {
                    let result = '';
                    if (e.params) {
                        for (let i = 0; i < e.params.length; i++) {
                            result += e.params[i];
                        }
                    }
                    e.value = result;
                });

                customFuncSheet.deferUpdate(() => {
                    for (let i = 0; i < customFuncSheet.sheets.length; i++) {
                        customFuncSheet.sheets.selectedIndex = i;
                        switch (customFuncSheet.sheets[i].name) {
                            case 'Custom Function':
                                customFuncSheet.setCellData(0, 0, '=customSumProduct(Data!A1:B5, Data!B1:C5)');
                                customFuncSheet.setCellData(1, 0, '=customFunc(1, "B", 3)');
                                break;
                            case 'Data':
                                for (let ri = 0; ri < customFuncSheet.rows.length; ri++) {
                                    for (let ci = 0; ci < 3; ci++) {
                                        customFuncSheet.setCellData(ri, ci, ri + ci);
                                    }
                                }
                                break;
                        }
                    }
                    customFuncSheet.selectedSheetIndex = 0;
                });
            }
        }

        tableSheetInit(tableSheet: wjcGridSheet.FlexSheet) {
            var tableStyle: wjcGridSheet.TableStyle,
                table: wjcGridSheet.Table,
                i: number,
                self = this;

            self.tableStyleNames = [];
            for (i = 1; i <= 21; i++) {
                self.tableStyleNames.push('TableStyleLight' + i);
            }
            for (i = 1; i <= 28; i++) {
                self.tableStyleNames.push('TableStyleMedium' + i);
            }
            for (i = 1; i <= 11; i++) {
                self.tableStyleNames.push('TableStyleDark' + i);
            }

            tableStyle = tableSheet.getBuiltInTableStyle('TableStyleDark9');
            table = tableSheet.addTableFromDataSource(2, 1, self.dataSvc.getTableData(10), 'Table1', tableStyle, { showTotalRow: true });

            tableSheet.selectionChanged.addHandler((sender: any, args: wjcGrid.CellRangeEventArgs) => {
                var selection = args.range;
                if (selection.isValid) {
                    self._getSelectedTable(selection, tableSheet);
                } else {
                    self.selectedTable = null;
                }
            });

            tableSheet.updatedLayout.addHandler(() => {
                if (tableSheet.selection && tableSheet.selection.isValid) {
                    self._getSelectedTable(tableSheet.selection, tableSheet);
                } else {
                    self.selectedTable = null;
                }
            });
        }

        cboTableStylesInit(cboTableStyles: wjcInput.ComboBox) {
            var self = this;
            if (cboTableStyles) {
                cboTableStyles.selectedIndexChanged.addHandler(() => {
                    // apply the table style for the selected table
                    if (self.selectedTable) {
                        var tableStyle = self.tableSheet.getBuiltInTableStyle(cboTableStyles.selectedValue);
                        self.selectedTable.style = tableStyle;
                    }
                });
                if (self.selectedTable) {
                    cboTableStyles.selectedValue = self.selectedTable.style.name;
                }
            }
        }

        excelIOSheetInit(excelIOSheet: wjcGridSheet.FlexSheet) {
            let self = this;

            if (excelIOSheet) {
                excelIOSheet.deferUpdate(() => {
                    let sheetIdx,
                        sheetName,
                        colIdx,
                        rowIdx;

                    // initialize the dataMap for the bound sheet.
                    if (excelIOSheet) {
                        for (sheetIdx = 0; sheetIdx < excelIOSheet.sheets.length; sheetIdx++) {
                            excelIOSheet.selectedSheetIndex = sheetIdx;
                            sheetName = excelIOSheet.selectedSheet.name;
                            if (sheetName === 'Country') {
                                excelIOSheet.selectedSheet.itemsSource = self.data;
                                self._initDataMapForBindingSheet(excelIOSheet);
                            } else {
                                for (colIdx = 0; colIdx < excelIOSheet.columns.length; colIdx++) {
                                    for (rowIdx = 0; rowIdx < excelIOSheet.rows.length; rowIdx++) {
                                        excelIOSheet.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                                    }
                                }
                            }
                        }
                        excelIOSheet.selectedSheetIndex = 0;
                    }
                });
            }
        }

        cboFontNameInit(cboFontName: wjcInput.ComboBox) {
            let self = this;

            if (cboFontName) {
                cboFontName.selectedIndexChanged.addHandler(() => {
                    // apply the font family for the selected cells
                    if (!self._updatingSelection) {
                        self.formatSheet.applyCellsStyle({ fontFamily: cboFontName.selectedItem.value });
                    }
                });
            }
        }

        cboFontSizeInit(cboFontSize: wjcInput.ComboBox) {
            let self = this;

            if (cboFontSize) {
                cboFontSize.selectedIndexChanged.addHandler(() => {
                    // apply the font size for the selected cells
                    if (!self._updatingSelection) {
                        self.formatSheet.applyCellsStyle({ fontSize: cboFontSize.selectedItem.value });
                    }
                });
            }
        }

        colorPickerInit(colorPicker: wjcInput.ColorPicker) {
            let self = this,
                ua = window.navigator.userAgent,
                blurEvt: string;

            if (colorPicker) {
                // if the browser is firefox, we should bind the blur event. (TFS #124387)
                // if the browser is IE, we should bind the focusout event. (TFS #124500)
                blurEvt = /firefox/i.test(ua) ? 'blur' : 'focusout';
                // Hide the color picker control when it lost the focus.
                colorPicker.hostElement.addEventListener(blurEvt, () => {
                    setTimeout(() => {
                        if (!colorPicker.containsFocus()) {
                            self._applyFillColor = false;
                            colorPicker.hostElement.style.display = 'none';
                        }
                    }, 0);
                });

                // Initialize the value changed event handler for the color picker control.
                colorPicker.valueChanged.addHandler(() => {
                    if (self._applyFillColor) {
                        self.formatSheet.applyCellsStyle({ backgroundColor: colorPicker.value });
                    } else {
                        self.formatSheet.applyCellsStyle({ color: colorPicker.value });
                    }
                });
            }
        }

        // commit the sorts
        commitSort() {
            this.sortManager.commitSort();
        };

        // cancel the sorts
        cancelSort() {
            this.sortManager.cancelSort();
        };

        // add new sort level
        addSortLevel() {
            this.sortManager.addSortLevel();
        };

        // delete current sort level
        deleteSortLevel() {
            this.sortManager.deleteSortLevel();
        };

        // copy a new sort level by current sort level setting.
        copySortLevel() {
            this.sortManager.copySortLevel();
        };

        // move the sort level
        moveSortLevel(offset) {
            this.sortManager.moveSortLevel(offset);
        };

        // apply column index property for sort item
        applySortColumnIndex(e, sortItem) {
            sortItem.columnIndex = +e.target.value;
        }

        // apply asceding property for sort item
        applySortAscending(e, sortItem) {
            if (e.target.value === 'true') {
                sortItem.ascending = true;
            } else {
                sortItem.ascending = false;
            }
        }

        // apply the text alignment for the selected cells
        applyCellTextAlign(textAlign) {
            if (this.formatSheet) {
                this.formatSheet.applyCellsStyle({ textAlign: textAlign });
                this.selectionFormatState.textAlign = textAlign;
            }
        }

        // apply the bold font weight for the selected cells
        applyBoldStyle() {
            if (this.formatSheet) {
                this.formatSheet.applyCellsStyle({ fontWeight: this.selectionFormatState.isBold ? 'none' : 'bold' });
                this.selectionFormatState.isBold = !this.selectionFormatState.isBold;
            }
        }

        // apply the underline text decoration for the selected cells
        applyUnderlineStyle() {
            if (this.formatSheet) {
                this.formatSheet.applyCellsStyle({ textDecoration: this.selectionFormatState.isUnderline ? 'none' : 'underline' });
                this.selectionFormatState.isUnderline = !this.selectionFormatState.isUnderline;
            }
        }

        // apply the italic font style for the selected cells
        applyItalicStyle() {
            if (this.formatSheet) {
                this.formatSheet.applyCellsStyle({ fontStyle: this.selectionFormatState.isItalic ? 'none' : 'italic' });
                this.selectionFormatState.isItalic = !this.selectionFormatState.isItalic;
            }
        }

        // show the color picker control.
        showColorPicker (e, isFillColor) {
            let offset = this._cumulativeOffset(e.target);

            if (this.colorPicker) {
                this.colorPicker.hostElement.style.display = 'inline';
                this.colorPicker.hostElement.style.left = offset.left + 'px';
                this.colorPicker.hostElement.style.top = (offset.top - this.colorPicker.hostElement.clientHeight - 5) + 'px';
                this.colorPicker.hostElement.focus();
            }

            this._applyFillColor = isFillColor;
        };

        mergeCells() {
            if (this.mergeCellSheet) {
                this.mergeCellSheet.mergeRange();
                this.mergeState = this.mergeCellSheet.getSelectionFormatState();
            }
        }

        freezeCells() {
            if (this.frozenSheet) {
                this.frozenSheet.freezeAtCursor();

                if (this.frozenSheet.frozenColumns > 0 || this.frozenSheet.frozenRows > 0) {
                   this.isFrozen = true;
                } else {
                    this.isFrozen = false;
                }
            }
        }

        // Excutes undo command.
        undo () {
            this.undoSheet.undo();
        }

        // Excutes redo command.
        redo () {
            this.undoSheet.redo();
        }

        // Load xlsx file to FlexSheet.
        load () {
            let flexSheet = this.excelIOSheet,
                fileInput = <HTMLInputElement>document.getElementById('importFile');
            if (flexSheet && fileInput.files[0]) {
                flexSheet.load(fileInput.files[0]);
            }
        }

        // Save FlexSheet to xlsx file.
        save () {
            let flexSheet = this.excelIOSheet,
                fileName;
            if (flexSheet) {
                if (!!this.fileName) {
                    fileName = this.fileName;
                } else {
                    fileName = 'FlexSheet.xlsx';
                }
                flexSheet.save(fileName);
            }
        }

        private _getColumns(flexSheet: wjcGridSheet.FlexSheet): string[] {
            let columns = [],
                i = 0;
            if (flexSheet) {
                for (; i < flexSheet.columns.length; i++) {
                    columns.push('Column ' + wjcGridSheet.FlexSheet.convertNumberToAlpha(i));
                }
            }
            return columns;
        }

        // initialize the dataMap for the bound sheet.
        private _initDataMapForBindingSheet(flexSheet: wjcGridSheet.FlexSheet) {
            let column;

            if (flexSheet) {
                column = flexSheet.columns.getColumn('countryId');
                if (column && !column.dataMap) {
                    column.dataMap = this._buildDataMap(this.dataSvc.countries);
                }
                column = flexSheet.columns.getColumn('productId');
                if (column && !column.dataMap) {
                    column.width = 100;
                    column.dataMap = this._buildDataMap(this.dataSvc.products);
                }
                column = flexSheet.columns.getColumn('amount');
                if (column) {
                    column.format = 'c2';
                }
            }
        }

        // build a data map from a string array using the indices as keys
        private _buildDataMap(items: any[]) {
            let map = [];
            for (let i = 0; i < items.length; i++) {
                map.push({ key: i, value: items[i] });
            }
            return new wjcGrid.DataMap(map, 'key', 'value');
        }

        // Update the selection object of the scope.
        private _updateSelection(flexSheet: wjcGridSheet.FlexSheet, sel: wjcGrid.CellRange) {
            let row = flexSheet.rows[sel.row],
                rowCnt = flexSheet.rows.length,
                colCnt = flexSheet.columns.length,
                r,
                c,
                cellStyle,
                cellContent,
                cellFormat;

            this._updatingSelection = true;
            if (sel.row > -1 && sel.col > -1 && rowCnt > 0 && colCnt > 0
                && sel.col < colCnt && sel.col2 < colCnt
                && sel.row < rowCnt && sel.row2 < rowCnt) {
                r = sel.row >= rowCnt ? rowCnt - 1 : sel.row;
                c = sel.col >= colCnt ? colCnt - 1 : sel.col;
                cellContent = flexSheet.getCellData(sel.row, sel.col, false);
                cellStyle = flexSheet.selectedSheet.getCellStyle(sel.row, sel.col);
                if (cellStyle) {
                    this.cboFontName.selectedIndex = this._checkFontfamily(cellStyle.fontFamily);
                    this.cboFontSize.selectedIndex = this._checkFontSize(cellStyle.fontSize);
                    cellFormat = cellStyle.format;
                } else {
                    this.cboFontName.selectedIndex = 0;
                    this.cboFontSize.selectedIndex = 5;
                }

                if (!!cellFormat) {
                   this.format = cellFormat;
                } else {
                    if (wjcCore.isInt(cellContent)) {
                        this.format = '0';
                    } else if (wjcCore.isNumber(cellContent)) {
                        this.format = 'n2';
                    } else if (wjcCore.isDate(cellContent)) {
                        this.format = 'd';
                    }
                }
            }
            this._updatingSelection = false;
        }

        // check font family for the font name combobox of the ribbon.
        private _checkFontfamily(fontFamily) {
            let fonts = this.fonts,
                fontIndex = 0,
                font;

            if (!fontFamily) {
                return fontIndex;
            }
            for (; fontIndex < fonts.length; fontIndex++) {
                font = fonts[fontIndex];
                if (font.name === fontFamily || font.value === fontFamily) {
                    return fontIndex;
                }
            }
            return 10;
        }

        // check font size for the font size combobox of the ribbon.
        private _checkFontSize(fontSize) {
            let sizeList = this.fontSizeList,
                index = 0,
                size;

            if (fontSize == undefined) {
                return 5;
            }
            for (; index < sizeList.length; index++) {
                size = sizeList[index];
                if (size.value === fontSize || size.name === fontSize) {
                    return index;
                }
            }
            return 5;
        }

        // Get selected table in FlexSheet.
        private _getSelectedTable(selection: wjcGrid.CellRange, flexSheet: wjcGridSheet.FlexSheet) {
            this.selectedTable = flexSheet.selectedSheet.findTable(selection.row, selection.col);
            if (this.selectedTable && this.cboTableStyles) {
                var tableStyle = flexSheet.getBuiltInTableStyle(this.selectedTable.style.name);
                if (tableStyle) {
                    this.cboTableStyles.selectedValue = tableStyle.name;
                }
            }
        }

         // Get the absolute position of the dom element.
        private _cumulativeOffset(element): any {
            let top = 0, left = 0, scrollTop = 0, scrollLeft = 0;

            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                scrollTop += element.scrollTop || 0;
                scrollLeft += element.scrollLeft || 0;
                element = element.offsetParent;
            } while (element && !(element instanceof HTMLBodyElement));

            scrollTop += document.body.scrollTop || document.documentElement.scrollTop;
            scrollLeft += document.body.scrollLeft || document.documentElement.scrollLeft;

            return {
                top: top - scrollTop,
                left: left - scrollLeft
            };
        }

        // Set content for the use case template sheet.
        private _generateExpenceReport(flexSheet: wjcGridSheet.FlexSheet) {
            flexSheet.setCellData(1, 1, 'Expense Report');
            flexSheet.setCellData(3, 1, 'Date');
            flexSheet.setCellData(3, 2, 'Fuel');
            flexSheet.setCellData(3, 3, 'Parking(per hour)');
            flexSheet.setCellData(3, 4, 'Parking(hours)');
            flexSheet.setCellData(3, 5, 'Total');;
            flexSheet.setCellData(9, 1, 'Total');
            flexSheet.setCellData(10, 4, 'Subtotal');
            flexSheet.setCellData(11, 4, 'Cash Advances');
            flexSheet.setCellData(12, 4, 'Total');

            this._setExpenseData(flexSheet);

            this._applyStyleForExpenceReport(flexSheet);
        }

        // set expense detail data for the use case template sheet.
        private _setExpenseData(flexSheet: wjcGridSheet.FlexSheet) {
            let rowIndex,
                colIndex,
                value;

            for (rowIndex = 4; rowIndex <= 8; rowIndex++) {
                for (colIndex = 2; colIndex <= 5; colIndex++) {
                    if (colIndex === 5) {
                        flexSheet.setCellData(rowIndex, colIndex, '=C' + (rowIndex + 1) + ' + Product(C' + (rowIndex + 1) + ':D' + (rowIndex + 1) + ')');
                    } else if (colIndex === 4) {
                        value = Math.ceil(7 * Math.random());
                        flexSheet.setCellData(rowIndex, colIndex, value);
                    } else if (colIndex === 3) {
                        flexSheet.setCellData(rowIndex, colIndex, 3.75);
                    } else {
                        value = 200 * Math.random();
                        flexSheet.setCellData(rowIndex, colIndex, value);
                    }
                }
            }

            flexSheet.setCellData(4, 1, '2015-3-1');
            flexSheet.setCellData(5, 1, '2015-3-3');
            flexSheet.setCellData(6, 1, '2015-3-7');
            flexSheet.setCellData(7, 1, '2015-3-11');
            flexSheet.setCellData(8, 1, '2015-3-18');
            flexSheet.setCellData(9, 2, '=Sum(C5:C9)');
            flexSheet.setCellData(9, 4, '=Sum(Product(D5:E5), Product(D6:E6), Product(D7:E7), Product(D8:E8), Product(D9:E9))');
            flexSheet.setCellData(9, 5, '=Sum(F5:F9)');
            flexSheet.setCellData(10, 5, '=F13-F12');
            flexSheet.setCellData(11, 5, 800);
            flexSheet.setCellData(12, 5, '=F10');
        }

        // Apply styles for the use case template sheet.
        private _applyStyleForExpenceReport(flexSheet: wjcGridSheet.FlexSheet) {
            flexSheet.columns[0].width = 10;
            flexSheet.columns[1].width = 90;
            flexSheet.columns[2].width = 80;
            flexSheet.columns[3].width = 140;
            flexSheet.columns[4].width = 120;
            flexSheet.columns[5].width = 80;
            for (let i = 2; i <= 3; i++) {
                flexSheet.columns[i].format = 'c2';
            }
            flexSheet.columns[5].format = 'c2';
            flexSheet.rows[1].height = 45;
            flexSheet.applyCellsStyle({
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#696964'
            }, [new wjcGrid.CellRange(1, 1, 1, 3)]);
            flexSheet.mergeRange(new wjcGrid.CellRange(1, 1, 1, 3));
            flexSheet.applyCellsStyle({
                fontWeight: 'bold',
                backgroundColor: '#FAD9CD',
            }, [new wjcGrid.CellRange(3, 1, 3, 5),
                    new wjcGrid.CellRange(9, 1, 9, 5)]);
            flexSheet.applyCellsStyle({
                textAlign: 'center'
            }, [new wjcGrid.CellRange(3, 1, 3, 5)]);
            flexSheet.applyCellsStyle({
                format: 'c2'
            }, [new wjcGrid.CellRange(9, 4, 9, 4)]);
            flexSheet.applyCellsStyle({
                backgroundColor: '#F4B19B'
            }, [new wjcGrid.CellRange(4, 1, 8, 5)]);
            flexSheet.applyCellsStyle({
                fontWeight: 'bold',
                textAlign: 'right'
            }, [new wjcGrid.CellRange(10, 4, 12, 4)]);
        }
    }


@NgModule({
    imports: [WjInputModule, WjGridSheetModule, BrowserModule, FormsModule, TabsModule],
    declarations: [AppCmp],
    providers: [DataSvc],
    bootstrap: [AppCmp]
})
export class AppModule {
}


enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
