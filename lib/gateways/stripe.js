var Gateway = require('../gateway');

var StripeGateway = function(options) {
  Gateway.call(this,options);
};

StripeGateway.prototype = Object.create(Gateway.prototype);
StripeGateway.prototype.constructor = StripeGateway;

module.exports = StripeGateway;
