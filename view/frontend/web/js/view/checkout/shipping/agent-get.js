define([
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Avarda_MarkupSmartshipCompatible/js/view/checkout/shipping/agent-valid'
], function (Component, quote, agentValid) {
    'use strict';

    return Component.extend({
        initialize: function () {
            this._super();

            // Agent is already set in onepage
            agentValid(true);
            return this;
        }
    });
});

