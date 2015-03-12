var Sample = function() {};

Sample.LABEL_IDENTIFIER = '#useFirstLineAsLabels\n';

/**
 * Splits the input string into an array.
 * @param {string} input   The input to be split.
 * @returns {*}
 */
Sample.prototype.stringToArray = function(input) {
	if (typeof input !== 'string') {
		throw new TypeError('Only string type accepted!');
	}
	if (input.indexOf(Sample.LABEL_IDENTIFIER) === 0) {
		return this._splitWithLabel(input);
	}
	else if (input.indexOf('\n') !== -1) {
		return this._splitWithNewLine(input);
	}
	return this._splitStringByComa(input);
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

/**
 * If the string starts with label then use it.
 * @param {string} input
 * @returns {{labels: Array, data: Array}}
 * @private
 */
Sample.prototype._splitWithLabel = function(input) {
	input = input.substr(Sample.LABEL_IDENTIFIER.length).split('\n');
	var out = {labels : [], data: []}, line, i;
	for (i in input) {
		if (input.hasOwnProperty(i)) {
			line = this._splitStringByComa(input[i]);
			if (parseInt(i, 10) === 0) {
				out.labels = line;
			}
			else {
				out.data.push(line);
			}
		}
	}
	return out;
};

/**
 * The input string will be splitted into multi dimensional array by lines and comas.
 * @param {string} input
 * @returns {Array|*}
 * @private
 */
Sample.prototype._splitWithNewLine = function(input) {
	input = input.split('\n');
	for (var i in input) {
		if (input.hasOwnProperty(i)) {
			input[i] = this._splitStringByComa(input[i]);
		}
	}
	return input;
};

module.exports = Sample;
