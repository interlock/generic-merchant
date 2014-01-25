"use strict";
var CVVResult = function (code) {
  Object.defineProperty(this, '_code', {
    enumerable: false,
    writable: true,
    value: null
  });

  Object.defineProperty(this, 'code', {
    enumerable: true,
    get: function () {
      return this._code;
    },
    set: function (v) {
      this._code = v.toUpperCase();
    }
  });

  Object.defineProperty(this, 'message', {
    enumerable: true,
    get: function () {
      return CVVResult.MESSAGES[this.code];
    },
    set: function () {
      throw new Error('Cannot set message');
    }
  });

  this.messages = function () {
    return CVVResult.MESSAGES;
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
