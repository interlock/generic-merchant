"use strict";

var assert = require('chai').assert;
var Gateway = require('../lib/gateway');
var Billing = require('../lib/billing');

describe('gateway', function () {
  var gateway;

  beforeEach(function () {
    gateway = new Gateway({});
  });

  describe('money_format', function () {
    it('is property', function () {
      assert.property(gateway, 'money_format');
    });

    it('default is dollars', function () {
      assert.equal(gateway.money_format, 'dollars');
    });

    it('can be cents', function () {
      gateway.money_format = 'cents';
      assert.equal(gateway.money_format, 'cents');
    });

    it('cannot be invalid value', function () {
      assert.throws(function () { gateway.money_format = 'invalid'; }, Error);
    });
  });

  describe('default_currency', function () {
    it('is property', function () {
      assert.property(gateway, 'default_currency');
    });

    it('defaults to null', function () {
      assert.equal(gateway.default_currency, null);
    });
  });

  describe('supported_countries', function () {
    it('is property', function () {
      assert.property(gateway, 'supported_countries');
    });

    it('default to empty array', function () {
      assert.deepEqual(gateway.supported_countries, []);
    });
  });

  describe('supported_cardtypes', function () {
    it('is property', function () {
      assert.property(gateway, 'supported_cardtypes');
    });

    it('defaults to empty array', function () {
      assert.deepEqual(gateway.supported_cardtypes, []);
    });
  });

  describe('homepage_url', function () {
    it('is property', function () {
      assert.property(gateway, 'homepage_url');
    });

    it('defaults to null', function () {
      assert.equal(gateway.homepage_url, null);
    });
  });

  describe('display_name', function () {
    it('is property', function () {
      assert.property(gateway, 'display_name');
    });

    it('defaults to null', function () {
      assert.deepEqual(gateway.display_name, null);
    });
  });

  describe('test_url', function () {
    it('is property', function () {
      assert.property(gateway, 'test_url');
    });

    it('defaults to null', function () {
      assert.equal(gateway.test_url, null);
    });
  });

  describe('live_url', function () {
    it('is property', function () {
      assert.property(gateway, 'live_url');
    });

    it('defaults to null', function () {
      assert.equal(gateway.live_url, null);
    });
  });

  describe('abstract_class', function () {
    it('is property', function () {
      assert.property(gateway, 'abstract_class');
    });

    it('default value is false', function () {
      assert.equal(gateway.abstract_class, false);
    });
  });

  describe('application_id', function () {
    it('it property', function () {
      assert.property(gateway, 'application_id');
    });

    it('default value is GenericMerchant', function () {
      assert.equal(gateway.application_id, 'GenericMerchant');
    });
  });

  describe('options', function () {
    it('is property', function () {
      assert.property(gateway, 'options');
    });

    it('default is empty object', function () {
      assert.deepEqual(gateway.options, {});
    });
  });

  describe('supports', function () {
    it('is function', function () {
      assert.isFunction(gateway.supports);
    });

    it('returns true if card_type is in list', function () {
      gateway.supported_cardtypes.push('amex');
      assert.isTrue(gateway.supports('amex'));
    });

    it('returns false if card_type not in list', function () {
      assert.isFalse(gateway.supports('amex'));
    });
  });

  describe('constructor', function () {
    it('takes options argument and sets options property', function () {
      gateway = new Gateway({test: 'a'});
      assert.deepEqual(gateway.options, {test: 'a'});
    });
  });

  describe('isTest', function () {
    it('is function', function () {
      assert.isFunction(gateway.isTest);
    });

    it('returns true if test in options', function () {
      gateway = new Gateway({test: true});
      assert.isTrue(gateway.isTest());
    });

    it('returns true if billing.test is true', function () {
      Billing.integration_mode = 'test';
      assert.isTrue(gateway.isTest());
    });

    it('returns false if options.test and billing.test are false', function () {
      Billing.integration_mode = 'production';
      assert.isFalse(gateway.isTest());
    });
  });

  describe('amount', function () {
    it('is function', function () {
      assert.isFunction(gateway.amount);
    });

    it('returns null if null provided', function () {
      assert.strictEqual(gateway.amount(null), null);
    });

    it('throws exception if money is a string', function () {
      assert.throws(function () { gateway.amount("0.00"); }, Error);
    });
    it('returns string in cents if money_format is cents', function () {
      gateway.money_format = 'cents';
      assert.equal(gateway.amount(100), "100");
    });
    it('returns string with two decimal places if money_formay is dollars', function () {
      gateway.money_format = 'dollars';
      assert.equal(gateway.amount(100), "1.00");
    });
  });

  describe('currency', function () {
    it('is function', function () {
      assert.isFunction(gateway.currency);
    });

    it('returns default_currency', function () {
      assert.equal(gateway.currency(), gateway.default_currency);
    });
  });
});
