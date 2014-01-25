"use strict";
var CVVResult = function (code) {
  if (code === undefined) {
    throw new Error("Invalid code");
  }
  Object.defineProperties(this, {
    '_code': {
      enumerable: false,
      writable: true,
      value: null
    },
    'code': {
      enumerable: true,
      get: function () {
        return this._code;
      },
      set: function (v) {
        this._code = v.toUpperCase();
      }
    },
    'message': {
      enumerable: true,
      get: function () {
        return CVVResult.MESSAGES[this.code];
      },
      set: function () {
        throw new Error('Cannot set message');
      }
    }
  });

  this.messages = function () {
    return CVVResult.MESSAGES;
  };
  this.toJSON = function () {
    return {
      code: this.code,
      message: this.message
    };
  };

  this.code = code;
};

Object.defineProperty(CVVResult, 'MESSAGES', {
  value: {
    'D': 'Suspicious transaction',
    'I': 'Failed data validation check',
    'M': 'Match',
    'N': 'No Match',
    'P': 'Not Processed',
    'S': 'Should have been present',
    'U': 'Issuer unable to process request',
    'X': 'Card does not support verification'
  }
});



module.exports = CVVResult;
