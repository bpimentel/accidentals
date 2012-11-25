/*
	jQuery Accidentals
	Copyright 2012 by Bret Pimentel http://bretpimentel.com
	Available under MIT license. See LICENSE.txt for more information.
*/

(function ($) {

	'use strict';

	$.fn.accidentals = function (options) {

		function forEachIn(object, action) {
			var property;
			for (property in object) {
				if (object.hasOwnProperty(property)) {
					action(property, object[property]);
				}
			}
		}

		var $testDiv,
			accidentals = {
				doubleFlat: {
					text: '-double-flat',
					'b#': 'bb',
					replacement: '\uD834\uDD2B',
					safe: true
				},
				doubleSharp: { //until I learn how to write better regular expressions, we need to search for ## before we search for #
					text: '-double-sharp',
					'b#': '##',
					replacement: '\uD834\uDD2A',
					safe: true
				},
				natural: {
					text: '-natural',
					'b#': 'nat', //used to be 'n|nat' - changed because it converts the common word 'an'
					replacement: '\u266E',
					safe: true
				},
				flat: {
					text: '-flat',
					'b#': 'b',
					replacement: '\u266D',
					safe: true
				},
				sharp: {
					text: '-sharp',
					'b#': '#',
					replacement: '\u266F',
					safe: true
				}
			},
			knownSafeSingle = ['iPod', 'iPhone', 'iPad'], //these fail the safeMode test, but do actually have symbols available
			//knownSafeDouble = [], //none known
			defaults = {
				accidentalClassBase: 'accidental',
				accidentalWrap: '<span class="accidental" />',
				caseSensitive: false,
				ignoreWithin: '.no-accidentals',
				inputTypes: ['text'],
				noteNames: '[A-H]',
				noteNameWrap: '',
				outerWrap: '',
				safeMode: true
			};

		options = $.extend(true, defaults, options); // deep replace = true
		options.caseSensitive = options.caseSensitive ? '' : 'i';

		if (options.safeMode) {
			$testDiv = $('<div style="visibility: hidden" />').appendTo($(this).first());
			forEachIn(accidentals, function (k, v) {
				$testDiv.append('<span style="font-size: 999px; margin: 0; padding: 0;" class="' + k + '">' + v.replacement + '</span>');
			});
			if (!navigator.userAgent.match(new RegExp(knownSafeSingle.join('|'), 'gi')) && $testDiv.find('.flat').width() === $testDiv.find('.sharp').width() && $testDiv.find('.flat').width() === $testDiv.find('.natural').width()) { //if these are the same width, we'll guess that natural, sharp, and flat glyphs don't exist in the user's local font
				accidentals.flat.safe = false;
				accidentals.sharp.safe = false;
				accidentals.natural.safe = false;
			}
			if ($testDiv.find('.doubleFlat').width() === $testDiv.find('.doubleSharp').width()) { //consider these separately, since they are more likely to be missing
				accidentals.doubleFlat.safe = false;
				accidentals.doubleSharp.safe = false;
			}
			$testDiv.remove();
		}

		function recursiveReplace(node, search, replace) {
			var newContents;
			if (!options.ignoreWithin || (options.ignoreWithin && $(node).closest(options.ignoreWithin).length === 0)) {
				if (node.nodeType === 3) { // it's a text node
					newContents = node.nodeValue.replace(search, replace);
					if (/</.test(newContents)) {
						$(node).before(newContents).remove();
					} else {
						node.nodeValue = newContents;
					}
				} else if (node.nodeType === 1) { // it's an element
					$(node).contents().each(function () {
						recursiveReplace(this, search, replace);
					});
				}
			}
		}

		return this.each(function () {
			var $this = $(this);
			forEachIn(options.inputTypes, function (k, v) {
				forEachIn(accidentals, function (k2, v2) {
					if (accidentals[k2].safe) {
						$this.contents().each(function () {
							var search = new RegExp('\\b(' + options.noteNames + ')(' + v2[v] + ')(?=(s)?(\\b|\\s|\\W|$))', 'g' + options.caseSensitive),
								txt,
								replace = function ($0, $1) {
									var note = $1,
										symbol = v2.replacement,
										output;
									if (options.noteNameWrap) {
										note = $(options.noteNameWrap).text(note).wrap('<div />').parent().html();
									}
									if (options.accidentalWrap) {
										txt = options.accidentalClassBase ? v2.text : v2.text.replace(/^-/, '');
										symbol = $(options.accidentalWrap).addClass(options.accidentalClassBase + txt).text(symbol).wrap('<div />').parent().html();
									}
									if (options.outerWrap) {
										output = $(options.outerWrap).html(note + symbol).wrap('<div />').parent().html();
									} else {
										output = note + symbol;
									}
									return output;
								};
							recursiveReplace(this, search, replace);
						});
					}
				});
			});
		});
	};
}(jQuery));