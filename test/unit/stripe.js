"use strict";

var assert = require('chai').assert;

var StripeGateway = require('../../lib/gateways/stripe');
var CreditCard = require('../../lib/credit_card');

describe.only('StripeGateway', function () {
  var stripeGateway = null;

  beforeEach(function () {
    stripeGateway = new StripeGateway();
  });
  it('sets live_url');
  it('defines supported countries');
  it('has default currency of USD', function () {
    assert.equal(stripeGateway.default_currency, 'usd');
  });
  it('money_format is cents');
  it('defines supported card_types');
  it('defines homepage_url');
  it('defines display name');

  describe('constructor', function () {
    it('requires login');
    it('sets api_key with login');
    it('sets fee_refund_api_key with option value');
    it('sets version with option version');
    it('calls Gateway constructor');
  });

  describe('api_key', function () {
    it('is property');
  });

  describe('fee_refund_api_key', function () {
    it('is property');
  });

  describe('version', function () {
    it('is property');
  });

  describe('authorize', function () {
    it('is function');
    it('calls create_post_for_auth_or_purchase');
    it('calls commit');
  });

  describe('create_post_for_auth_or_purchase', function () {
    it('is function', function () {
      assert.isFunction(stripeGateway.create_post_for_auth_or_purchase);
    });
    it('calls add amount');
    it('calls add creditcard');
    it('calls add customer');
    it('calls add customer data');
    it('sets description');
    it('sets metadata');
    it('calls add_flags');
    it('calls add_application_fee');
    it('returns post');
  });

  describe('add_amount', function () {
    var post = null;
    beforeEach(function () {
      post = {};
    });
    it('is function', function () {
      assert.isFunction(stripeGateway.add_amount);
    });
    it('sets amount', function () {
      stripeGateway.add_amount(post, 1000, {});
      assert.equal(post.amount, 1000);
    });
    it('sets currency to options value', function () {
      stripeGateway.add_amount(post, 1000, {currency: 'usd'});
      assert.deepEqual(post, {amount: 1000, currency: 'usd'});
    });
    it('sets currency to default is not provided in options', function () {
      stripeGateway.add_amount(post, 1000, {});
      assert.deepEqual(post, {amount: 1000, currency: 'usd'});
    });
    it('lower cases currency', function () {
      stripeGateway.add_amount(post, 1000, {currency: 'USD'});
      assert.deepEqual(post, {amount: 1000, currency: 'usd'});
    });
  });

  describe('add_creditcard', function () {
    var post = null;
    beforeEach(function () {
      post = {};
    });
    it('is function', function () {
      assert.isFunction(stripeGateway.add_creditcard);
    });
    it('sets card on post', function () {
      stripeGateway.add_creditcard(post, {}, {});
      assert.isObject(post.card);
    });
    describe('if instance of CreditCard', function () {
      var card = null;
      beforeEach(function () {
        card = new CreditCard();
        card.number = "4545454545454545";
        card.month = "12";
        card.year = "2020";
        card.verification_value = "123";
        card.first_name = "Smith";
        card.last_name = "Smither";
      });
      it('sets swipe_data if track_data provided', function () {
        card.track_data = "ACDC";
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.swipe_data, card.track_data);
      });
      it('sets number', function () {
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.number, card.number);
      });
      it('sets exp_month', function () {
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.exp_month, card.month);
      });
      it('sets exp_year', function () {
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.exp_year, card.year);
      });
      it('sets cvc if present', function () {
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.cvc, card.verification_value);
      });
      it('sets name if not empty', function () {
        stripeGateway.add_creditcard(post, card, {});
        assert.equal(post.card.name, card.name);
      });
      it('calls add_address', function () {
        // spy on add_address
        // assert that it was called
        return;
      });
    });

    describe('if string', function () {
      it('sets swipe_data if track_data provided', function () {
        stripeGateway.add_creditcard(post, "ABC123", {track_data: "XYZ789"});
        assert.equal(post.card.swipe_data, 'XYZ789');
      });
      it('sets card to string if not track_data provided', function () {
        stripeGateway.add_creditcard(post, "ABC123", {});
        assert.equal(post.card, 'ABC123');
      });
    });
  });

  describe('add_address', function () {
    it('returns immediately if post.card is instance of Object');
    it('uses billing address if present');
    it('uses address if no billing address present');
    it('sets address_line1');
    it('sets address_line2');
    it('sets address_country');
    it('sets address_zip');
    it('sets address_state');
    it('sets address_city');
  });

  describe('add_customer', function () {
    it('is function');
    it('sets customer to options customer if provided and credit_card number not set');
  });

  describe('add_customer_data', function () {
    it('is function');
    it('merges in description, ip, user_agent, referrer to metadata');
    it('sets external_id to options.order_id');
    it('sets payment_user_agent');
  });

  describe('add_flags', function () {
    it('is function');
    it('sets uncaptured to true if options.uncaptured true');
  });

  describe('add_application_fee', function () {
    it('is function');
    it('sets application fee to options.application_fee if present');
  });

  describe('commit', function () {
    it('is function');
    it('calls add_expand_parameters if parameters provided');
    describe('request', function () {
      it('calls with method');
      it('calls with url');
      it('posts with parameters');
      it('posts with headers');
    });
    it('parses response');
    it('handles error in response');
    it('handles parse error');
    it('returns instance of Response on success');
    describe('Response', function () {
      it('success to true on success');
      it('success to false on failure');

    });
  });

  //describe('add_expand_parameters');

});
