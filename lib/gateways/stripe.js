"use strict";

var _ = require('underscore');

var Gateway = require('../gateway');

var StripeGateway = function (options) {
  Gateway.call(this, options);

  this.default_currency = 'usd';
};

StripeGateway.prototype = Object.create(Gateway.prototype);
StripeGateway.prototype.constructor = StripeGateway;
StripeGateway.prototype.authorize = function (money, creditCard, options) {
  this.create_post_for_auth_or_purchase(money, creditCard, options);
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

module.exports = StripeGateway;
