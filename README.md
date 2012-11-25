Title: jquery.accidentals.js | Bret Pimentel
Author: Bret Pimentel
Affiliation: http://bretpimentel.com
CSS: bootstrap/css/bootstrap.min.css
CSS: bootstrap/css/bootstrap-responsive.min.css
CSS: google-code-prettify/prettify.css
CSS: style.css
HTML header: <meta name="viewport" content="width=device-width, initial-scale=1.0">
HTML header: <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
HTML header: <script src="google-code-prettify/prettify.js"></script>
HTML header: <script src="accidentals.js"></script>
HTML header: <script src="jquery.accidentals.js"></script>



<div class="container-fluid">

#jquery.accidentals.js

<div class="row-fluid">
<div class="span7">

by [Bret Pimentel][]

**jquery.accidentals.js** is a [jQuery][] plugin for music-related projects. It attempts to identify accidentals (flats, naturals, sharps, double-flats, and double-sharps) typed in plain text, and convert them to the correct symbols.

[Bret Pimentel]: http://bretpimentel.com
[jQuery]: http://jquery.com

##Before we begin

Hopefully, when you look at the following, you see five musical symbols:

|	flat		|	natural		|	sharp		|	double-flat	|	double-sharp|
|	---			|	---			|	---			|	---			|	---			|
|	&#x266d;	|	&#x266e;	|	&#x266f;	|	&#119083;	|	&#119082;	|

...but if one or more (or all) look like squares or diamonds or some other "placeholder" character, then you've already discovered the problem: not all systems reliably display these symbols. [Read more][More about displaying special characters] about the issue, and what **jquery.accidentals.js** can (and can't) do to help.

##Basic usage

HTML:

	<p id="basic-example">I would say that E-flat is my favorite note. Of course F-sharps are also quite good. A-natural? I don't care for it. It works much better as G-double-sharp or B-double-flat.</p>

JS:

	$('#basic-example').accidentals();

Result:

<div class="result">
<p id="basic-example">I would say that E-flat is my favorite note. Of course F-sharps are also quite good. A-natural? I don't care for it. It works much better as G-double-sharp or B-double-flat.</p>
</div>

**jquery.accidentals.js** works recursively, so it can be used easily for complex documents:

JS:

	$('body').accidentals();


##Options

Options may be passed in as an object.

JS:

	$(selector).accidentals({
			accidentalClassBase: 'accidental',
			accidentalWrap: '<span class="accidental" />'
			caseSensitive: false,
			ignoreWithin: '.no-accidentals',
			inputTypes: ['text'],
			noteNames: '[A-H]',
			noteNameWrap: '',
			outerWrap: '',
			safeMode: true
	});

More details:

- [accidentalClassBase][]
- [accidentalWrap][]
- [caseSensitive][]
- [ignoreWithin][]
- [inputTypes][]
- [noteNames][]
- [noteNameWrap][]
- [outerWrap][]
- [safeMode][]


###accidentalClassBase

Default: `'accidental'`

If the `accidentalWrap` property is used, `accidentalClassBase` will be concatenated with the name of the accidental (as in `'accidental-flat'`) and applied to the `accidentalWrap` DOM element as a class. If it is set to a falsy value, the name of the accidental alone is used for the class name (as in `'flat'`).

####Example

HTML:

	<div id="accidentalClassBase-example">
		<p class="first">D-sharp</p>
		<p class="second">D-sharp</p>
	</div>

CSS:

	.primo-sharp {
		background-color: lightblue;
	}
	
	.secondo-sharp {
		background-color: lightgreen;
	}
	
JS:

	$('#accidentalClassBase-example .first').accidentals({
		accidentalWrap: '<span />',
		accidentalClassBase: 'primo'
	});
	
	$('#accidentalClassBase-example .second').accidentals({
		accidentalWrap: '<span />',
		accidentalClassBase: 'secondo'	
	});

Result:

<div id="accidentalClassBase-example" class="result">
	<p class="first">D-sharp</p>
	<p class="second">D-sharp</p>
</div>


###accidentalWrap

Default: `'<span class="accidental" />'`

String to be passed to jQuery to create a DOM element in which to wrap the accidental. If set to a falsy value, no wrap is applied.

####Example

HTML:

	<p id="accidentalWrap-example">C-natural</p>

