var Sample = function() {};

/**
 * Splits the input string into an array.
 * @param {string} input   The input to be split.
 * @returns {*}
 */
Sample.prototype.stringToArray = function(input) {
	if (typeof input === 'string') {
		if (input.indexOf('\n') !== -1) {
			input = input.split('\n');
			for (var i in input) {
				if (input.hasOwnProperty(i)) {
					input[i] = this._splitStringByComa(input[i]);
				}
			}
			return input;
		}
		return this._splitStringByComa(input);
	}
	else {
		throw new TypeError('Only string type accepted!');
	}
};

/**
 * Splits the input string by comas and returns an array.
 * @param {string} input   The input string to be splitted.
 * @returns {Array|*}
 * @private
 */
Sample.prototype._splitStringByComa = function(input) {
	return input.split(',');
};

module.exports = Sample;
