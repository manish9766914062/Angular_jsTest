import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
export declare class FormCmp {
    item: any;
    staticLabels: boolean;
    customSubmit: EventEmitter<any>;
    countries: string[];
    colors: string[];
    constructor();
    onSubmit(form: NgForm): void;
}
