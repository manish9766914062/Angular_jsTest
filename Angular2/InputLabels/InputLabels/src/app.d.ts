import * as wjcInput from 'wijmo/wijmo.input';
export declare class AppCmp {
    mainItem: {
        name: any;
        email: string;
        country: string;
        dateTime: any;
        quantity: any;
        discount: any;
        creditCard: string;
        favoriteColors: any[];
    };
    dlgItem: {};
    modalDialog: wjcInput.Popup;
    constructor();
    editItem(): void;
    submitForm(isValid: boolean): void;
    static clone(obj: any): {};
}
export declare class AppModule {
}
