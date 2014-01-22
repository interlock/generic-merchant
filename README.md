A NodeJS clone of [ActiveMerchant](https://github.com/Shopify/active_merchant)

[![Build Status](https://travis-ci.org/interlock/generic-merchant.png?branch=master)](https://travis-ci.org/interlock/generic-merchant)
[![Code Climate](https://codeclimate.com/github/interlock/generic-merchant.png)](https://codeclimate.com/github/interlock/generic-merchant)

# TODO

* Complete framework to the point a successful transaction can be done. Using Stripe as base case.
* Write Gateway methods to be async with a callback
* Docs
* Examples
* Promote

# Goals

* Mirror ActiveMerchant for functionality, to the extend NodeJS allows.
* Enhance with NodeJS constructs as appropriate.
* Remain stable on even major releases
* 80% or better test coverage with unit tests
* Require proof of integration tests passing for PR for new gateways


# How can you help

* My focus is on gateway implementations right now. Take a look at ActiveMerchant's integration types, see how they might be adapted.
* Port over some common gatesways we do not already have.
* Improve test coverage.
* Write a documenation generator.
* Design a site to promote this project.
* Fix an open issue.
* Use it in one of your projects.
