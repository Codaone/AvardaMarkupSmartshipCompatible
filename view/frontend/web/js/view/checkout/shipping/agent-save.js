define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/set-shipping-information',
    'Avarda_MarkupSmartshipCompatible/js/view/checkout/shipping/agent-valid',
    'uiRegistry',
], function(
    $,
    Component,
    ko,
    quote,
    setShippingInformationAction,
    agentValid,
    uiRegistry
) {
    return Component.extend({

        smartshipComponent: null,

        initialize: function () {
            this._super();
            let self = this;

            quote.shippingMethod.subscribe(function (method) {
                if (method && method.carrier_code === 'smartship' && self.getSmartshipAgentComponent().agentsAvailable()) {
                    if (self.getSmartshipAgentComponent().agentNotSet()) {
                        agentValid(false);
                    } else {
                        agentValid(true);
                    }
                } else {
                    agentValid(true);
                }
            });

            // Set subscription to agent selection after shipping methods are first time set
            let initial = quote.shippingMethod.subscribe(function () {
                self.getSmartshipAgentComponent().selectedAgentId.subscribe(function (agentId) {
                    let agent = self.getSmartshipAgentComponent().findAgentById(agentId);
                    if (agent != false) {
                        agentValid(true);
                        // Save shipping information so that also the agent is saved
                        setShippingInformationAction();
                    } else {
                        agentValid(false);
                    }
                });
                initial.dispose();
            });
        },

        getSmartshipAgentComponent: function () {
            if (this.smartshipComponent === null) {
                this.smartshipComponent = this.getSiblingComponent('markup_smartship_agent_search');
            }
            return this.smartshipComponent;
        },

        getSiblingComponent: function(name) {
            let elems = uiRegistry.get(this.parentName).elems();
            let component = null;
            $.each(elems, function (index, elem) {
                if (elem.index === name) {
                    component = elem;
                }
            });
            return component;
        }
    });
});
