"use strict";

var CardCompanies =  {
  companies: {
    'visa'               : /^4\d{12}(\d{3})?$/,
    'master'             : /^(5[1-5]\d{4}|677189)\d{10}$/,
    'discover'           : /^(6011|65\d{2}|64[4-9]\d)\d{12}|(62\d{14})$/,
    'american_express'   : /^3[47]\d{13}$/,
    'diners_club'        : /^3(0[0-5]|[68]\d)\d{11}$/,
    'jcb'                : /^35(28|29|[3-8]\d)\d{12}$/,
    'switch'             : /^6759\d{12}(\d{2,3})?$/,
    'solo'               : /^6767\d{12}(\d{2,3})?$/,
    'dankort'            : /^5019\d{12}$/,
    'maestro'            : /^(5[06-8]|6\d)\d{10,17}$/,
    'forbrugsforeningen' : /^600722\d{10}$/,
    'laser'              : /^(6304|6706|6709|6771(?!89))\d{8}(\d{4}|\d{6,7})?$/
  }
};

module.exports = CardCompanies;
