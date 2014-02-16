"use strict";

var ExpiryDate = function (month, year) {
  if (month === undefined) {
    throw new Error("Missing Month");
  }
  if (year === undefined) {
    throw new Error("Missing Year");
  }
  this.month = month;
  this.year = year;

  this.expired = function () {
    var now = new Date(),
      expiration = this.expiration();
    console.log(now);
    console.log(expiration);
    if (expiration.getUTCFullYear() > now.getUTCFullYear()) {
      return false;
    }
    if (expiration.getUTCFullYear() === now.getUTCFullYear() &&
        expiration.getUTCMonth() >= now.getUTCMonth()) {
      return false;
    }
    return true;
  };

  this.expiration = function () {
    return new Date(Date.UTC(this.year, this.month - 1));
  };
};

module.exports = ExpiryDate;
