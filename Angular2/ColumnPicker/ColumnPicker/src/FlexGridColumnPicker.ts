

import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcCore from 'wijmo/wijmo';


import * as wjcSelf from './FlexGridColumnPicker';
window['FlexGridColumnPicker'] = wjcSelf;


    'use strict';

    /**
     * Provides column picker for FlexGrid.
     */
    export class FlexGridColumnPicker {
        _flex: wjcGrid.FlexGrid;
        columnPicker: string;

        private _frame: HTMLElement;
        private _img: HTMLElement;

        /**
         * Initializes a new instance of the @see:FlexGridColumnPicker class.
         *
         * @param flex @see:FlexGrid that will receive the column picker.
         */
        constructor(flex: wjcGrid.FlexGrid, columnPicker:string) {
            this._flex = flex;
            this.columnPicker = columnPicker;

            // add picker icon to column header element
            this._createPickerImg();

            // create frame element for column list
            this._createPopIframe();

            // close frame when user clicks anywhere else
            this._initMouseDownOnBody();
        }

        // create picker icon
        private _createPickerImg() {

            var host = this._flex.hostElement,
                colHdr = host.querySelector('[wj-part="ch"]'),
                img = document.createElement('img');

            this._img = img;
            img.className = "wj-col-picker-icon";
            img.style.position = 'absolute';
            img.style.top = '0px';
            img.style.right = '0px';
            img.style.height = this._flex.rows.defaultSize + 'px';
            img.src = this.columnPicker;
            colHdr.appendChild(img);

            img.addEventListener('mousedown', (e: Event) => {
                var fs = this._frame.style;
                // we're done with this event
                e.preventDefault();
                e.stopImmediatePropagation();

                // if frame is visible, hide it
                if (fs.display != 'none') {
                    fs.display = 'none';
                    return;
                }

                // populate frame with checkboxes for the columns
                this._populateFrame();
                var root = <HTMLElement>host.querySelector('[wj-part="root"]');
                // show frame
                fs.top = this._flex.rows.defaultSize + 'px';
                fs.right = (root.offsetWidth - root.clientWidth) + 'px';
                fs.maxHeight = (root.clientHeight - this._flex.rows.defaultSize) * 0.65 + 'px';
                fs.display = '';
                this._frame.focus();
            });
        }

        // create pop iframe
        private _createPopIframe() {

            var host = this._flex.hostElement,
                frame = document.createElement("div");

            this._frame = frame;
            frame.className = "wj-col-picker-dropdown";
            frame.style.position = "absolute";
            frame.style.outline = "none";
            frame.style.display = "none";
            frame.tabIndex = 0;
            var root = <HTMLElement>host.querySelector('[wj-part="root"]');
            root.parentElement.appendChild(frame);

            // handle checkbox changes to show/hide columns
            frame.addEventListener('change', (e: Event) => {
                var sender = e.target;
                if (sender instanceof HTMLInputElement &&
                    sender.type == 'checkbox' &&
                    sender.value != null) {
                    var col = this._flex.columns[parseInt(sender.value)];
                    col.visible = sender.checked;
                }
            });
        }

        // populate the frame with checkboxes for each column
        private _populateFrame() {
            this._frame.innerHTML = '';

            // create two divs to hold the checkboxes
            for (var i = 0; i < 2; i++) {
                var d = document.createElement('div');
                d.style.cssFloat = "left";
                this._frame.appendChild(d);
            }

            // add one checkbox for each grid column
            for (var i = 0; i < this._flex.columns.length; i++) {

                // create checkbox
                var col = this._flex.columns[i],
                    hdr = col.header ? col.header : col.binding,
                    checked = col.visible ? 'checked' : '',
                    chk = document.createElement("label");

                chk.className = "wj-col-picker-item";
                chk.innerHTML = '<input type="checkbox" value= "' + i + '" ' + checked + '>' + hdr;
                // append to first or second div
                var fc = i <= this._flex.columns.length / 2 ? 0 : 1;
                this._frame.children[fc].appendChild(chk);
            }
        }

        private _initMouseDownOnBody() {
            document.body.addEventListener('mousedown', (e: any) => {
                var mde = document.elementFromPoint(e.clientX, e.clientY);
                if (mde != this._img) {
                    if (this._contains(this._frame, mde)) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        this._frame.focus();
                    } else {
                        this._frame.style.display = 'none';
                    }
                }
            }, true);
        }

        private _contains(parent: HTMLElement, child: Element) {
            for (var e = child; e; e = e.parentElement) {
                if (e == parent) return true;
            }
            return false;
        }
    }

