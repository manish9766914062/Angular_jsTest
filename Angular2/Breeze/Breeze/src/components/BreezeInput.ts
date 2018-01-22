import * as wjcCore from 'wijmo/wijmo';
'use strict';

import { Component, EventEmitter, Inject, NgModule, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import * as ngCore from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'breezeinput',
    templateUrl: 'src/components/breezeInput.html'
})

export class BreezeInput implements AfterViewInit {
    @Input() label: string;
    @Input() model: any;
    @Input() propName: string;
    @Input() value: string;
    id: string;
    errorPath: string;
    static _uid = 0;
    private _ntvEle: any;
    private _propValue: string;

    constructor( @Inject(ElementRef) elRef: ElementRef) {
        this._ntvEle = elRef.nativeElement;
    }

    ngAfterViewInit() {
        this.id = 'bz-' + this.propName + BreezeInput._uid++;
        this.errorPath = this.propName + 'Errors';
    }

    ngOnChanges(changes: { [key: string]: ngCore.SimpleChange }): any {
        let entity = this.model;
        if (!entity) return;
        let aspect = entity.entityAspect,
             errors = aspect.getValidationErrors(this.propName);
        if (errors.length) {
            if (wjcCore.hasClass(this._ntvEle, 'error')) {
                return;
            }
            wjcCore.addClass(this._ntvEle, 'error');
            let messages = errors.map((el) => { return el.errorMessage; }).join("; ");  // convert to string
            aspect[this.errorPath] = messages;
        } else {
            if (aspect[this.errorPath] = null) {
                return;
            }
            wjcCore.removeClass(this._ntvEle, 'error');
            aspect[this.errorPath] = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [BreezeInput],
    exports: [BreezeInput]
})
export class BreezeInputModule {

}