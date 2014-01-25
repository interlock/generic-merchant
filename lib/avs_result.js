"use strict";

var AVSResult = function (attrs) {
  if (attrs === undefined) {
    throw new Error('Requires object');
  }

  this.toJSON = function () {
    return {
      code: this.code,
      message: this.message,
      street_match: '',
      postal_match: ''
    };
  };

  this.code = attrs.code.toUpperCase();
  this.message = 'Street address and postal code match.';
  return;
};

module.exports = AVSResult;
