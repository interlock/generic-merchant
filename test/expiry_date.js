"use strict";

var ExpiryDate = require('../lib/expiry_date');

describe('expiry_date', function () {

  describe('constructor', function () {
    it('requires month and year');
    it('sets month and year');
  });

  describe('month', function () {
    it('is property');
  });

  describe('year', function () {
    it('is property');
  });

  describe('expired', function () {
    it('is function');
    it('returns boolean');
    it('returns false when date is future');
    it('returns true if date is in past');
  });

  describe('expiration', function () {
    it('is function');
    it('returns Date instance');
    it('instance is UTC');
  });
});
