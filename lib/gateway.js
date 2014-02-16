"use strict";

var _ = require('underscore');

var Billing = require('./billing');

var Gateway = function (options) {

  Object.defineProperties(this, {
    _money_format: {
      enumerable: false,
      writable: true,
      value: 'dollars'
    },
    money_format: {
      enumerable: true,
      configurable: true,
      get: function () {
        return this._money_format;
      },
      set: function (v) {
        if (v === 'dollars' || v === 'cents') {
          this._money_format = v;
        } else {
          throw new Error('money_format must be dollars or cents');
        }
      }
    },
    default_currency: {
      enumerable: true,
      writable: true,
      value: null
    },
    supported_countries: {
      enumerable: true,
      writable: true,
      value: []
    },
    supported_cardtypes: {
      enumerable: true,
      writable: true,
      value: []
    },
    homepage_url: {
      enumerable: true,
      writable: true,
      value: null
    },
    display_name: {
      enumerable: true,
      writable: true,
      value: null
    },
    test_url: {
      enumerable: true,
      writable: true,
      value: null
    },
    live_url: {
      enumerable: true,
      writable: true,
      value: null
    },
    abstract_class: {
      enumerable: true,
      writable: true,
      value: false
    },
    application_id: {
      enumerable: true,
      writable: true,
      value: 'GenericMerchant'
    },
    options: {
      enumerable: true,
      writable: true,
      value: {}
    }
  });

  // initialize
  if (options !== undefined) {
    this.options = options;
  }

  // instance functions
  this.supports = function (cardType) {
    if (this.supported_cardtypes.indexOf(cardType) >= 0) {
      return true;
    }
    return false;
  };

  this.isTest = function () {
    if (this.options.test === true) {
      return true;
    }
    if (Billing.isTest() === true) {
      return true;
    }
    return false;
  };

  this.amount = function (amount) {
    if (amount === null) {
      return null;
    }
    if (_.isString(amount)) {
      throw new Error("String not accepted");
    }

    if (this.money_format === 'dollars') {
      amount = amount / 100;
      return String(amount.toFixed(2));
    }
    return String(amount);
  };

  this.currency = function () {
    return this.default_currency;
  };
};

module.exports = Gateway;
