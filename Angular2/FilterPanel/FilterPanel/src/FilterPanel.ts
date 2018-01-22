
import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';

import * as wjcSelf from './FilterPanel';
window['FilterPanel'] = wjcSelf;

/**
 * Extension that provides a drag and drop UI for editing 
 * groups in bound @see:FlexGrid controls.
 */
'use strict';

export class FilterPanel extends wjcCore.Control {
    _filter: wjcGridFilter.FlexGridFilter;  // grid driving the panel
    _divMarkers: HTMLElement;    // element that contains the filter markers
    _divPH: HTMLElement;         // element that contains the placeholder
    _filterChangedBnd: any;

    /**
        * Gets or sets the template used to instantiate @see:FilterPanel controls.
        */
    static controlTemplate = '<div style="cursor:default;overflow:hidden;height:100%;width:100%;min-height:1em;">' +
    '<div wj-part="div-ph"></div>' +
    '<div wj-part="div-markers"></div>' +
    '</div>';

    /**
        * Initializes a new instance of the @see:FilterPanel class.
        */
    constructor(element: any, options?) {
        super(element);

        // check dependencies
        var depErr = 'Missing dependency: GroupPanel requires ';
        wjcCore.assert(wjcGrid != null, depErr + 'wijmo.grid.');

        // instantiate and apply template
        // using wj-grouppanel to pick up styles
        var tpl = this.getTemplate();
        this.applyTemplate('wj-filterpanel wj-grouppanel wj-control', tpl, {
            _divMarkers: 'div-markers',
            _divPH: 'div-ph'
        });

        // click markers to delete filters
        var e = this.hostElement;
        this.addEventListener(e, 'click', this._click.bind(this));
        this._filterChangedBnd = this._filterChanged.bind(this);

        // apply options
        this.initialize(options);
    }
    /**
        * Gets or sets a string to display in the control when it contains no groups.
        */
    get placeholder(): string {
        return this._divPH.textContent;
    }
    set placeholder(value: string) {
        this._divPH.textContent = value;
    }
    /**
        * Gets or sets the @see:FlexGridFilter that is connected to this @see:FilterPanel.
        */
    get filter(): wjcGridFilter.FlexGridFilter {
        return this._filter;
    }
    set filter(value: wjcGridFilter.FlexGridFilter) {
        value = <wjcGridFilter.FlexGridFilter>wjcCore.asType(value, wjcGridFilter.FlexGridFilter, true);
        if (value != this._filter) {
            if (this._filter) {
                this._filter.filterChanged.removeHandler(this._filterChangedBnd);
                this._filter.filterApplied.removeHandler(this._filterChangedBnd);
            }
            this._filter = value;
            if (this._filter) {
                this._filter.filterChanged.addHandler(this._filterChangedBnd);
                this._filter.filterApplied.addHandler(this._filterChangedBnd);
            }
        }
    }

    // ** overrides

    /**
        * Updates the panel to show the current groups.
        */
    refresh() {
        super.refresh();

        // clear div/state
        this._divMarkers.innerHTML = '';

        // populate
        if (this._filter) {

            // build array of filter markers
            var g = this._filter.grid,
                markers = [];
            for (var i = 0; i < g.columns.length; i++) {
                var cf = this._filter.getColumnFilter(i, false);
                if (cf && cf.isActive) {
                    var marker = this._createFilterMarker(cf);
                    markers.push(marker);
                }
            }

            // populate if we have markers
            if (markers.length > 0) {

                // add 'clear all filters' marker
                var clearAll = this._createMarker('Clear All Filters', true);
                clearAll.classList.add('wj-remove-all');
                this._divMarkers.appendChild(clearAll);

                // add regular markers
                for (var i = 0; i < markers.length; i++) {
                    this._divMarkers.appendChild(markers[i]);
                }
            }
        }

        // show placeholder or markers
        if (this._divMarkers.children.length > 0) {
            this._divPH.style.display = 'none';
            this._divMarkers.style.display = '';
        } else {
            this._divPH.style.display = '';
            this._divMarkers.style.display = 'none';
        }
    }

    // ** event handlers

