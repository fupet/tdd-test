var assert = require('chai').assert,
	Sample = require('../libs/sample');

suite('Sample test', function() {
	var dataProvider = [
		['a,b,c', ['a', 'b', 'c']],
		['100,982,444,990,1', ['100','982','444','990','1']],
		['Mark,Anthony,marka@lib.de', ['Mark','Anthony','marka@lib.de']]
	];
	setup(function() {
		this.sample = new Sample();

	});

	suite('one-line string input to array', function() {
		dataProvider.forEach(function(data) {
			test('test data with provider', function() {
				assert.deepEqual(this.sample.stringToArray(data[0]), data[1]);
			});
		});
	});
});
