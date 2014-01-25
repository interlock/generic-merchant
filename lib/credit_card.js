"use strict";

var ExpiryDate = require('./expiry_date');

/**
 * constructor
 * @return {[type]} [description]
 */
var CreditCard = function () {

  /**
   * number
   * @type {String}
   */
  Object.defineProperty(this, 'number', {
    enumerable: true,
    writable: true,
    value: null
  });

  /**
   * month
   * @type {Integer}
   */
  Object.defineProperty(this, 'month', {
    enumerable: true,
    writable: true,
    value: null
  });

  /**
   * year
   * @type {Integer}
   */
  Object.defineProperty(this, 'year', {
    enumerable: true,
    writable: true,
    value: null
  });

  /**
   * brand
   * @type {String}
   */
  Object.defineProperty(this, 'brand', {
    enumerable: true,
    writable: true,
    value: null
  });

  /**
   * first_name
   * @type {String}
   */
  Object.defineProperty(this, 'first_name', {
    enumerable: true,
    writable: true,
    value: ""
  });

  /**
   * last_name
   * @type {String}
   */
  Object.defineProperty(this, 'last_name', {
    enumerable: true,
    writable: true,
    value: ""
  });

  /**
   * verification_value
   * @type {String}
   */
  Object.defineProperty(this, 'verification_value', {
    enumerable: true,
    writable: true,
    value: null
  });

  /**
   * track_data
   * @type {String}
   */
  Object.defineProperty(this, 'track_data', {
    enumerable: true,
    writable: true,
    value: null
  });

  this.expiry_date = function () {
    return new ExpiryDate(this.month, this.year);
  };
};


module.exports = CreditCard;
