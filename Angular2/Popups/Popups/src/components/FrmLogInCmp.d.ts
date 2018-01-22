import { EventEmitter } from '@angular/core';
import { FrmBaseCmp } from './FrmBaseCmp';
export declare class FrmLogInCmp extends FrmBaseCmp {
    createAccount: EventEmitter<{}>;
    constructor();
    onCreateAccount(): void;
}
