"use strict";

var ExpiryDate = require('./expiry_date');
var CardCompanies = require('./card_companies');

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

  Object.defineProperty(this, 'display_number', {
    enumerable: true,
    get: function () {
      var mask = new Array(this.number.length - 4).join("X");
      return mask + this.number.substr(-4);
    }
  });

  Object.defineProperty(this, 'first_digits', {
    enumerable: true,
    get: function () {
      return this.number.substr(0, 6);
    }
  });

  Object.defineProperty(this, 'last_digits', {
    enumerable: true,
    get: function () {
      return this.number.substr(-4);
    }
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

  Object.defineProperty(this, 'name', {
    enumerable: true,
    get: function () {
      return this.first_name + " " + this.last_name;
    }
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

  Object.defineProperty(this, 'errors', {
    enumerable: true,
    writable: true,
    value: {}
  });

  /**
   * Get the ExpiryDate for the card
   * @return {[type]} [description]
   */
  this.expiry_date = function () {
    return new ExpiryDate(this.month, this.year);
  };

  /**
   *
   */
  this.expired = function () {
    return this.expiry_date().expired();
  };

  this.hasFirstName = function () {
    if (this.first_name === null || this.first_name === "") {
      return false;
    }
    return true;
  };

  this.hasLastName = function () {
    if (this.last_name === null || this.last_name === "") {
      return false;
    }
    return true;
  };

  this.hasName = function () {
    if (this.hasFirstName() === false || this.hasLastName() === false) {
      return false;
    }
    return true;
  };

  this.validate = function () {
    return;
  };

  this.validate_properties = function () {
    if (this.hasFirstName() === false) {
      this.errors.first_name = 'Must be set';
    }
    if (this.hasLastName() === false) {
      this.errors.last_name = 'Must be set';
    }
    if (this.month === null) {
      this.errors.month = 'Must be set';
    } else if (this.month < 1) {
      this.errors.month = 'Must be > 0';
    } else if (this.month > 12) {
      this.errors.month = 'Must be <= 12';
    }
    if (this.year === null) {
      this.errors.year = 'Must be set';
    } else if (this.expired()) {
      this.errors.year = 'Expired';
    }
    return;
  };

  this.validate_brand = function () {
    console.log(CardCompanies.companies);
    if (this.brand === null) {
      this.errors.brand = 'Is required';
    } else if (CardCompanies.companies[this.brand] === undefined) {
      this.errors.brand = 'Is invalid';
    }
  };
};

module.exports = CreditCard;
