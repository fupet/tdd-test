var assert = require('chai').assert,
	sinon = require('sinon'),

	Sample = require('../libs/sample');

suite('Sample test', function() {
	setup(function() {
		this.sample = new Sample();
	});

	test('Sample should return with 1', function() {
		assert.equal(this.sample.returnWithNumberOne(), 1, 'Boo.');
	});
});