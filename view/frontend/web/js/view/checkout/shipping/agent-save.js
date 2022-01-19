define([
    'uiComponent',
    'Markup_Smartship/js/view/checkout/shipping/agent-search',
    'Magento_Checkout/js/action/set-shipping-information'
], function(
    Component,
    MarkupAgentSearch,
    setShippingInformationAction
) {
    return Component.extend({
        initialize: function () {
            this._super();
            MarkupAgentSearch().selectedAgentId.subscribe(function() {
                setShippingInformationAction();
            });
        }
    });
});
