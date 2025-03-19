define([
    'jquery',
    'Magento_Checkout/js/model/quote',
    'Avarda_MarkupSmartshipCompatible/js/view/checkout/shipping/agent-valid',
    'mage/translate',
    'Magento_Ui/js/modal/modal',
], function ($, quote, agentValid) {
    'use strict';

    let mixin = {
        beforeCompleteHook: function (data, avardaCheckoutInstance) {
            if (quote.isVirtual() || agentValid()) {
                this._super(data, avardaCheckoutInstance);
            } else {
                avardaCheckoutInstance.beforeSubmitAbort();
                $('<div><p>' +
                    $.mage.__("Missing shipping agent. Please select the shipping agent and try again.") +
                    '</p>')
                    .modal({
                        title: $.mage.__('Missing shipping agent!'),
                        buttons: [{
                            text: 'OK',
                            class: 'action primary',
                            click: function () {
                                this.closeModal();
                            }
                        }]
                    }).modal('openModal');
            }
        }
    };

    return function (target) {
        return target.extend(mixin);
    };
});
