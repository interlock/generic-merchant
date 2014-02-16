"use strict";

var assert = require('chai').assert;
var ExpiryDate = require('../lib/expiry_date');

describe('expiry_date', function () {
  var expiry;

  beforeEach(function () {
    expiry = new ExpiryDate(12, 2012);
  });

  describe('constructor', function () {
    it('requires month', function () {
      assert.throw(function () {
        expiry = new ExpiryDate();
        expiry.month = 1;
      });
    });

    it('requires year', function () {
      assert.throw(function () {
        expiry = new ExpiryDate(12);
        expiry.month = 1;
      });
    });

    it('sets month and year', function () {
      expiry = new ExpiryDate(12, 2012);
      assert.equal(expiry.month, 12);
      assert.equal(expiry.year, 2012);
    });
  });

  describe('month', function () {
    it('is property', function () {
      assert.property(expiry, 'month');
    });
  });

  describe('year', function () {
    it('is property', function () {
      assert.property(expiry, 'year');
    });
  });

  describe('expired', function () {
    it('is function', function () {
      assert.isFunction(expiry.expired);
    });
    it('returns boolean', function () {
      assert.isBoolean(expiry.expired());
    });
    it('returns false when year is infuture', function () {
      var now = new Date();
      expiry = new ExpiryDate(12, now.getUTCFullYear() + 1);
      assert.equal(expiry.expired(), false);
    });
    it('returns false when year is same but month is in future', function () {
      var now = new Date();
      expiry = new ExpiryDate(12, now.getUTCFullYear());
      assert.equal(expiry.expired(), false);
    });
    it('returns true if date is in past', function () {
      expiry = new ExpiryDate(1, 2000);
      assert.equal(expiry.expired(), true);
    });
  });

  describe('expiration', function () {
    it('is function', function () {
      assert.isFunction(expiry.expiration);
    });
    it('returns Date instance', function () {
      assert.instanceOf(expiry.expiration(), Date);
    });
    it('has matching values', function () {
      var expiration = expiry.expiration();
      assert.equal(expiration.getUTCFullYear(), 2012);
      assert.equal(expiration.getUTCMonth(), 11);
    });
  });
});
