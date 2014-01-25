"use strict";

var assert = require('chai').assert;
var CreditCard = require('../lib/credit_card');
var ExpiryDate = require('../lib/expiry_date');

describe('credit_card', function () {
  var creditCard;

  beforeEach(function () {
    creditCard = new CreditCard();
  });

  describe('number', function () {
    it('is property', function () {
      assert.property(creditCard, 'number');
    });
  });

  describe('month', function () {
    it('is property', function () {
      assert.property(creditCard, 'month');
    });
  });

  describe('year', function () {
    it('is property', function () {
      assert.property(creditCard, 'year');
    });
  });

  describe('brand', function () {
    it('is property', function () {
      assert.property(creditCard, 'brand');
    });
  });

  describe('first_name', function () {
    it('is property', function () {
      assert.property(creditCard, 'first_name');
    });
  });

  describe('last_name', function () {
    it('is property', function () {
      assert.property(creditCard, 'last_name');
    });
  });

  describe('verification_value', function () {
    it('is property', function () {
      assert.property(creditCard, 'verification_value');
    });
  });

  describe('track_data', function () {
    it('is property', function () {
      assert.property(creditCard, 'track_data');
    });
  });

  describe('expiry_date', function () {
    beforeEach(function () {
      creditCard.month = 2;
      creditCard.year = 2013;
    });

    it('is function', function () {
      assert.isFunction(creditCard.expiry_date);
    });

    it('returns ExpiryDate instance', function () {
      assert.instanceOf(creditCard.expiry_date(), ExpiryDate);
    });

    it('has values matching our properties', function () {
      var expiry = creditCard.expiry_date();
      assert.equal(expiry.month, creditCard.month);
      assert.equal(expiry.year, creditCard.year);
    });
  });

  describe('expired', function () {
    it('is function');
    it('gets expiry_date');
    it('calls expired on expiry_date');
  });

  describe('has_name', function () {
    it('is property');
    it('returns false if first_name or last_name are null');
    it('returns true if first_name and last_name are not null');
  });

  describe('has_first_name', function () {
    it('is property');
    it('returns false if first_name is null');
    it('returns true if first_name is not null');
  });

  describe('has_last_name', function () {
    it('is property');
    it('returns false if last_name is null');
    it('returns true if last_name is not null');
  });

  describe('name', function () {
    it('is function');
    it('returns first and last name concated with space between');
  });

  describe('display_number', function () {
    it('is function');
    it('returns with last four numbers');
    it('masks with X');
  });

  describe('first_digits', function () {
    it('is function');
    it('returns first 6 digits');
  });

  describe('last_digits', function () {
    it('is function');
    it('returns last four digits');
  });

  describe('validate', function () {
    it('is function');
    it('checks essential properties');
    it('checks brand');
    it('checks number');
    it('checks verification_value');
    it('passes on bogus type');
  });

  describe('validate properties', function () {
    it('is function');
    it('error if first_name null');
    it('error if last_name null');
    it('error if month is null');
    it('error if year is null');
    it('error if month is < 1');
    it('error if month is > 12');
    it('error if year < current year');
  });

  describe('validate brand', function () {
    it('is function');
    it('error if null');
    it('error if not in card_companies list');
  });

  describe('validate number', function () {
    it('is function');
    it('error if null');
    it('error if not valid number');
    it('error if does not match brand regex');
  });

  describe('validate verification_value', function () {
    it('is function');
    it('error if value null and required');
    it('no error if value null and not required');
  });

});
