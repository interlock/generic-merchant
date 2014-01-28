"use strict";

var assert = require('chai').assert;
var AVSResult = require('../lib/avs_result');

describe('avs_result', function () {
  var avsResult;

  beforeEach(function () {
    avsResult = new AVSResult({code: 'D', street_match: '', postal_match: ''});
  });

  describe('constructor', function () {
    it('requires object', function () {
      assert.throw(function () { var r = new AVSResult(); r.toJSON(); }, 'Requires object');
    });

    it('sets code', function () {
      assert.equal(avsResult.code, 'D');
    });

    it('upper cases code', function () {
      var inst = new AVSResult({code: 'd'});
      assert.equal(inst.code, 'D');
    });
  });

  describe('MESSAGES class property', function () {
    it('is property', function () {
      assert.property(AVSResult, 'MESSAGES');
    });
    it('is object', function () {
      assert.isObject(AVSResult.MESSAGES);
    });
  });

  describe('message', function () {
    it('is property', function () {
      assert.property(avsResult, 'message');
    });
    it('returns mapped value from MESSAGES', function () {
      assert.equal(avsResult.message, 'Street address and postal code match.');
    });
    it('throws exception if you try to set', function () {
      assert.throw(function () {
        avsResult.message = "Test";
      }, Error);
    });
  });

  describe('toJSON', function () {
    it('returns approprite fields', function () {
      assert.deepEqual(avsResult.toJSON(), {code: 'D', 'message': 'Street address and postal code match.', street_match: '', postal_match: ''});
    });
  });
});
