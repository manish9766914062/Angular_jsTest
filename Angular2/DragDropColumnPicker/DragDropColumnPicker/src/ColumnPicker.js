"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
//import * as wjcCollectionView from 'wijmo/wijmo.collections';
var wjcInput = require("wijmo/wijmo.input");
var wjcGrid = require("wijmo/wijmo.grid");
var wjcSelf = require("./ColumnPicker");
window['wijmo']['grid']['ColumnPicker'] = wjcSelf;
//module wijmo.grid {
var ColumnPicker = /** @class */ (function (_super) {
    __extends(ColumnPicker, _super);
    function ColumnPicker(element, options) {
        var _this = _super.call(this, element) || this;
        // instantiate and apply template
        var tpl = _this.getTemplate();
        _this.applyTemplate('wj-control wj-columnpicker', tpl, {
            _dAll: 'd-all',
            _dInUse: 'd-inuse',
        });
        // create draggable lists for the columns
        _this._lbAll = _this._createColumnListBox(_this._dAll);
        _this._lbInUse = _this._createColumnListBox(_this._dInUse);
        // create target indicator element
        _this._dMarker = wjcCore.createElement('<div class="wj-marker" style="display:none">&nbsp;</div>');
        _this.hostElement.appendChild(_this._dMarker);
        // use double-click to add/remove columns
        _this.addEventListener(_this.hostElement, 'dblclick', function (e) {
            // add to inUse list
            if (wjcCore.contains(_this._lbAll.hostElement, e.target)) {
                var col = _this._lbAll.selectedItem, list = _this._lbInUse.itemsSource;
                if (list.indexOf(col) < 0) {
                    list.push(col);
                }
            }
            // remove from inUse list
            if (wjcCore.contains(_this._lbInUse.hostElement, e.target)) {
                var col = _this._lbInUse.selectedItem, list = _this._lbInUse.itemsSource;
                list.remove(col);
            }
        });
        // initialize control options
        _this.initialize(options);
        return _this;
    }
    Object.defineProperty(ColumnPicker.prototype, "grid", {
        get: function () {
            return this._grid;
        },
        set: function (value) {
            this._grid = wjcCore.asType(value, wjcGrid.FlexGrid);
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    // saves the column layout to the grid
    ColumnPicker.prototype.save = function () {
        var g = this._grid, cols = this._lbInUse.itemsSource;
        if (g) {
            g.columns.deferUpdate(function () {
                g.columns.clear();
                for (var i = 0; i < cols.length; i++) {
                    g.columns.push(cols[i]);
                }
            });
        }
    };
    // loads the column layout from the grid
    ColumnPicker.prototype.load = function () {
        // get lists of all columns and columns currently in use
        var all = this._getAllColumns();
        var inUse = new wjcCore.ObservableArray();
        for (var i = 0; i < all.length; i++) {
            var c = all[i];
            if (c.grid) {
                inUse.push(c);
            }
        }
        // bind column lists
        this._lbAll.itemsSource = all;
        this._lbInUse.itemsSource = inUse;
        // sort 'all' list by header (binding?)
        var sd = this._lbAll.collectionView.sortDescriptions;
        sd.clear();
        sd.push(new wjcCore.SortDescription('header', true));
        // reset mouse state/list selection
        this._resetMouseState();
    };
    // get a list with all available columns
    ColumnPicker.prototype._getAllColumns = function () {
        var g = this._grid, all = new wjcCore.ObservableArray();
        if (g) {
            // columns currently in use (preserve formatting, etc)
            for (var i = 0; i < g.columns.length; i++) {
                all.push(g.columns[i]);
            }
            // columns available but not in use
            if (wjcCore.hasItems(g.collectionView)) {
                var item = g.collectionView.items[0];
                for (var k in item) {
                    if (!g.columns.getColumn(k)) {
                        all.push(new wjcGrid.Column({
                            binding: k,
                            header: wjcCore.toHeaderCase(k)
                        }));
                    }
                }
            }
        }
        return all;
    };
    // create a listbox for showing grid columns (draggable)
    ColumnPicker.prototype._createColumnListBox = function (host) {
        // create the listbox
        var lb = new wjcInput.ListBox(host);
        // show field headers
        lb.displayMemberPath = 'header';
        // make items draggable, show filter indicator
        lb.formatItem.addHandler(function (s, e) {
            e.item.setAttribute('draggable', 'true');
            var fld = e.data;
            wjcCore.assert(e.data instanceof wjcGrid.Column, 'expecting a Column here...');
        });
        // make items draggable
        this.addEventListener(host, 'dragstart', this._dragstart.bind(this));
        this.addEventListener(host, 'dragover', this._dragover.bind(this));
        this.addEventListener(host, 'dragleave', this._dragover.bind(this));
        this.addEventListener(host, 'drop', this._drop.bind(this));
        this.addEventListener(host, 'dragend', this._dragend.bind(this));
        // return the listbox
        return lb;
    };
    // drag/drop event handlers
    ColumnPicker.prototype._dragstart = function (e) {
        var target = this._getListBoxTarget(e);
        if (target) {
            // select field under the mouse, save drag source
            this._dragSource = null;
            var host = target.hostElement;
            for (var i = 0; i < host.children.length; i++) {
                if (wjcCore.contains(host.children[i], e.target)) {
                    target.selectedIndex = i;
                    this._dragSource = host;
                    break;
                }
            }
            // start drag operation
            if (this._dragSource && e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'copyMove';
                e.dataTransfer.setData('text', '');
                e.stopPropagation();
            }
            else {
                e.preventDefault();
            }
        }
    };
    ColumnPicker.prototype._dragover = function (e) {
        var target = this._getListBoxTarget(e);
        if (target) {
            // check whether the move is valid
            var valid = false;
            // dragging from All to InUse (valid if the target does not contain the item)
            if (this._dragSource == this._dAll && target != this._lbAll) {
                var srcList = wjcCore.Control.getControl(this._dragSource), col = srcList.selectedItem;
                if (target.itemsSource.indexOf(col) < 0) {
                    valid = true;
                }
            }
            // dragging from InUse to All (to remove the column) or within the inUse list
            if (this._dragSource && this._dragSource != this._dAll) {
                valid = true;
            }
            // if valid, prevent default to allow drop
            if (valid) {
                e.dataTransfer.dropEffect = this._dragSource == this._dAll ? 'copy' : 'move';
                e.preventDefault();
                this._showDragMarker(e);
            }
            else {
                this._showDragMarker(null);
            }
        }
    };
    ColumnPicker.prototype._drop = function (e) {
        // perform drop operation
        var target = this._getListBoxTarget(e);
        if (target) {
            var srcList = wjcCore.Control.getControl(this._dragSource), col = (srcList ? srcList.selectedItem : null), items = target.itemsSource;
            if (col) {
                // if the target is the All list, remove from InUse
                // otherwise, add to or re-position field in target list
                if (target == this._lbAll) {
                    srcList.itemsSource.remove(col);
                }
                else {
                    var index = items.indexOf(col);
                    if (index != this._dropIndex) {
                        if (index > -1) {
                            items.removeAt(index);
                            if (index < this._dropIndex) {
                                this._dropIndex--;
                            }
                        }
                        items.insert(this._dropIndex, col);
                        target.selectedIndex = this._dropIndex;
                    }
                }
            }
        }
        // always reset the mouse state when done
        this._resetMouseState();
    };
    ColumnPicker.prototype._dragend = function (e) {
        this._resetMouseState();
    };
    // gets the listbox that contains the target of a drag event
    ColumnPicker.prototype._getListBoxTarget = function (e) {
        for (var el = e.target; el; el = el.parentElement) {
            var lb = wjcCore.Control.getControl(el);
            if (lb instanceof wjcInput.ListBox) {
                return lb;
            }
        }
        return null;
    };
    // reset the mouse state after a drag operation
    ColumnPicker.prototype._resetMouseState = function () {
        this._dragSource = null;
        this._showDragMarker(null);
        this._lbAll.selectedIndex = this._lbInUse.selectedIndex = -1;
    };
    // show the drag/drop marker
    ColumnPicker.prototype._showDragMarker = function (e) {
        var rc, target, item;
        if (e) {
            // get item at the mouse (listbox item or listbox itself)
            target = document.elementFromPoint(e.clientX, e.clientY);
            item = target;
            while (item && !wjcCore.hasClass(item, 'wj-listbox-item')) {
                item = item.parentElement;
            }
            if (!item && wjcCore.hasClass(target, 'wj-listbox')) {
                var last = target.lastElementChild;
                if (wjcCore.hasClass(last, 'wj-listbox-item')) {
                    item = last;
                }
            }
            // get marker position
            rc = item ? item.getBoundingClientRect() :
                wjcCore.hasClass(target, 'wj-listbox') ? target.getBoundingClientRect() :
                    null;
        }
        // update marker
        if (rc) {
            // calculate drop position/index
            var top = rc.top;
            this._dropIndex = 0;
            if (item) {
                var items = item.parentElement.children;
                for (var i = 0; i < items.length; i++) {
                    if (items[i] == item) {
                        this._dropIndex = i;
                        if (e.clientY > rc.top + rc.height / 2) {
                            top = rc.bottom;
                            this._dropIndex++;
                        }
                        break;
                    }
                }
            }
            // show the drop marker
            var rcHost = this.hostElement.getBoundingClientRect();
            wjcCore.setCss(this._dMarker, {
                left: Math.round(rc.left - rcHost.left),
                top: Math.round(top - rcHost.top - 2),
                width: Math.round(rc.width),
                height: 4,
                display: ''
            });
            console.log(wjcCore.format('showing marker at {left} {top} {width} {height}', this._dMarker.style));
        }
        else {
            // hide the drop marker
            this._dMarker.style.display = 'none';
            console.log('hiding marker');
        }
    };
    ColumnPicker.controlTemplate = '<div class="wj-columnlists">' +
        '<div wj-part="d-all"></div>' +
        '<div wj-part="d-inuse"></div>' +
        '</div>';
    return ColumnPicker;
}(wjcCore.Control));
exports.ColumnPicker = ColumnPicker;
//} 
//# sourceMappingURL=ColumnPicker.js.map