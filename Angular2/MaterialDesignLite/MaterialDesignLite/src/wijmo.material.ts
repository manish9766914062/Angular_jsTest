import * as wjcCore from 'wijmo/wijmo';

/**
    * Adds Wijmo support for MDL's tabs and text input containers.
    * Just create an instance of this class to bootstrap it.
    */
export class BootstrapWijmo {
    constructor() {
        this._bootstrapTabs();
        this._bootstrapTextFields(true);
    }
    // invalidate Wijmo controls when the user switches tabs
    // so they will be laid our to fit the containing tab pane
    private _bootstrapTabs() {
        var tabs = document.querySelectorAll('.mdl-tabs__tab-bar');
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            tab.addEventListener('click', (e)=> {
                if (wjcCore.contains(tab, e.target)) {
                    wjcCore.Control.invalidateAll(tab.parentElement);
                    this._bootstrapTextFields(false);
                }
            });
        }
    }

    // add event handlers to 
    // update the state of mdl-textfield elements containing Wijmo Input controls
    private _bootstrapTextFields(addHandlers) {
        var controls = document.querySelectorAll('.mdl-textfield>.wj-control');
        for (var i = 0; i < controls.length; i++) {
            var ctl = <any>wjcCore.Control.getControl(controls[i]);
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
    }

    // update the state of mdl-textfield elements containing Wijmo Input controls
    private _updateTextFieldState(s) {
        var container = <HTMLElement>wjcCore.closest(s.hostElement, '.mdl-textfield'),
            input = s.hostElement.querySelector('input');
        if (container && input) {
            wjcCore.toggleClass(input, 'md-input', true);
            wjcCore.toggleClass(container, 'is-dirty', input.value.length > 0);
            wjcCore.toggleClass(container, 'is-focused', s.containsFocus());
            wjcCore.toggleClass(container, 'is-invalid', !input.validity.valid);
        }
    }
}




