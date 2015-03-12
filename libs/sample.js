var Sample = function() {};

/**
 * Splits the string into array.
 * @param input
 * @returns {string[]}
 */
Sample.prototype.stringToArray = function(input) {
	if (typeof input === 'string') {
		return input.split(',');
	}
	else {
		throw new TypeError('Only string type accepted!');
	}
};

module.exports = Sample;
