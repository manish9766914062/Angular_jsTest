import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
export declare abstract class FrmBaseCmp {
    submit: EventEmitter<{}>;
    onSubmit(e: any, theForm: NgForm): void;
}
