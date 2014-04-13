"use strict";

var _ = require('underscore');

var Gateway = require('../gateway');

var StripeGateway = function (options) {
  Gateway.call(this, options);

  this.default_currency = 'usd';
  this.live_url = 'https://api.stripe.com/v1/';

  this.homepage_url = 'https://stripe.com';
  this.display_name = 'Stripe';
};

StripeGateway.prototype = Object.create(Gateway.prototype);
StripeGateway.prototype.constructor = StripeGateway;
StripeGateway.prototype.authorize = function (money, creditCard, options) {
  var post = this.create_post_for_auth_or_purchase(money, creditCard, options);
  post.capture = "false";
  this.commit(post, 'charges', post, options);
};

/**
 * Create a post for auth or purchase
 * @param  {[type]} money      [description]
 * @param  {[type]} creditCard [description]
 * @param  {[type]} options    [description]
 * @return {[type]}            [description]
 */
StripeGateway.prototype.create_post_for_auth_or_purchase = function (money, creditCard, options) {
  var post = {};
  this.add_amount(post, money, options);
  this.add_creditcard(post, creditCard, options);
  this.add_customer(post, creditCard, options);
  this.add_customer_data(post, options);
  if (options.description !== undefined) {
    post.description = options.description;
  }
  if (options.email !== undefined) {
    post.metadata = {
      email: options.email
    };
  }
  this.add_flags(post, options);
  this.add_application_fee(post, options);
  return post;
};

StripeGateway.prototype.add_amount = function (post, money, options) {
  post.amount = money;
  if (options.currency !== undefined) {
    post.currency = options.currency.toLowerCase();
  } else {
    post.currency = this.default_currency;
  }
};

StripeGateway.prototype.add_creditcard = function (post, creditCard, options) {
  var card = {};
  if (_.isObject(creditCard)) {
    if (_.has(creditCard, 'hasTrackData') && creditCard.hasTrackData()) {
      card.swipe_data = creditCard.track_data;
    } else {
      card.number = creditCard.number;
      card.exp_month = creditCard.month;
      card.exp_year = creditCard.year;
      card.cvc = creditCard.verification_value;
      card.name = creditCard.name;
    }
    this.add_address(post, options);
  } else if (_.isString(creditCard)) {
    if (_.has(options, 'track_data')) {
      card.swipe_data = options.track_data;
    } else {
      card = creditCard;
    }
  }
  post.card = card;
  return [post, creditCard, options, card];
};

StripeGateway.prototype.add_address = function (post, options) {
  var address;
  if (options.billing_address !== undefined) {
    address = options.billing_address;
  } else if (options.address !== undefined) {
    address = options.address;
  } else {
    return;
  }

  if (address.address1 !== undefined) { post.card.address_line1 = address.address1; }
  if (address.address2 !== undefined) { post.card.address_line2 = address.address2; }
  if (address.country !== undefined) { post.card.address_country = address.country; }
  if (address.zip !== undefined) { post.card.address_zip = address.zip; }
  if (address.state !== undefined) { post.card.address_state = address.state; }
  if (address.city !== undefined) { post.card.address_city = address.city; }
};

StripeGateway.prototype.add_customer = function (post, creditCard, options) {
  if (options.customer !== undefined && creditCard.number === undefined) {
    post.customer = options.customer;
  }
};

StripeGateway.prototype.add_customer_data = function (post, options) {
  if (post.metadata === undefined) {
    post.metadata = {};
  }
  _.extend(post.metadata, _.pick(options, ['description', 'ip', 'user_agent', 'referrer']));

  if (options.order_id !== undefined) {
    post.external_id = options.order_id;
  }
  post.payment_user_agent = "Stripe/v1 GenericMerchantBindings/0.0.1";
};

StripeGateway.prototype.add_flags = function (post, options) {
  if (options.uncaptured !== undefined && options.uncaptured === true) {
    post.uncaptured = true;
  }
};

StripeGateway.prototype.add_application_fee = function (post, options) {
  if (options.application_fee !== undefined) {
    post.application_fee = options.application_fee;
  }
};

StripeGateway.prototype.commit = function () {
  var parameters = null,
    options = {};
  if (arguments.length >= 3) {
    parameters =  Array.prototype.slice.call(arguments, 2);
  }
  if (arguments.length >= 4) {
    options =  Array.prototype.slice.call(arguments, 3);
  }
  if (parameters !== null) {
    this.add_expand_parameters(parameters, options);
  }
  return;
};

StripeGateway.prototype.add_expand_parameters = function (post, options) {
  if (options.expand !== undefined) {
    if (_.isArray(options.expand)) {
      post.expand = options.expand;
    } else {
      post.expand = [options.expand];
    }
  }
};



module.exports = StripeGateway;
