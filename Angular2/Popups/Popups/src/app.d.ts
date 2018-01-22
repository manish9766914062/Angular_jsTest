import * as wjcInput from 'wijmo/wijmo.input';
export declare class AppCmp {
    browserSupportsPromises: boolean;
    frmLogIn: wjcInput.Popup;
    constructor();
    showingAnimated(popup: any): void;
    hidingAnimated(popup: any): void;
    submitAccountForm(arg: any, frmCreateAccount: wjcInput.Popup): void;
    popupPromise(): void;
    getPopupPromise(): Promise<{}>;
}
export declare class AppModule {
}
