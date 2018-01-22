import { Validator, AbstractControl } from '@angular/forms';
export declare class EqualValidator implements Validator {
    validateEqual: string;
    constructor(validateEqual: string);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