    // remove filter on click
    _click(e: MouseEvent) {
        var target = <HTMLElement>e.target;
        if (target.classList.contains('wj-remove')) {
            var marker = wjcCore.closest(target, '.wj-filtermarker'),
                filter = marker ? marker['filter'] : null;
            if (filter instanceof wjcGridFilter.ColumnFilter) {
                filter.clear();
                this._filter.apply();
            } else {
                this._filter.clear();
            }
        }
    }

    // refresh markers when filter changes
    _filterChanged() {
        this.refresh();
    }

    // ** implementation

    // checks whether a format represents a time (and not just a date)
    _isTimeFormat(fmt: string): boolean {
        if (!fmt) return false;
        fmt = wjcCore.culture.Globalize.calendar.patterns[fmt] || fmt;
        return /[Hmst]+/.test(fmt); // TFS 109409
    }

    // creates a marker
    _createMarker(hdr: string, removeButton: boolean): HTMLElement {

        // create the marker element
        var marker = document.createElement('div');
        marker.className = 'wj-cell wj-header wj-groupmarker wj-filtermarker';
        wjcCore.setCss(marker, {
            display: 'inline-block',
            position: 'static',
        });

        // apply content
        marker.textContent = hdr;

        // add remove button before the text
        if (removeButton) {
            var btn = document.createElement('span');
            btn.className = 'wj-remove';
            wjcCore.setCss(btn, {
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: 12,
                paddingLeft: 0
            });
            btn.innerHTML = '&times;';
            marker.insertBefore(btn, marker.firstChild);
        }

        // all done
        return marker;
    }

    // crates a marker to represent a ColumnFilter
    _createFilterMarker(cf: wjcGridFilter.ColumnFilter): HTMLElement {
        var hdr = this._getFilterHeader(cf),
            marker = this._createMarker(hdr, true);
        marker['filter'] = cf;
        return marker;
    }

    // gets the header to show in a ColumnFilter marker
    _getFilterHeader(cf: wjcGridFilter.ColumnFilter): string {
        if (cf.conditionFilter.isActive) {
            return this._getConditionFilterHeader(cf);
        } else if (cf.valueFilter.isActive) {
            return this._getValueFilterHeader(cf);
        } else {
            throw '** should have at least one active filter';
        }
    }

    // gets the header for condition filters
    _getConditionFilterHeader(cf: wjcGridFilter.ColumnFilter): string {
        var f = cf.conditionFilter,
            c1 = this._getConditionHeader(cf, f.condition1),
            c2 = this._getConditionHeader(cf, f.condition2);
        if (c1 && c2) {
            var culture = wjcCore.culture.FlexGridFilter,
                andOr = f.and ? culture.and : culture.or;
            return c1 + ' ' + andOr.toLowerCase() + ' ' + c2;
        }
        if (c1) {
            return c1;
        }
        if (c2) {
            return c2;
        }
        throw '** should have at least one active condition';
    }
    _getConditionHeader(cf: wjcGridFilter.ColumnFilter, c: wjcGridFilter.FilterCondition): string {
        var hdr = null;
        if (c.isActive) {

            // get operator list based on column data type
            var col = cf.column,
                list = wjcCore.culture.FlexGridFilter.stringOperators;
            if (col.dataType == wjcCore.DataType.Date && !this._isTimeFormat(col.format)) {
                list = wjcCore.culture.FlexGridFilter.dateOperators;
            } else if (col.dataType == wjcCore.DataType.Number && !col.dataMap) {
                list = wjcCore.culture.FlexGridFilter.numberOperators;
            } else if (col.dataType == wjcCore.DataType.Boolean && !col.dataMap) {
                list = wjcCore.culture.FlexGridFilter.booleanOperators;
            }

            // get operator name
            hdr = '';
            for (var i = 0; i < list.length; i++) {
                if (list[i].op == c.operator) {
                    hdr = list[i].name.toLowerCase();
                    break;
                }
            }

            // add operator value
            if (wjcCore.isString(c.value)) {
                hdr += ' "' + c.value + '"';
            } else {
                hdr += ' ' + wjcCore.Globalize.format(c.value, col.format);
            }
        }
        return hdr;
    }

    // gets the header for value filters
    _getValueFilterHeader(cf: wjcGridFilter.ColumnFilter): string {
        var hdr = null,
            f = cf.valueFilter;
        if (f.isActive) {
            hdr = '"' + Object.keys(f.showValues).join(' & ') + '"';
        }
        return hdr;
    }
}
