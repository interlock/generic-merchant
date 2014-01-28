"use strict";

var assert = require('chai').assert;
var billing = require('../lib/billing');

describe('billing', function () {

  describe('gateway_mode', function () {
    it('is gateway_mode property', function () {
      assert.property(billing, 'gateway_mode');
    });

    it('has default value: production', function () {
      assert.equal(billing.gateway_mode, 'production');
    });

    it('change be changed to: test', function () {
      billing.gateway_mode = 'test';
      assert.equal(billing.gateway_mode, 'test');
      billing.gateway_mode = 'production';
    });

    it('throws Error if set to invalid value', function () {
      assert.throw(function () {
        billing.gateway_mode = 'invalid';
      }, Error);
    });
  });

  describe('integration_mode', function () {
    it('is property', function () {
      assert.property(billing, 'integration_mode');
    });

    it('has default value: production', function () {
      assert.equal(billing.integration_mode, 'production');
    });

    it('change be changed to: test', function () {
      billing.integration_mode = 'test';
      assert.equal(billing.integration_mode, 'test');
      billing.integration_mode = 'production';
    });

    it('throws Error if set to invalid value', function () {
      assert.throw(function () {
        billing.integration_mode = 'invalid';
      }, Error);
    });
  });

  describe('mode', function () {
    it("is function", function () {
      assert.isFunction(billing.mode);
    });

    it('sets both gateway and integration mode', function () {
      billing.mode('test');
      assert.equal(billing.gateway_mode, 'test');
      assert.equal(billing.integration_mode, 'test');
    });
  });

  describe('isTest', function () {
    it('is function', function () {
      assert.isFunction(billing.isTest);
    });

    it('returns true is integration_mode is test', function () {
      billing.integration_mode = 'test';
      assert.isTrue(billing.isTest());
    });

    it('returns false if integration_mode is not test', function () {
      billing.integration_mode = 'production';
      assert.isFalse(billing.isTest());
    });
  });
});
