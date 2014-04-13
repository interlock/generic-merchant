"use strict";

var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('underscore');

var StripeGateway = require('../../lib/gateways/stripe');
var CreditCard = require('../../lib/credit_card');

describe.only('StripeGateway', function () {
  var stripeGateway = null;

  beforeEach(function () {
    stripeGateway = new StripeGateway();
  });

  it('sets default live_url', function () {
    assert.equal(stripeGateway.live_url, 'https://api.stripe.com/v1/');
  });

  it('defines supported countries');
  it('has default currency of USD', function () {
    assert.equal(stripeGateway.default_currency, 'usd');
  });
  it('money_format is cents');
  it('defines supported card_types');

  it('defines homepage_url', function () {
    assert.equal(stripeGateway.homepage_url, 'https://stripe.com');
  });

  it('defines display name', function () {
    assert.equal(stripeGateway.display_name, 'Stripe');
  });

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
    var mock = null;

    beforeEach(function () {
      mock = sinon.mock(stripeGateway);
    });

    it('calls create_post_for_auth_or_purchase', function () {
      mock.expects('create_post_for_auth_or_purchase').once().returns({});
      stripeGateway.authorize(1000, {}, {});
      mock.verify();
    });
    it('calls commit', function () {
      mock.expects('commit').once().returns({});
      stripeGateway.authorize(1000, {}, {});
      mock.verify();
    });
  });

  describe('create_post_for_auth_or_purchase', function () {
    var mock = null,
      money = {},
      creditCard = {},
      options = {
        email: 'test@tester.com'
      };

    beforeEach(function () {
      mock = sinon.mock(stripeGateway);
    });
    it('is function', function () {
      assert.isFunction(stripeGateway.create_post_for_auth_or_purchase);
    });
    it('calls add amount', function () {
      mock.expects('add_amount').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it('calls add creditcard', function () {
      mock.expects('add_creditcard').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it('calls add customer', function () {
      mock.expects('add_customer').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it('calls add customer data', function () {
      mock.expects('add_customer_data').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it('sets description', function () {
      var post = stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      assert.equal(post.description, options.description);
    });
    it('sets metadata', function () {
      var post = stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      assert.equal(post.metadata.email, options.email);
    });
    it('calls add_flags', function () {
      mock.expects('add_flags').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it('calls add_application_fee', function () {
      mock.expects('add_application_fee').once();
      stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      mock.verify();
    });
    it.skip('returns post', function () {
      var post = stripeGateway.create_post_for_auth_or_purchase(money, creditCard, options);
      assert.deepEqual(post, {});
    });
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
        var mock = sinon.mock(stripeGateway);
        mock.expects("add_address").once();
        stripeGateway.add_creditcard(post, card, {address: {}});
        mock.verify();
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
    var address = {
      address1: "123 Street",
      address2: "PO Box 123",
      country: "Canada",
      zip: "V1Z1Z1",
      state: "BC",
      city: "Vancouver"
    }, stripe_address = {
      address_line1: address.address1,
      address_line2: address.address2,
      address_country: address.country,
      address_zip: address.zip,
      address_state: address.state,
      address_city: address.city
    }, post = null;

    beforeEach(function () {
      post = {
        card: {}
      };
    });

    it('uses billing_address if present', function () {
      stripeGateway.add_address(post, {billing_address: address});
      assert.deepEqual(post.card, stripe_address);
    });
    it('uses address if no billing address present', function () {
      stripeGateway.add_address(post, {address: address});
      assert.deepEqual(post.card, stripe_address);
    });
  });

  describe('add_customer', function () {
    it('sets customer to options customer if provided and credit_card number not set', function () {

      var post = {},
        creditCard = {},
        options = {
          customer: { name: "Test" }
        };
      stripeGateway.add_customer(post, creditCard, options);
      assert.deepEqual(post.customer, options.customer);
    });
  });

  describe('add_customer_data', function () {
    var post = null,
      options = {
        order_id: 'ABC123',
        description: "Test",
        ip: "127.0.0.1",
        user_agent: "Mocha",
        referrer: "localhost"
      };

    beforeEach(function () {
      post = {};
    });
    it('merges in description, ip, user_agent, referrer to metadata', function () {
      stripeGateway.add_customer_data(post, options);
      assert.deepEqual(post.metadata, _.pick(options, ['description', 'ip', 'user_agent', 'referrer']));
    });
    it('sets external_id to options.order_id', function () {
      stripeGateway.add_customer_data(post, options);
      assert.equal(post.external_id, options.order_id);
    });
    it('sets payment_user_agent', function () {
      stripeGateway.add_customer_data(post, options);
      assert.equal(post.payment_user_agent, "Stripe/v1 GenericMerchantBindings/0.0.1");
    });
  });

  describe('add_flags', function () {
    it('sets uncaptured to true if options.uncaptured true', function () {
      var post = {},
        options = { uncaptured: true};
      stripeGateway.add_flags(post, options);
      assert.equal(post.uncaptured, true);
    });
  });

  describe('add_application_fee', function () {
    it('sets application fee to options.application_fee if present', function () {
      var post = {},
        options = { application_fee: 1000};
      stripeGateway.add_application_fee(post, options);
      assert.equal(post.application_fee, 1000);
    });
  });

  describe('commit', function () {
    it('calls add_expand_parameters if parameters provided', function () {
      var mock = sinon.mock(stripeGateway);
      mock.expects('add_expand_parameters').once();
      stripeGateway.commit('post', 'test', [1]);
      mock.verify();
    });
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

  describe('add_expand_parameters', function () {
    var post = null,
      options = null;

    beforeEach(function () {
      post = {};
      options = {};
    });

    it('passes expand on if array', function () {
      options.expand = [1, 2, 3];
      stripeGateway.add_expand_parameters(post, options);
      assert.equal(post.expand, options.expand);
    });

    it('wraps single value in array', function () {
      options.expand = 1;
      stripeGateway.add_expand_parameters(post, options);
      assert.deepEqual(post.expand, [1]);
    });
  });

});
