"use strict";
var assert = require('chai').assert;
var Response = require('../lib/response');

describe('response', function() {

  describe('params', function() {
    it('is property');
  });

  describe('message', function() {
    it('is property');
  });

  describe('test', function() {
    it('is property');
  })
  ;
  describe('authorization', function() {
    it('is property');
  });

  describe('avs_result', function() {
    it('is property');
  });

  describe('cvv_result', function() {
    it('is property');
  });

  describe('is_success', function() {
    it('is function');
    it('returns true if success is true');
  });

  describe('is_test', function() {
    it('is function');
    it('returns true if test is true');
  });

  describe('is_fraud_review', function() {
    it('is function');
    it('returns true if fraud_review is true');
  });

  describe('constructor', function() {
    var response;
    beforeEach(function() {
      response = new Response(true, "Transaction Successfull");
    });
    it('sets success',function() {
      assert.equal(response.success,true);
    });
    it('sets message',function() {
      assert.equal(response.message,"Transaction Successfull");
    });
    it('sets params if given');
    it('sets authorization with options.authorization');
    it('sets fraud_review with options.fraud_review');
    it('sets avs_result to hash of options.avs_result if instance of AVSResult');
    it('sets avs_result to hash of new AVSResult from options.avs_result');
    it('sets cvv_result to hash of options.cvv_result if instance of CVVResult');
    it('sets cvv_result to hash of new CVVResult from options.cvv_result');
  });
});
