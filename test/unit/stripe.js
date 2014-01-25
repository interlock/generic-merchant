"use strict";

var assert = require('chai').assert;

describe('StripeGateway', function () {
  it('sets live_url');
  it('defines supported countries');
  it('has default currency of USD');
  it('money_format is cents');
  it('defines supported card_types');
  it('defines homepage_url');
  it('defines display name');

  describe('constructor', function () {
    it('requires login');
    it('sets api_key with login');
    it('sets fee_refund_api_key with option value');
    it('sets version with option version');
    it('calls Gateway constructor');
  });

  describe('api_key', function () {
    it('is property');
  });

  describe('fee_refund_api_key', function () {
    it('is property');
  });

  describe('version', function () {
    it('is property');
  });

  describe('authorize', function () {
    it('is function');
    it('calls create_post_for_auth_or_purchase');
    it('calls commit');
  });

  describe('create_post_for_auth_or_purchase', function () {
    it('is function');
    it('calls add amount');
    it('calls add creditcard');
    it('calls add customer');
    it('calls add customer data');
    it('sets description');
    it('sets metadata');
    it('calls add_flags');
    it('calls add_application_fee');
    it('returns post');
  });

  describe('add_amount', function () {
    it('is function');
    it('sets amount');
    it('sets currency to options value');
    it('sets currency to default is not provided in options');
    it('lower cases currency');
  });

  describe('add_creditcard', function () {
    it('is function');
    it('sets card on post');
    describe('if instance of CreditCard', function () {
      it('sets swipe_data if track_data provided');
      it('sets number');
      it('sets exp_month');
      it('sets exp_year');
      it('sets cvc if present');
      it('sets name if not empty');
      it('calls add_address');
    });

    describe('if string', function () {
      it('sets swipe_data if track_data provided');
      it('sets card to string if not track_data provided');
    });
  });

  describe('add_address', function () {
    it('is function');
    it('returns immediately if post.card is instance of Hash');
    it('uses billing address if present');
    it('uses address if no billing address present');
    it('sets address_line1');
    it('sets address_line2');
    it('sets address_country');
    it('sets address_zip');
    it('sets address_state');
    it('sets address_city');
  });

  describe('add_customer', function () {
    it('is function');
    it('sets customer to options customer if provided and credit_card number not set');
  });

  describe('add_customer_data', function () {
    it('is function');
    it('merges in description, ip, user_agent, referrer to metadata');
    it('sets external_id to options.order_id');
    it('sets payment_user_agent');
  });

  describe('add_flags', function () {
    it('is function');
    it('sets uncaptured to true if options.uncaptured true');
  });

  describe('add_application_fee', function () {
    it('is function');
    it('sets application fee to options.application_fee if present');
  });

  describe('commit', function () {
    it('is function');
    it('calls add_expand_parameters if parameters provided');
    describe('request', function () {
      it('calls with method');
      it('calls with url');
      it('posts with parameters');
      it('posts with headers');
    });
    it('parses response');
    it('handles error in response');
    it('handles parse error');
    it('returns instance of Response on success');
    describe('Response', function () {
      it('success to true on success');
      it('success to false on failure');

    });
  });

  //describe('add_expand_parameters');

});