JS:

	$('#accidentalWrap-example').accidentals({
		accidentalWrap: '<abbr title="This is an accidental." />'
	});
	
Result:

<div id="accidentalWrap-example" class="result">
	<p>C-natural</p>
</div>


###caseSensitive

Default: `false`

If set to true, **jquery.accidentals.js** will only perform conversion if note name is capitalized and accidental is all lower-case.

####Example

HTML:

	<div id="caseSensitive-example">
		<p>F-flat</p>
		<p>f-flat</p>
		<p>f-Flat</p>
		<p>F-Flat</p>
		<p>F-FLAT</p>
	</div>

JS:

	$('#caseSensitive-example').accidentals({
		caseSensitive: true
	});
	
Result:

<div id="caseSensitive-example" class="result">
	<p>F-flat</p>
	<p>f-flat</p>
	<p>f-Flat</p>
	<p>F-Flat</p>
	<p>F-FLAT</p>
</div>


###ignoreWithin

Default: `'.no-accidentals'`

jQuery selector to indicate DOM elements within which **jquery.accidentals.js** will *not* perform conversions.

####Example

HTML:

	<p id="ignoreWithin-example">A-flat, B-sharp, <span class="dont-convert-please">C-natural, D-flat,</span> E-sharp, F-natural, G-flat</p>

JS:

	$('#ignoreWithin-example').accidentals({
		ignoreWithin: '.dont-convert-please'
	});
	
	
Result:

<p id="ignoreWithin-example" class="result">A-flat, B-sharp, <span class="dont-convert-please">C-natural, D-flat,</span> E-sharp, F-natural, G-flat</p>


###inputTypes

Default: `['text']`

An array of the types of text patterns to match and convert. Possible element values at this time are `'text'` and `'b#'`.

If `'text'` is included, **jquery.accidentals.js** matches on `B-flat`, `B-natural`, `B-sharp`, `B-double-flat`, and `B-double-sharp`. If `'b#'` is included, accidentals matches on `Bb`, `Bnat`, `B#`, `Bbb`, and `B##`.

`'text'` is the recommended usage, as accidentals typed in this style degrade gracefully into (for example) the more symantically correct "B-flat."

####Example

HTML:

	<div id="inputTypes-example">
		<p class="first">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
		<p class="second">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
		<p class="third">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
	</div>

CSS:

	#inputTypes-example .accidental {
		background-color: lightpink;
	}
	
JS:

	$('#inputTypes-example .first').accidentals({
		inputTypes: ['text']
	});
	
	$('#inputTypes-example .second').accidentals({
		inputTypes: ['b#']
	});

	$('#inputTypes-example .third').accidentals({
		inputTypes: ['text', 'b#']
	});
	
Result:

<div id="inputTypes-example" class="result">
	<p class="first">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
	<p class="second">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
	<p class="third">A-flat, B-sharp, C-natural, Ab, B#, Cnat</p>
</div>


###noteNames

Default: `'[A-H]'`

