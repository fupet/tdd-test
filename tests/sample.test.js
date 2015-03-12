var assert = require('chai').assert,
	Sample = require('../libs/sample');

suite('Sample test', function() {
	var singleDataProvider = [
		['a,b,c', ['a', 'b', 'c']],
		['100,982,444,990,1', ['100','982','444','990','1']],
		['Mark,Anthony,marka@lib.de', ['Mark','Anthony','marka@lib.de']]
	],
	multiDataProvider = [
		['211,22,35\n10,20,33', [['211','22','35'], ['10','20','33']]],
		['luxembourg,kennedy,44\nbudapest,expo\nter,5-7 gyors,fo utca,9', [['luxembourg','kennedy','44'],['budapest','expo'],['ter','5-7 gyors','fo utca','9']]]
	],
	testWithData = function(data) {
		test('test data with provider', function() {
			assert.deepEqual(this.sample.stringToArray(data[0]), data[1]);
		});
	};
	setup(function() {
		this.sample = new Sample();

	});

	suite('one-line string input to array', function() {
		singleDataProvider.forEach(testWithData, this);
	});

	suite('multi-line string input to array', function() {
		multiDataProvider.forEach(testWithData, this);
	});
});
