'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Common data service
var CheckoutService = /** @class */ (function () {
    function CheckoutService() {
    }
    CheckoutService.prototype.checkout = function (serviceName, merchantID, cartItems) {
        if (serviceName === 'PayPal') {
            this.checkoutPayPal(merchantID, cartItems);
        }
        else {
            throw 'Unknown checkout service: ' + serviceName;
        }
    };
    CheckoutService.prototype.checkoutPayPal = function (merchantID, cartItems) {
        // global data
        var data = {
            cmd: '_cart',
            business: merchantID,
            upload: '1',
            rm: '2',
            charset: 'utf-8'
        };
        // item data
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            var ctr = i + 1;
            data['item_number_' + ctr] = item.sku;
            data['item_name_' + ctr] = item.name;
            data['quantity_' + ctr] = item.quantity;
            data['amount_' + ctr] = item.price.toFixed(2);
        }
        // build form
        var form = $('<form/></form>');
        form.attr('action', 'https://www.paypal.com/cgi-bin/webscr');
        form.attr('method', 'POST');
        form.attr('style', 'display:none;');
        this.addFormFields(form, data);
        $('body').append(form);
        // submit form
        form.submit();
        form.remove();
    };
    ;
    CheckoutService.prototype.addFormFields = function (form, data) {
        if (data != null) {
            $.each(data, function (name, value) {
                if (value != null) {
                    var input = $('<input></input>').attr('type', 'hidden').attr('name', name).val(value);
                    form.append(input);
                }
            });
        }
    };
    ;
    CheckoutService = __decorate([
        core_1.Injectable()
    ], CheckoutService);
    return CheckoutService;
}());
exports.CheckoutService = CheckoutService;
//# sourceMappingURL=CheckoutService.js.map