This is a portion of a regular expression, and is used to identify note names. ("H" is included for the benefit of those in [parts of the world that use it as a note name](http://en.wikipedia.org/wiki/Note#History_of_note_names).) If you are familiar with regular expressions, you may be able to alter this to select which characters are regarded as note names.

####Example

HTML:

	<div id="noteNames-example">
		<p class="first">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
		<p class="second">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
		<p class="third">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
		<p class="fourth">1-flat, 2-sharp, 3-natural</p>
	</div>

CSS:

	#noteNames-example .accidental {
		background-color: lightpink;
	}
	
JS:

	$('#noteNames-example .first').accidentals({
		noteNames: '[A-C]'
	});
	
	$('#noteNames-example .second').accidentals({
		noteNames: '[B|D|F]'
	});

	$('#noteNames-example .third').accidentals({
		noteNames: '[A-Z]'
	});
	
	$('#noteNames-example .fourth').accidentals({
		noteNames: '[1-8]'
	});

Result:

<div id="noteNames-example" class="result">
	<p class="first">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
	<p class="second">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
	<p class="third">A-flat, B-sharp, C-natural, D-flat, E-sharp, F-natural, X-flat</p>
	<p class="fourth">1-flat, 2-sharp, 3-natural</p>
</div>


###noteNameWrap

Default: `''`

String to be passed to jQuery to create a DOM element in which to wrap the note name. If set to a falsy value, no wrap is applied.

####Example

HTML:

	<p id="noteNameWrap-example">C-natural</p>

JS:

	$('#noteNameWrap-example').accidentals({
		noteNameWrap: '<strong style="color: red" />'
	});
	
Result:

<div id="noteNameWrap-example" class="result">
	<p>C-natural</p>
</div>


###outerWrap

Default: `''`

String to be passed to jQuery to create a DOM element in which to wrap both the note name and accidental together. If set to a falsy value, no wrap is applied.

####Example

HTML:

	<p id="outerWrap-example">C-natural</p>

JS:

	$('#outerWrap-example').accidentals({
		outerWrap: '<span style="border: 3px dotted yellow" />'
	});
	
Result:

<div id="outerWrap-example" class="result">
	<p>C-natural</p>


###safeMode

Default: `true`

If set to true, **jquery.accidentals.js** makes an admittedly weak and problematic attempt to determine whether the client font contains glyphs for accidental symbols. If the test fails, **jquery.accidentals.js** does not attempt conversions, instead allowing the plain text to remain as typed. It may disable only double-flat and double-sharp conversions or all conversions, depending on test results. `safeMode: true` is a "better safe than sorry" approach, and may in some cases turn off conversions for clients that would actually be able to render the symbols correctly. (Note that safeMode has been set to `false` for all examples on this page.)


##More about displaying special characters

Successfully displaying special characters (such as musical accidental symbols) depends on the end user's choice of web browser and on the fonts installed on their system. Most fonts do *not* include flat, natural, and sharp symbols, and even fewer include symbols for double-sharp and double-flat. When the desired symbol doesn't exist in the desired font, the web browser must try to find the symbol in a different font and substitute it in. Browsers don't do this in a consistent way, and sometimes they give up completely, substituting a placeholder such as a square, sometimes even when the system *does* have a font containing the right symbols. And when they do find a suitable replacement character in another font, that font may or may not be a good stylistic match to the font originally requested.

Web font technology promises a solution to this -- Google's [Web Fonts](http://www.google.com/webfonts) repository contains a large number of fonts available freely for embedding in web pages, so that the page itself can supply the web browser with the designer's preferred font. A web font with musical symbols could solve the ugly squares problem. Unfortunately, at this time *none* of Google's 500+ web fonts have any musical symbols.

At such time that a music-friendly web font becomes available, **jquery.accidentals.js** is already equipped to take advantage of it: by default, the `accidentalWrap` option wraps accidental symbols in a `<span />` with a class of `'accidental'`, which can be easily targeted for CSS styling using `font-family`.

In the meantime, **jquery.accidentals.js** can make a rudimentary attempt to test whether the font chosen by the web browser is actually displaying accidentals or substitute placeholders, using the `safeMode` option, which is set to `true` by default. **jquery.accidentals.js** does this by attempting to render each of the five characters (invisibly to the end user) and then measure their width in pixels. If the characters are of identical width, **jquery.accidentals.js** assumes that they are identical placeholder characters, and falls back on the plain text rather than trying to replace it with symbols. This serves the ideal of "progressive enhancement" -- providing more advanced content for web browsers that can take advantage of it, while preserving basic functionality for less-capable browsers. However, some fonts have symbol characters that happen to be the same width, causing a false result on the test. In these cases, `safeMode` suppresses the symbols, even though they could actually be correctly displayed. (Note that even when characters appear to the eye to have certain widths, they may have "white space" that makes them wider than they appear.)

One additional possible solution is to use images. Downsides of this include a performance hit and a possible loss of semantic correctness. Additionally, images often look out of place due to the hinting, smoothing, and other technologies applied to onscreen fonts. However, if you wish to attempt this, **jquery.accidentals.js** can assist by generating markup for the symbols that can be targeted by CSS text replacement techniques.

</div><!-- .span7 -->

<div id="sidebar" class="span4 offset1">

## Blog posts ##

<div id="blogpoststarget" markdown=1>

[bretpimentel.com](http://bretpimentel.com)

</div>

</div><!-- .span4 -->

</div><!-- .row-fluid" -->

</div><!-- .container-fluid -->