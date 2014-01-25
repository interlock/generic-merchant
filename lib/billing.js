"use strict";

var billing = {
};

// gateway_mode
Object.defineProperties(billing, {
  '_gateway_mode': {
    value: 'production',
    writable: true,
    enumerable: false
  },
  'gateway_mode': {
    enumerable: true,
    get: function () {
      return this._gateway_mode;
    },
    set: function (v) {
      if (v === 'production' || v === 'test') {
        this._gateway_mode = v;
      } else {
        throw new Error('Invalid gateway_mode. Valid options are: production and test');
      }
    }
  },
  '_integration_mode': {
    value: 'production',
    writable: true,
    enumerable: false
  },
  'integration_mode': {
    enumerable: true,
    get: function () {
      return this._integration_mode;
    },
    set: function (v) {
      if (v === 'production' || v === 'test') {
        this._integration_mode = v;
      } else {
        throw new Error('Invalid integration_mode. Valid options are: production and test');
      }
    }
  }
});

/**
 * mode
 */
billing.mode = function (v) {
  this.integration_mode = v;
  this.gateway_mode = v;
};

module.exports = billing;
