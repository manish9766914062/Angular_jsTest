"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wjcCore = require("wijmo/wijmo");
/**
    * Adds Wijmo support for MDL's tabs and text input containers.
    * Just create an instance of this class to bootstrap it.
    */
var BootstrapWijmo = /** @class */ (function () {
    function BootstrapWijmo() {
        this._bootstrapTabs();
        this._bootstrapTextFields(true);
    }
    // invalidate Wijmo controls when the user switches tabs
    // so they will be laid our to fit the containing tab pane
    BootstrapWijmo.prototype._bootstrapTabs = function () {
        var _this = this;
        var tabs = document.querySelectorAll('.mdl-tabs__tab-bar');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            tab.addEventListener('click', function (e) {
                if (wjcCore.contains(tab, e.target)) {
                    wjcCore.Control.invalidateAll(tab.parentElement);
                    _this._bootstrapTextFields(false);
                }
            });
        }
    };
    // add event handlers to 
    // update the state of mdl-textfield elements containing Wijmo Input controls
    BootstrapWijmo.prototype._bootstrapTextFields = function (addHandlers) {
        var controls = document.querySelectorAll('.mdl-textfield>.wj-control');
        for (var i = 0; i < controls.length; i++) {
            var ctl = wjcCore.Control.getControl(controls[i]);
            if (ctl) {
                this._updateTextFieldState(ctl);
                if (addHandlers) {
                    if (ctl.placeholder) {
                        ctl.placeholder = '';
                    }
                    //ctl.hostElement.style.width = '100%';
                    ctl.gotFocus.addHandler(this._updateTextFieldState);
                    ctl.lostFocus.addHandler(this._updateTextFieldState);
                    if (ctl.textChanged) {
                        ctl.textChanged.addHandler(this._updateTextFieldState);
                    }
                    if (ctl.valueChanged) {
                        ctl.valueChanged.addHandler(this._updateTextFieldState);
                    }
                    if (ctl.isDroppedDownChanged) {
                        ctl.isDroppedDownChanged.addHandler(this._updateTextFieldState);
                    }
                }
            }
        }
    };
    // update the state of mdl-textfield elements containing Wijmo Input controls
    BootstrapWijmo.prototype._updateTextFieldState = function (s) {
        var container = wjcCore.closest(s.hostElement, '.mdl-textfield'), input = s.hostElement.querySelector('input');
        if (container && input) {
            wjcCore.toggleClass(input, 'md-input', true);
            wjcCore.toggleClass(container, 'is-dirty', input.value.length > 0);
            wjcCore.toggleClass(container, 'is-focused', s.containsFocus());
            wjcCore.toggleClass(container, 'is-invalid', !input.validity.valid);
        }
    };
    return BootstrapWijmo;
}());
exports.BootstrapWijmo = BootstrapWijmo;
//# sourceMappingURL=wijmo.material.js.map