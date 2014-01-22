var ExpiryDate = require('./expiry_date');

/**
 * constructor
 * @return {[type]} [description]
 */
CreditCard = function() {

};

/**
 * number
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'number', {
  enumerable: true,
  writable: true,
  value: null
});

/**
 * month
 * @type {Integer}
 */
Object.defineProperty(CreditCard.prototype,'month', {
  enumerable: true,
  writable: true,
  value: null
});

/**
 * year
 * @type {Integer}
 */
Object.defineProperty(CreditCard.prototype,'year', {
  enumerable: true,
  writable: true,
  value: null
});

/**
 * brand
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'brand', {
  enumerable: true,
  writable: true,
  value: null
});

/**
 * first_name
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'first_name', {
  enumerable: true,
  writable: true,
  value: ""
});

/**
 * last_name
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'last_name', {
  enumerable: true,
  writable: true,
  value: ""
});

/**
 * verification_value
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'verification_value', {
  enumerable: true,
  writable: true,
  value: null
});

/**
 * track_data
 * @type {String}
 */
Object.defineProperty(CreditCard.prototype,'track_data', {
  enumerable: true,
  writable: true,
  value: null
});

CreditCard.prototype.expiry_date = function() {
  return new ExpiryDate(this.month,this.year);
};

module.exports = CreditCard;
