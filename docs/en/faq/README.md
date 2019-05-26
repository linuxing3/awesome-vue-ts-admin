# inflection

A port of inflection-js to node.js module



## Description
[inflection-js](http://code.google.com/p/inflection-js/) is a port of the functionality from Ruby on Rails' Active Support Inflection classes into Javascript. `inflection` is a port of `inflection-js` to node.js npm package. Instead of [extending JavaScript native](http://wonko.com/post/extending-javascript-natives) String object like `inflection-js` does, `inflection` separate the methods to a independent package to avoid unexpected behaviors.

Note: This library uses [Wiktionary](http://en.wiktionary.org) as its reference.



## Requires

Checkout `package.json` for dependencies.



## Angular Support

Checkout [ngInflection](https://github.com/konsumer/ngInflection) from [konsumer](https://github.com/konsumer)



## Meteor Support

Checkout [Meteor Inflector](https://github.com/katrotz/meteor-inflector) from [Veaceslav Cotruta](https://github.com/katrotz)



## Installation

Install inflection through npm

	npm install inflection



## API

- inflection.indexOf( arr, item, from_index, compare_func );
- inflection.pluralize( str, plural );
- inflection.singularize( str, singular );
- inflection.inflect( str, count, singular, plural );
- inflection.camelize( str, low_first_letter );
- inflection.underscore( str, all_upper_case );
- inflection.humanize( str, low_first_letter );
- inflection.capitalize( str );
- inflection.dasherize( str );
- inflection.titleize( str );
- inflection.demodulize( str );
- inflection.tableize( str );
- inflection.classify( str );
- inflection.foreign_key( str, drop_id_ubar );
- inflection.ordinalize( str );
- inflection.transform( str, arr );



## Usage

> Require the module before using

	var inflection = require( 'inflection' );



### inflection.indexOf( arr, item, from_index, compare_func );

This lets us detect if an Array contains a given element.

#### Arguments

> arr

	type: Array
	desc: The subject array.

> item

	type: Object
	desc: Object to locate in the Array.

> from_index

	type: Number
	desc: Starts checking from this position in the Array.(optional)

> compare_func

	type: Function
	desc: Function used to compare Array item vs passed item.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
	inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0



### inflection.pluralize( str, plural );

This function adds pluralization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> plural

	type: String
	desc: Overrides normal output with said String.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.pluralize( 'person' ); // === 'people'
	inflection.pluralize( 'octopus' ); // === "octopi"
	inflection.pluralize( 'Hat' ); // === 'Hats'
	inflection.pluralize( 'person', 'guys' ); // === 'guys'



### inflection.singularize( str, singular );

This function adds singularization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> singular

	type: String
	desc: Overrides normal output with said String.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.singularize( 'people' ); // === 'person'
	inflection.singularize( 'octopi' ); // === "octopus"
	inflection.singularize( 'Hats' ); // === 'Hat'
	inflection.singularize( 'guys', 'person' ); // === 'person'



### inflection.inflect( str, count, singular, plural );

This function will pluralize or singularlize a String appropriately based on an integer value.

#### Arguments

> str

	type: String
	desc: The subject string.

> count
	type: Number
	desc: The number to base pluralization off of.

> singular

	type: String
	desc: Overrides normal output with said String.(optional)

> plural

	type: String
	desc: Overrides normal output with said String.(optional)

#### Example code

		var inflection = require( 'inflection' );

		inflection.inflect( 'people' 1 ); // === 'person'
		inflection.inflect( 'octopi' 1 ); // === 'octopus'
		inflection.inflect( 'Hats' 1 ); // === 'Hat'
		inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
		inflection.inflect( 'person', 2 ); // === 'people'
		inflection.inflect( 'octopus', 2 ); // === 'octopi'
		inflection.inflect( 'Hat', 2 ); // === 'Hats'
		inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'



### inflection.camelize( str, low_first_letter );

This function transforms String object from underscore to camelcase.

#### Arguments

> str

	type: String
	desc: The subject string.

> low_first_letter

	type: Boolean
	desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.camelize( 'message_properties' ); // === 'MessageProperties'
	inflection.camelize( 'message_properties', true ); // === 'messageProperties'



### inflection.underscore( str, all_upper_case );

This function transforms String object from camelcase to underscore.

#### Arguments

> str

	type: String
	desc: The subject string.

> all_upper_case

	type: Boolean
	desc: Default is to lowercase and add underscore prefix



#### Example code

	var inflection = require( 'inflection' );

	inflection.underscore( 'MessageProperties' ); // === 'message_properties'
	inflection.underscore( 'messageProperties' ); // === 'message_properties'
	inflection.underscore( 'MP' ); // === 'm_p'
	inflection.underscore( 'MP', true ); // === 'MP'



### inflection.humanize( str, low_first_letter );

This function adds humanize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> low_first_letter

	type: Boolean
	desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.humanize( 'message_properties' ); // === 'Message properties'
	inflection.humanize( 'message_properties', true ); // === 'message properties'



### inflection.capitalize( str );

This function adds capitalization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.capitalize( 'message_properties' ); // === 'Message_properties'
	inflection.capitalize( 'message properties', true ); // === 'Message properties'



### inflection.dasherize( str );

This function replaces underscores with dashes in the string.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.dasherize( 'message_properties' ); // === 'message-properties'
	inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'



### inflection.titleize( str );

This function adds titleize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.titleize( 'message_properties' ); // === 'Message Properties'
	inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'



### inflection.demodulize( str );

This function adds demodulize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'



### inflection.tableize( str );

This function adds tableize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'



### inflection.classify( str );

This function adds classification support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'



### inflection.foreign_key( str, drop_id_ubar );

This function adds foreign key support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> low_first_letter

	type: Boolean
	desc: Default is to seperate id with an underbar at the end of the class name, you can pass true to skip it.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
	inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'



### inflection.ordinalize( str );

This function adds ordinalize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'



### inflection.transform( str, arr );

This function performs multiple inflection methods on a string.

#### Arguments

> str

	type: String
	desc: The subject string.

> arr

	type: Array
	desc: An array of inflection methods.

#### Example code

	var inflection = require( 'inflection' );

	inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'



## Credit

- Ryan Schuft <ryan.schuft@gmail.com>
- Lance Pollard <lancejpollard@gmail.com> (Browser support)
- Dane O'Connor <dane.oconnor@gmail.com>
- brandondewitt
- luk3thomas
- Marcel Klehr
- Raymond Feng
- Kane Cohen <kanecohen@gmail.com>
- Gianni Chiappetta <gianni@runlevel6.org>
- Eric Brody
- overlookmotel
- Patrick Mowrer
- Greger Olsson
- Jason Crawford <jason@jasoncrawford.org>
- Ray Myers <ray.myers@gmail.com>


## License

(The MIT License)

Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Change Case

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Convert strings between `camelCase`, `PascalCase`, `Title Case`, `snake_case`, `lowercase`, `UPPERCASE`, `CONSTANT_CASE` and more.

All methods support Unicode (non-ASCII characters) and non-string entities, such as objects with a `toString` property, numbers and booleans. Empty values (`null` and `undefined`) will result in an empty string.

**Methods are also available on npm as an individual packages.**

## Installation

```
npm install change-case --save
```

## Usage

```js
var changeCase = require('change-case')
//=> { isUpperCase: [Function], camelCase: [Function], ... }
```

**Available methods** (short-hand shown below, long-hand available in examples):

* [`camel`](#camelcase)
* [`constant`](#constantcase)
* [`dot`](#dotcase)
* [`header`](#headercase)
* [`isLower`](#islowercase)
* [`isUpper`](#isuppercase)
* [`lower`](#lowercase)
* [`lcFirst`](#lowercasefirst)
* [`no`](#nocase)
* [`param`](#paramcase)
* [`pascal`](#pascalcase)
* [`path`](#pathcase)
* [`sentence`](#sentencecase)
* [`snake`](#snakecase)
* [`swap`](#swapcase)
* [`title`](#titlecase)
* [`upper`](#uppercase)
* [`ucFirst`](#uppercasefirst)

All methods accept two arguments, the string to change case and an optional locale.

### [camelCase](https://github.com/blakeembrey/camel-case)

[![NPM version](https://img.shields.io/npm/v/camel-case.svg?style=flat)](https://npmjs.org/package/camel-case)
[![NPM downloads](https://img.shields.io/npm/dm/camel-case.svg?style=flat)](https://npmjs.org/package/camel-case)
[![Build status](https://img.shields.io/travis/blakeembrey/camel-case.svg?style=flat)](https://travis-ci.org/blakeembrey/camel-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/camel-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/camel-case?branch=master)

Return as a string with the separators denoted by having the next letter capitalized.

```js
changeCase.camelCase('test string')
//=> "testString"
```

### [constantCase](https://github.com/blakeembrey/constant-case)

[![NPM version](https://img.shields.io/npm/v/constant-case.svg?style=flat)](https://npmjs.org/package/constant-case)
[![NPM downloads](https://img.shields.io/npm/dm/constant-case.svg?style=flat)](https://npmjs.org/package/constant-case)
[![Build status](https://img.shields.io/travis/blakeembrey/constant-case.svg?style=flat)](https://travis-ci.org/blakeembrey/constant-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/constant-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/constant-case?branch=master)

Return as an upper case, underscore separated string.

```js
changeCase.constantCase('test string')
//=> "TEST_STRING"
```

### [dotCase](https://github.com/blakeembrey/dot-case)

[![NPM version](https://img.shields.io/npm/v/dot-case.svg?style=flat)](https://npmjs.org/package/dot-case)
[![NPM downloads](https://img.shields.io/npm/dm/dot-case.svg?style=flat)](https://npmjs.org/package/dot-case)
[![Build status](https://img.shields.io/travis/blakeembrey/dot-case.svg?style=flat)](https://travis-ci.org/blakeembrey/dot-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/dot-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/dot-case?branch=master)

Return as a lower case, period separated string.

```js
changeCase.dotCase('test string')
//=> "test.string"
```

### [headerCase](https://github.com/blakeembrey/header-case)

[![NPM version](https://img.shields.io/npm/v/header-case.svg?style=flat)](https://npmjs.org/package/header-case)
[![NPM downloads](https://img.shields.io/npm/dm/header-case.svg?style=flat)](https://npmjs.org/package/header-case)
[![Build status](https://img.shields.io/travis/blakeembrey/header-case.svg?style=flat)](https://travis-ci.org/blakeembrey/header-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/header-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/header-case?branch=master)

Return as a title cased, dash separated string.

```js
changeCase.headerCase('test string')
//=> "Test-String"
```

### [isLowerCase](https://github.com/blakeembrey/is-lower-case)

[![NPM version](https://img.shields.io/npm/v/is-lower-case.svg?style=flat)](https://npmjs.org/package/is-lower-case)
[![NPM downloads](https://img.shields.io/npm/dm/is-lower-case.svg?style=flat)](https://npmjs.org/package/is-lower-case)
[![Build status](https://img.shields.io/travis/blakeembrey/is-lower-case.svg?style=flat)](https://travis-ci.org/blakeembrey/is-lower-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/is-lower-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/is-lower-case?branch=master)

Return a boolean indicating whether the string is lower cased.

```js
changeCase.isLowerCase('test string')
//=> true
```

### [isUpperCase](https://github.com/blakeembrey/is-upper-case)

[![NPM version](https://img.shields.io/npm/v/is-upper-case.svg?style=flat)](https://npmjs.org/package/is-upper-case)
[![NPM downloads](https://img.shields.io/npm/dm/is-upper-case.svg?style=flat)](https://npmjs.org/package/is-upper-case)
[![Build status](https://img.shields.io/travis/blakeembrey/is-upper-case.svg?style=flat)](https://travis-ci.org/blakeembrey/is-upper-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/is-upper-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/is-upper-case?branch=master)

Return a boolean indicating whether the string is upper cased.

```js
changeCase.isUpperCase('test string')
//=> false
```

### [lowerCase](https://github.com/blakeembrey/lower-case)

[![NPM version](https://img.shields.io/npm/v/lower-case.svg?style=flat)](https://npmjs.org/package/lower-case)
[![NPM downloads](https://img.shields.io/npm/dm/lower-case.svg?style=flat)](https://npmjs.org/package/lower-case)
[![Build status](https://img.shields.io/travis/blakeembrey/lower-case.svg?style=flat)](https://travis-ci.org/blakeembrey/lower-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/lower-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/lower-case?branch=master)

Return the string in lower case.

```js
changeCase.lowerCase('TEST STRING')
//=> "test string"
```

### [lowerCaseFirst](https://github.com/blakeembrey/lower-case-first)

[![NPM version](https://img.shields.io/npm/v/lower-case-first.svg?style=flat)](https://npmjs.org/package/lower-case-first)
[![NPM downloads](https://img.shields.io/npm/dm/lower-case-first.svg?style=flat)](https://npmjs.org/package/lower-case-first)
[![Build status](https://img.shields.io/travis/blakeembrey/lower-case-first.svg?style=flat)](https://travis-ci.org/blakeembrey/lower-case-first)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/lower-case-first.svg?style=flat)](https://coveralls.io/r/blakeembrey/lower-case-first?branch=master)

Return the string with the first character lower cased.

```js
changeCase.lowerCaseFirst('TEST')
//=> "tEST"
```

### [noCase](https://github.com/blakeembrey/no-case)

[![NPM version](https://img.shields.io/npm/v/no-case.svg?style=flat)](https://npmjs.org/package/no-case)
[![NPM downloads](https://img.shields.io/npm/dm/no-case.svg?style=flat)](https://npmjs.org/package/no-case)
[![Build status](https://img.shields.io/travis/blakeembrey/no-case.svg?style=flat)](https://travci.org/blakeembrey/no-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/no-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/no-case?branch=master)

Return the string without any casing (lower case, space separated).

```js
changeCase.noCase('test string')
//=> "test string"
```

### [paramCase](https://github.com/blakeembrey/param-case)

[![NPM version](https://img.shields.io/npm/v/param-case.svg?style=flat)](https://npmjs.org/package/param-case)
[![NPM downloads](https://img.shields.io/npm/dm/param-case.svg?style=flat)](https://npmjs.org/package/param-case)
[![Build status](https://img.shields.io/travis/blakeembrey/param-case.svg?style=flat)](https://travis-ci.org/blakeembrey/param-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/param-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/param-case?branch=master)

Return as a lower case, dash separated string.

```js
changeCase.paramCase('test string')
//=> "test-string"
```

### [pascalCase](https://github.com/blakeembrey/pascal-case)

[![NPM version](https://img.shields.io/npm/v/pascal-case.svg?style=flat)](https://npmjs.org/package/pascal-case)
[![NPM downloads](https://img.shields.io/npm/dm/pascal-case.svg?style=flat)](https://npmjs.org/package/pascal-case)
[![Build status](https://img.shields.io/travis/blakeembrey/pascal-case.svg?style=flat)](https://travis-ci.org/blakeembrey/pascal-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/pascal-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/pascal-case?branch=master)

Return as a string denoted in the same fashion as `camelCase`, but with the first letter also capitalized.

```js
changeCase.pascalCase('test string')
//=> "TestString"
```

### [pathCase](https://github.com/blakeembrey/path-case)

[![NPM version](https://img.shields.io/npm/v/path-case.svg?style=flat)](https://npmjs.org/package/path-case)
[![NPM downloads](https://img.shields.io/npm/dm/path-case.svg?style=flat)](https://npmjs.org/package/path-case)
[![Build status](https://img.shields.io/travis/blakeembrey/path-case.svg?style=flat)](https://travis-ci.org/blakeembrey/path-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/path-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/path-case?branch=master)

Return as a lower case, slash separated string.

```js
changeCase.pathCase('test string')
//=> "test/string"
```

### [sentenceCase](https://github.com/blakeembrey/sentence-case)

[![NPM version](https://img.shields.io/npm/v/sentence-case.svg?style=flat)](https://npmjs.org/package/sentence-case)
[![NPM downloads](https://img.shields.io/npm/dm/sentence-case.svg?style=flat)](https://npmjs.org/package/sentence-case)
[![Build status](https://img.shields.io/travis/blakeembrey/sentence-case.svg?style=flat)](https://travis-ci.org/blakeembrey/sentence-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/sentence-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/sentence-case?branch=master)

Return as a lower case, space separated string with the first letter upper case.

```js
changeCase.sentenceCase('testString')
//=> "Test string"
```

### [snakeCase](https://github.com/blakeembrey/snake-case)

[![NPM version](https://img.shields.io/npm/v/snake-case.svg?style=flat)](https://npmjs.org/package/snake-case)
[![NPM downloads](https://img.shields.io/npm/dm/snake-case.svg?style=flat)](https://npmjs.org/package/snake-case)
[![Build status](https://img.shields.io/travis/blakeembrey/snake-case.svg?style=flat)](https://travis-ci.org/blakeembrey/snake-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/snake-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/snake-case?branch=master)

Return as a lower case, underscore separated string.

```js
changeCase.snakeCase('test string')
//=> "test_string"
```

### [swapCase](https://github.com/blakeembrey/swap-case)

[![NPM version](https://img.shields.io/npm/v/swap-case.svg?style=flat)](https://npmjs.org/package/swap-case)
[![NPM downloads](https://img.shields.io/npm/dm/swap-case.svg?style=flat)](https://npmjs.org/package/swap-case)
[![Build status](https://img.shields.io/travis/blakeembrey/swap-case.svg?style=flat)](https://travis-ci.org/blakeembrey/swap-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/swap-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/swap-case?branch=master)

Return as a string with every character case reversed.

```js
changeCase.swapCase('Test String')
//=> "tEST sTRING"
```

### [titleCase](https://github.com/blakeembrey/title-case)

[![NPM version](https://img.shields.io/npm/v/title-case.svg?style=flat)](https://npmjs.org/package/title-case)
[![NPM downloads](https://img.shields.io/npm/dm/title-case.svg?style=flat)](https://npmjs.org/package/title-case)
[![Build status](https://img.shields.io/travis/blakeembrey/title-case.svg?style=flat)](https://travis-ci.org/blakeembrey/title-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/title-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/title-case?branch=master)

Return as a space separated string with the first character of every word upper cased.

```js
changeCase.titleCase('a simple test')
//=> "A Simple Test"
```

### [upperCase](https://github.com/blakeembrey/upper-case)

[![NPM version](https://img.shields.io/npm/v/upper-case.svg?style=flat)](https://npmjs.org/package/upper-case)
[![NPM downloads](https://img.shields.io/npm/dm/upper-case.svg?style=flat)](https://npmjs.org/package/upper-case)
[![Build status](https://img.shields.io/travis/blakeembrey/upper-case.svg?style=flat)](https://travci.org/blakeembrey/upper-case)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/upper-case.svg?style=flat)](https://coveralls.io/r/blakeembrey/upper-case?branch=master)

Return the string in upper case.

```js
changeCase.upperCase('test string')
//=> "TEST STRING"
```

### [upperCaseFirst](https://github.com/blakeembrey/upper-case-first)

[![NPM version](https://img.shields.io/npm/v/upper-case-first.svg?style=flat)](https://npmjs.org/package/upper-case-first)
[![NPM downloads](https://img.shields.io/npm/dm/upper-case-first.svg?style=flat)](https://npmjs.org/package/upper-case-first)
[![Build status](https://img.shields.io/travis/blakeembrey/upper-case-first.svg?style=flat)](https://travis-ci.org/blakeembrey/upper-case-first)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/upper-case-first.svg?style=flat)](https://coveralls.io/r/blakeembrey/upper-case-first?branch=master)

Return the string with the first character upper cased.

```js
changeCase.upperCaseFirst('test')
//=> "Test"
```

## Related

* [Meteor](https://github.com/Konecty/change-case)
* [Atom](https://github.com/robhurring/atom-change-case)
* [VSCode](https://github.com/wmaurer/vscode-change-case)

## TypeScript

Includes a [TypeScript definition](change-case.d.ts).

## License

MIT

[npm-image]: https://img.shields.io/npm/v/change-case.svg?style=flat
[npm-url]: https://npmjs.org/package/change-case
[downloads-image]: https://img.shields.io/npm/dm/change-case.svg?style=flat
[downloads-url]: https://npmjs.org/package/change-case
[travis-image]: https://img.shields.io/travis/blakeembrey/change-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/change-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/change-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/change-case?branch=master
