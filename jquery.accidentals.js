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
					replacement: '\uD834\uDD2B'
				},
				doubleSharp: { //until I learn how to write better regular expressions, we need to search for ## before we search for #
					text: '-double-sharp',
					'b#': '##',
					replacement: '\uD834\uDD2A'
				},
				natural: {
					text: '-natural',
					'b#': 'nat', //used to be 'n|nat' - changed because that wrongly converts the common word 'an'
					replacement: '\u266E'
				},
				flat: {
					text: '-flat',
					'b#': 'b',
					replacement: '\u266D'
				},
				sharp: {
					text: '-sharp',
					'b#': '#',
					replacement: '\u266F'
				}
			},
			defaults = {
				accidentalClassBase: 'accidental',
				accidentalWrap: '<span class="accidental" />',
				caseSensitive: false,
				ignoreWithin: '.no-accidentals',
				inputTypes: ['text'],
				noteNames: '[A-H]',
				noteNameWrap: '',
				outerWrap: ''
			};

		options = $.extend(true, defaults, options); // deep replace = true
		options.caseSensitive = options.caseSensitive ? '' : 'i';

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
				});
			});
		});
	};
}(jQuery));