"use strict";

var assert = require('chai').assert;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

require('chai').use(sinonChai);

var CardCompanies = require('../lib/card_companies');

describe('CardCompanies', function () {

  describe('matchCompany', function () {
    it('matches visa', function () {
      assert.equal(CardCompanies.matchCompany('4545454545454545'), 'visa');
    });
  });
});
