"use strict";
var assert = require('chai').assert,
  Response = require('../lib/response'),
  AVSResult = require('../lib/avs_result'),
  CVVResult = require('../lib/cvv_result');

describe('response', function () {
  var response,
    params = {
      something: 'else'
    },
    options = {
      test: true,
      authorization: "ABC123",
      fraud_review: true,
      avs_result: {code: 'D'},
      cvv_result: "A"
    };

  beforeEach(function () {
    response = new Response(true, "Message", params, options);
  });

  describe('params', function () {
    it('is property', function () {
      assert.property(response, 'params');
    });

    it('defaults to empty object', function () {
      assert.isObject(response.params);
    });

    it('is enumerable', function () {
      assert.isTrue(response.propertyIsEnumerable('params'));
    });
  });

  describe('message', function () {
    it('is property', function () {
      assert.property(response, 'message');
    });

    it('is enumerable', function () {
      assert.isTrue(response.propertyIsEnumerable('message'));
    });
  });

  describe('test', function () {
    it('is property', function () {
      assert.property(response, 'test');
    });
    it('not enumerable', function () {
      assert.isFalse(response.propertyIsEnumerable('test'));
    });
  });

  describe('authorization', function () {
    it('is property', function () {
      assert.property(response, 'authorization');
    });
  });

  describe('avs_result', function () {
    it('is property', function () {
      assert.property(response, 'avs_result');
    });
  });

  describe('cvv_result', function () {
    it('is property', function () {
      assert.property(response, 'cvv_result');
    });
  });

  describe('is_success', function () {
    it('is function', function () {
      assert.isFunction(response.is_success);
    });

    it('returns true if success is true', function () {
      assert.isTrue(response.is_success());
    });
  });

  describe('is_test', function () {
    it('is function', function () {
      assert.isFunction(response.is_test);
    });

    it('returns false if test is false', function () {
      assert.isFalse(response.is_test());
    });
  });

  describe('is_fraud_review', function () {
    it('is function', function () {
      assert.isFunction(response.is_fraud_review);
    });
    it('returns fraud_review value', function () {
      assert.isTrue(response.is_fraud_review());
    });
  });

  describe('constructor', function () {
    it('sets success', function () {
      assert.equal(response.success, true);
    });
    it('sets message', function () {
      assert.equal(response.message, "Message");
    });
    it('sets params if given', function () {
      assert.equal(response.params, params);
    });
    it('sets authorization with options.authorization', function () {
      assert.equal(response.authorization, options.authorization);
    });
    it('sets fraud_review with options.fraud_review', function () {
      assert.equal(response.fraud_review, options.fraud_review);
    });

    it('sets avs_result to hash of options.avs_result if instance of AVSResult', function () {
      var avsResult = new AVSResult({code: 'D'});
      response = new Response(true, "Message", {}, {avs_result: avsResult});
      assert.deepEqual(avsResult.toJSON(), response.avs_result);
    });

    it('sets avs_result to hash of new AVSResult from options.avs_result', function () {
      var avsResult = {code: 'D'};
      response = new Response(true, "Message", {}, {avs_result: avsResult});
      assert.deepEqual(response.avs_result, {code: 'D', message: 'Street address and postal code match.', street_match: '', postal_match: ''});
    });

    it('sets cvv_result to hash of options.cvv_result if instance of CVVResult', function () {
      var cvvResult = new CVVResult('D');
      response = new Response(true, "Message", {}, {cvv_result: cvvResult});
      assert.deepEqual(cvvResult.toJSON(), response.cvv_result);
    });
    it('sets cvv_result to hash of new CVVResult from options.cvv_result', function () {
      var cvvResult = 'D';
      response = new Response(true, "Message", {}, {cvv_result: cvvResult});
      assert.deepEqual(response.cvv_result, {code: 'D', message: 'Suspicious transaction'});
    });
  });
});
