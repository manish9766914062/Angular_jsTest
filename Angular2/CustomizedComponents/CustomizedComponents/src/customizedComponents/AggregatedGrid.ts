

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';



import { AfterViewInit, AfterContentInit, Component, Input, Type, ContentChildren, QueryList, forwardRef,
ViewChild } from '@angular/core';
import { WjGridModule, WjFlexGridColumn } from 'wijmo/wijmo.angular2.grid';
import { WjCoreModule } from 'wijmo/wijmo.angular2.core';
import * as wjBase from 'wijmo/wijmo.angular2.directiveBase';
import { SelectionType } from '../cellTemplates/EditableSelectionRenderer';

// Represents the custom grid component implemented by means of aggregating the WjFlexGrid component.
@Component({
    selector: 'aggregated-grid',
    templateUrl: 'src/customizedComponents/aggregatedGrid.html'
})
export class AggregatedGrid {
    private _isEditable = true;
    // grid data source
    @Input() itemsSource: any;
    // A type of selection provided by the Select column.
    @Input() selectionType = SelectionType.Single;
    // References SelectionType enum to use it in markup.
    SelectionTypeEnum = SelectionType;
    // References aggregated FlexGrid instance
    @ViewChild('flex') flex: wjcGrid.FlexGrid;
    // A collection of column definitions.
    @ContentChildren(forwardRef(() => AggregatedGridColumn)) columns: QueryList<AggregatedGridColumn>;
    onFormatItem: (e: wjcGrid.FormatItemEventArgs) => void;

    constructor() {
        // Provide correct 'this' for the formatItem event handler.
        this.onFormatItem = this._onFormatItem.bind(this);
    }

    // Indicates whether grid cells editing is enabled.
    @Input()
    get isEditable(): boolean {
        return this._isEditable;
    }
    set isEditable(value: boolean) {
        if (this._isEditable != value) {
            this._isEditable = value;
            if (this.flex) {
                // invalidates grid to apply changes
                this.flex.invalidate();
            }
        }
    }

    // FlexGrid.formatItem event handler, enables or disables cell editing based on the isEditable property value.
    private _onFormatItem(e: wjcGrid.FormatItemEventArgs) {
        if (e.panel.cellType === wjcGrid.CellType.Cell) {
            let column = <wjcGrid.Column>this.flex.columns[e.col];
            wjcCore.enable(e.cell, this.isEditable || column.name === 'select');
        }
    }
};

// A column definition for the AggregatedGrid component, which is used as a child of aggregated-grid in markup,
// in the same way as wj-flex-grid-column components are used with wj-flex-grid.
// Exposes the same set of properties for binding in markup as wj-flex-grid-column does, plus the cellTemplate
// property that can be assigned with a type reference to a component that should be used as the column cell template.
@Component({
    selector: 'aggregated-grid-column',
    template: '',
    // We need to provide a list of bindable properties here. We could just use wjFlexGridMeta.inputs
    // property to specify all WjFlexGridColumn's properties here, and this will work with Ng2 run-time
    // compiler, but will be rejected by the AoT compiler. The latter requires that any property
    // specified in the 'inputs' metadata should be explicitly defined as a component class member.
    // Because of this, we just add few properties that we actually use, and declare them as class
    // members.
    // We also add the 'cellTemplate' property that is absent in WjFlexGridColumn and specific to 
    // AggregatedGridColumn. This property allows to specify a component type that should be used
    // as the column's cell template.
    inputs: ['header', 'binding', 'width', 'cellTemplate']
})
export class AggregatedGridColumn {
    header: string;
    binding: string;
    width: number | string;
    // Defines a type of a component that should be used as the column cell template.
    cellTemplate: any;
};


