var CVVResult = function(code) {
  this.code = code;
};

Object.defineProperty(CVVResult,'MESSAGES',{
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

Object.defineProperty(CVVResult.prototype, '_code', {
  enumerable: false,
  writable: true,
  value: null
});

Object.defineProperty(CVVResult.prototype, 'code', {
  enumerable: true,
  get: function() {
    return this._code;
  },
  set: function(v) {
    this._code = v.toUpperCase();
  },
});

Object.defineProperty(CVVResult.prototype, 'message', {
  enumerable: true,
  get: function() {
    return CVVResult.MESSAGES[this.code];
  },
  set: function() {
    throw new Error('Cannot set message');
  }
});

CVVResult.prototype.messages = function() {
  return CVVResult.MESSAGES;
};

module.exports = CVVResult;
