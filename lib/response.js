"use strict";

var _ = require('underscore'),
  AVSResult = require('./avs_result'),
  CVVResult = require('./cvv_result');

var Response = function (success, message, params, options) {
  Object.defineProperties(this, {
    "params": {
      enumerable: true,
      writable: true,
      value: {}
    },
    "message": {
      enumerable: true,
      writable: true,
      value: ""
    },
    "test": {
      enumerable: false,
      writable: true,
      value: false
    },
    "authorization": {
      enumerable: true,
      writable: true,
      value: null
    },
    "avs_result": {
      enumerable: true,
      writable: true,
      value: null
    },
    "cvv_result": {
      enumerable: true,
      writable: true,
      value: null
    },
    "fraud_review": {
      enumerable: true,
      writable: true,
      value: false
    }
  });
  var avs_result, cvv_result;
  this.success = success;
  this.message = message;
  if (params !== undefined) {
    this.params = params;
  }
  if (options.authorization !== undefined) {
    this.authorization = options.authorization;
  }
  if (options.fraud_review !== undefined) {
    this.fraud_review = options.fraud_review;
  }
  if (options.avs_result !== undefined && options.avs_result instanceof AVSResult) {
    this.avs_result = options.avs_result.toJSON();
  } else if (options.avs_result !== undefined && _.isObject(options.avs_result)) {
    avs_result = new AVSResult(options.avs_result);
    this.avs_result = avs_result.toJSON();
  }
  if (options.cvv_result !== undefined && options.cvv_result instanceof CVVResult) {
    this.cvv_result = options.cvv_result.toJSON();
  } else if (options.cvv_result !== undefined && _.isString(options.cvv_result)) {
    cvv_result = new CVVResult(options.cvv_result);
    this.cvv_result = cvv_result.toJSON();
  }
};

Response.prototype.is_success = function () {
  return this.success;
};
Response.prototype.is_test = function () {
  return this.test;
};
Response.prototype.is_fraud_review = function () {
  return this.fraud_review;
};

module.exports = Response;
