"use strict";

var assert = require('chai').assert;
var CVVResult = require('../lib/cvv_result');

describe('cvv_result', function () {
  var cvvResult;

  beforeEach(function () {
    cvvResult = new CVVResult('D');
  });

  describe('constructor', function () {
    it('requires code', function () {
      assert.throw(function () { var r = new CVVResult(); r.toJSON(); }, 'Invalid code');
    });

    it('sets code', function () {
      assert.equal(cvvResult.code, 'D');
    });
    it('upper cases code', function () {
      var inst = new CVVResult('d');
      assert.equal(inst.code, 'D');
    });
  });

  describe('MESSAGES class property', function () {
    it('is property', function () {
      assert.property(CVVResult, 'MESSAGES');
    });
    it('is object', function () {
      assert.isObject(CVVResult.MESSAGES);
    });
  });

  describe('code', function () {
    it('is property', function () {
      assert.property(cvvResult, 'code');
    });
    it('converts value to upper case', function () {
      cvvResult.code = 'd';
      assert.equal(cvvResult.code, 'D');
    });
  });

  describe('message', function () {
    it('is property', function () {
      assert.property(cvvResult, 'message');
    });
    it('returns mapped value from MESSAGES', function () {
      assert.equal(cvvResult.message, 'Suspicious transaction');
    });
    it('throws exception if you try to set', function () {
      assert.throw(function () {
        cvvResult.message = "Test";
      }, Error);
    });
  });

  describe('messages', function () {
    it('is function', function () {
      assert.isFunction(cvvResult.messages);
    });
  });

  describe('toJSON', function () {
    it('only includes code and message', function () {
      assert.deepEqual(cvvResult.toJSON(), {code: 'D', message: 'Suspicious transaction'});
    });
  });


});
