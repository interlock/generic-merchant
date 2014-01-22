var GateWay = require('../gateway');

StripeGateway = function(options) {
  Gateway.call(this,options);
};

StripeGateway.prototype = Object.create(Gateway.prototype);
StripeGateway.prototype.constructor = StripeGateway;

module.exports = StripeGateway;
