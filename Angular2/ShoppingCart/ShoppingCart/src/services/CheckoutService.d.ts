export declare class CheckoutService {
    checkout(serviceName: any, merchantID: any, cartItems: any): void;
    private checkoutPayPal(merchantID, cartItems);
    private addFormFields(form, data);
}
