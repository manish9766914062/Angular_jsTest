'use strict';

import {
    Component, Inject, Injector, ElementRef, AfterContentInit, Input, forwardRef, SkipSelf, Optional,
    ChangeDetectorRef
} from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import { WjFlexGrid, wjFlexGridMeta } from 'wijmo/wijmo.angular2.grid';
import { SelectionType } from '../cellTemplates/EditableSelectionRenderer';

// Custom grid component implemented by deriving from the WjFlexGrid component.
// (requires Angular version 2.3.1 or higher)
//
// The WjComponent decorator merges the definitions made for this class with the definitions for
// the base class decorator.
@Component({
    selector: 'inherited-grid',
    // We could specify a default WjFlexGrid using wjFlexGridMeta.template property,
    // but we want to create a grid with a predefined Select column, so we define a custom template
    // that includes the Select column definition, see the template definition in html file for details.
    templateUrl: 'src/customizedComponents/inheritedGrid.html',
    // Merge base component 'inputs' with the properties added in this class.
    inputs: [...wjFlexGridMeta.inputs, 'selectionType', 'isEditable'],
    outputs: wjFlexGridMeta.outputs,
    // In addition to providers specified in the base component, we have to add the
    // special 'WjComponent' provider that will supply a value to the parentCmp parameter
    // of child components like WjFlexGridColumn. This parameter provides a reference
    // to a parent Wijmo component and is vital for parent-child components interaction.
    // The base WjFlexGrid component declare such a provider as well, but it's not included
    // in the wjFlexGridMeta.providers array for consistency.
    providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => InheritedGrid) },
        ...wjFlexGridMeta.providers
    ]
})
export class InheritedGrid extends WjFlexGrid {
    private _showSelectColumn = true;
    private _isEditable = true;
    selectionType = SelectionType.Single;

    // constructor(.....) {}
    //
    // We don't declare a constructor at all, in order to avoid necessity to maintain 
    // constructor parameters and keep them in synch with the base WjFlexGrid's constructor
    // parameters. Instead, we override the "created" method, which is called in the last
    // line of any Wijmo component's constructor, and perform necessary initializations here.
    created() {
        // Disable cell selection.
        this.selectionMode = wjcGrid.SelectionMode.None;
        // Disables standard cell editing functionality.
        this.isReadOnly = true;
    }

    // Indicates whether cell editing is enabled.
    get isEditable(): boolean {
        return this._isEditable;
    }
    set isEditable(value: boolean) {
        if (this._isEditable != value) {
            this._isEditable = value;
            this.invalidate();
        }
    }

    // Overrides the onFormatItem method and adds the logic that enables or disables cell editing based 
    // on the isEditable property value.
    onFormatItem(e: wjcGrid.FormatItemEventArgs) {
        super.onFormatItem(e);
        if (e.panel.cellType === wjcGrid.CellType.Cell) {
            let column = <wjcGrid.Column>this.columns[e.col];
            wjcCore.enable(e.cell, this.isEditable || column.name === 'select');
        }
    }
}



