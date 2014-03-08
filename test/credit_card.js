"use strict";

var assert = require('chai').assert;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

require('chai').use(sinonChai);

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

  describe('hasNumber', function () {
    it('returns false if number not set', function () {
      assert.isFalse(creditCard.hasNumber());
    });
    it('returns true if number is set', function () {
      creditCard.number = '4545454545454545';
      assert.isTrue(creditCard.hasNumber());
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
    it('is function', function () {
      assert.isFunction(creditCard.expired);
    });

    it('returns false if not expired', function () {
      creditCard.month = 12;
      creditCard.year = 2020;
      assert.equal(creditCard.expired(), false);
    });

    it('returns true if expired', function () {
      creditCard.month = 12;
      creditCard.year = 2000;
      assert.equal(creditCard.expired(), true);
    });
  });

  describe('hasName', function () {
    it('is function', function () {
      assert.isFunction(creditCard.hasName);
    });

    it('returns false if hasFirstName is false', function () {
      creditCard.first_name = null;
      creditCard.last_name = "Testor";
      assert.equal(creditCard.hasName(), false);
    });

    it('returns false if hasLastName is false', function () {
      creditCard.first_name = "Tester";
      creditCard.last_name = null;
      assert.equal(creditCard.hasName(), false);
    });

    it('returns false if has[firstName|lastName] are false', function () {
      creditCard.first_name = null;
      creditCard.last_name = null;
      assert.equal(creditCard.hasName(), false);
    });

    it('returns true if hasFirstName and hasLastName are true', function () {
      creditCard.first_name = "Tester";
      creditCard.last_name = "Testson";
      assert.equal(creditCard.hasName(), true);
    });
  });

  describe('hasFirstName', function () {
    it('is function', function () {
      assert.isFunction(creditCard.hasFirstName);
    });

    it('returns false if first_name is null', function () {
      creditCard.first_name = null;
      assert.equal(creditCard.hasFirstName(), false);
    });

    it('returns false if first_name is empty string', function () {
      creditCard.first_name = "";
      assert.equal(creditCard.hasFirstName(), false);
    });
    it('returns true if first_name is not null', function () {
      creditCard.first_name = "Tester";
      assert.equal(creditCard.hasFirstName(), true);
    });
  });

  describe('hasLastName', function () {
    it('is function', function () {
      assert.isFunction(creditCard.hasLastName);
    });

    it('returns false if first_name is null', function () {
      creditCard.last_name = null;
      assert.equal(creditCard.hasLastName(), false);
    });

    it('returns false if last_name is empty string', function () {
      creditCard.last_name = "";
      assert.equal(creditCard.hasLastName(), false);
    });
    it('returns true if last_name is not null', function () {
      creditCard.last_name = "Tester";
      assert.equal(creditCard.hasLastName(), true);
    });
  });

  describe('name', function () {
    it('is property', function () {
      assert.property(creditCard, 'name');
    });
    it('returns first and last name concated with space between', function () {
      creditCard.first_name = "Tester";
      creditCard.last_name = "Testerson";
      assert.equal(creditCard.name, "Tester Testerson");
    });
  });

  describe('display_number', function () {
    beforeEach(function () {
      creditCard.number = "5454545454541234";
    });

    it('is property', function () {
      assert.property(creditCard, 'display_number');
    });

    it('returns with last four numbers', function () {
      assert.match(creditCard.display_number, /1234$/);
    });
    it('masks with X', function () {
      assert.match(creditCard.display_number, /[X]+1234$/);
    });
  });

  describe('first_digits', function () {
    beforeEach(function () {
      creditCard.number = "1234567777";
    });

    it('is property', function () {
      assert.property(creditCard, 'first_digits');
    });

    it('returns first 6 digits', function () {
      assert.equal(creditCard.first_digits, '123456');
    });
  });

  describe('last_digits', function () {
    beforeEach(function () {
      creditCard.number = "12345678888";
    });

    it('is property', function () {
      assert.property(creditCard, 'last_digits');
    });

    it('returns last four digits', function () {
      assert.equal(creditCard.last_digits, '8888');
    });
  });

  describe('errors', function () {
    it('is property', function () {
      assert.property(creditCard, 'errors');
    });

    it('is object by default', function () {
      assert.instanceOf(creditCard.errors, Object);
    });
  });

  describe('validate', function () {
    it('is function', function () {
      assert.isFunction(creditCard.validate);
    });

    // it('checks essential properties', function () {

    // });

    // it('checks brand', function () {

    // });

    // it('checks number', function () {

    // });

    // it('checks verification_value', function () {

    // });

    // it('passes on bogus type', function () {

    // });
  });

  describe('validate_properties', function () {
    beforeEach(function () {
      creditCard.first_name = "Tester";
      creditCard.last_name = "Testerson";
      creditCard.month = 12;
      creditCard.year = 2020;
    });

    it('is function', function () {
      assert.isFunction(creditCard.validate_properties);
    });
    it('error if first_name null', function () {
      creditCard.first_name = null;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {first_name: 'Must be set'});
    });
    it('error if last_name null', function () {
      creditCard.last_name = null;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {last_name: 'Must be set'});
    });
    it('error if month is null', function () {
      creditCard.month = null;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {month: 'Must be set'});
    });
    it('error if year is null', function () {
      creditCard.year = null;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {year: 'Must be set'});
    });
    it('error if month is < 1', function () {
      creditCard.month = 0;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {month: 'Must be > 0'});
    });
    it('error if month is > 12', function () {
      creditCard.month = 13;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {month: 'Must be <= 12'});
    });
    it('error if expired', function () {
      creditCard.month = 12;
      creditCard.year = 2000;
      creditCard.validate_properties();
      assert.deepEqual(creditCard.errors, {year: 'Expired'});
    });
  });

  describe('validate_brand', function () {
    beforeEach(function () {
      creditCard.brand = 'visa';
    });
    it('is function', function () {
      assert.isFunction(creditCard.validate_brand);
    });
    it('error if null', function () {
      creditCard.brand = null;
      creditCard.validate_brand();
      assert.deepEqual(creditCard.errors, {brand: 'Is required'});
    });
    it('error if not in card_companies list', function () {
      creditCard.brand = 'madeup';
      creditCard.validate_brand();
      assert.deepEqual(creditCard.errors, {brand: 'Is invalid'});
    });
  });

  describe('validate number', function () {
    beforeEach(function () {
      creditCard.number = "4545454545454545";
    });
    it('is function', function () {
      assert.isFunction(creditCard.validate_number);
    });
    it('error if null', function () {
      creditCard.number = null;
      creditCard.validate_number();
      assert.deepEqual(creditCard.errors, {number: 'Is required'});
    });
    it('error if is not long enough', function () {
      creditCard.number = '4545';
      creditCard.validate_number();
      assert.deepEqual(creditCard.errors, {number: 'Is not long enough to be a valid credit card number'});
    });
    it('error if card checksum is invalid', function () {
      creditCard.number = '454545454545454';
      creditCard.validate_number();
      assert.deepEqual(creditCard.errors, {number: 'Is not a valid credit card number'});
    });
    it('error if does not match brand regex', function () {
      creditCard.brand = 'mastercard';
      creditCard.number = '4111111111111111';
      creditCard.validate_number();
      assert.deepEqual(creditCard.errors, {brand: 'Does not match card'});
    });
  });

  describe('validate verification_value', function () {
    it('is function', function () {
      assert.isFunction(creditCard.validate_verification_value);
    });
    it('error if value null and required', function () {
      creditCard.validate_verification_value();
      assert.deepEqual(creditCard.errors, {verification_value: "Is required"});
    });
    it('no error if value null and not required', function () {
      creditCard.verification_value = '123';
      creditCard.validate_verification_value();
      assert.deepEqual(creditCard.errors, {});
    });
  });

});
