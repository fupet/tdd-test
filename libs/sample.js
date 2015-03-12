var Sample = function() {
	this._settings = {
		useFirstLineAsLabels : '0',
		columnDelimiter      : ',',
		lineDelimiter        : '\n'
	};
};

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
	if (input[0] === '#') {
		if (input.indexOf(Sample.LABEL_IDENTIFIER) === 0) {
			this._settings.useFirstLineAsLabels = '1';
		}
		else {
			this._parseSettings(input);
		}
		input = input.substr(input.indexOf('\n')+1);
		if (this._settings.useFirstLineAsLabels === '1') {
			return this._splitWithLabel(input);
		}
		else {
			return this._splitWithNewLine(input);
		}
	}
	else if (input.indexOf(this._settings.lineDelimiter) !== -1) {
		return this._splitWithNewLine(input);
	}
	return this._splitStringByComa(input);
};

/**
 * Parses the settings from the query string in the first line, and saves it.
 * @param {string} input
 * @private
 */
Sample.prototype._parseSettings = function(input) {
	var settings = input.substr(1).split('\n').shift().split('&');
	for (var i in settings) {
		if (settings.hasOwnProperty(i)) {
			settings[i] = settings[i].split('=');
			if (settings[i][0] in this._settings) {
				this._settings[settings[i][0]] = settings[i][1];
			}
		}
	}
};

/**
 * Splits the input string by comas and returns an array.
 * @param {string} input   The input string to be splitted.
 * @returns {Array|*}
 * @private
 */
Sample.prototype._splitStringByComa = function(input) {
	return input.split(this._settings.columnDelimiter);
};

/**
 * If the string starts with label then use it.
 * @param {string} input
 * @returns {{labels: Array, data: Array}}
 * @private
 */
Sample.prototype._splitWithLabel = function(input) {
	input = input.split(this._settings.lineDelimiter);
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
	input = input.split(this._settings.lineDelimiter);
	for (var i in input) {
		if (input.hasOwnProperty(i)) {
			input[i] = this._splitStringByComa(input[i]);
		}
	}
	return input;
};

module.exports = Sample;
