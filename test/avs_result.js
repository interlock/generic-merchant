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

  describe('toJSON', function () {
    it('returns approprite fields', function () {
      assert.deepEqual(avsResult.toJSON(), {code: 'D', 'message': 'Street address and postal code match.', street_match: '', postal_match: ''});
    });
  });
});
