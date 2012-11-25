#jQuery Accidentals

This [jQuery][https://github.com/jquery/jquery] plugin converts musical ["accidental"](http://en.wikipedia.org/wiki/Accidental_(music)) symbols typed in plain text into actual symbols:

`A-flat` → A♭

The plugin (with option `safeMode` set to `true` by default), attempts to determine whether the end user's device and browser support these symbols, and does not perform conversions if the symbols' availability cannot be verified. The symbols are shown on capable devices, and degrade gracefully to text on other devices.

Full documentation at [accidentals.bretpimentel.com](http://accidentals.bretpimentel.com)