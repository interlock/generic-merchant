"use strict";

var assert = require('chai').assert;

describe('gateway', function () {

  describe('money_format', function () {
    it('is property');
    it('default is dollars');
    it('can be cents');
    it('cannot be invalid value');
  });

  describe('default_currency', function () {
    it('is property');
  });

  describe('supported_countries', function () {
    it('is property');
    it('default to empty array');
  });

  describe('supported_cardtypes', function () {
    it('is property');
    it('defaults to empty array');
  });

  describe('homepage_url', function () {
    it('is property');
  });

  describe('display_name', function () {
    it('is property');
  });

  describe('test_url', function () {
    it('is property');
  });

  describe('live_url', function () {
    it('is property');
  });

  describe('abstract_class', function () {
    it('is property');
    it('default value is false');
  });

  describe('application_id', function () {
    it('it property');
    it('default value is GenericMerchant');
  });

  describe('options', function () {
    it('is property');
    it('default is empty object');
  });

  describe('supports', function () {
    it('is function');
    it('returns true if card_type is in list');
    it('returns false if card_type not in list');
  });

  describe('constructor', function () {
    it('takes options argument and sets options property');
  });

  describe('isTest', function () {
    it('is function');
    it('returns true if test in options');
    it('returns true if billing.test is true');
    it('returns false if options.test and billing.test are false');
  });

  describe('amount', function () {
    it('returns null if null provided');
    it('throws exception if money is a string');
    it('returns string in cents if money_format is cents');
    it('returns string with two decimal places if money_formay is dollars');
  });

  describe('currency', function () {
    it('is function');
    it('returns default_currency');
  });
});
