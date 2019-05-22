/**
 *  inflection.js
 *  ---------------------------------------------------------
 *  - inflection.indexOf( arr, item, from_index, compare_func );
 *  - inflection.pluralize( 'Hat' ); // === 'Hats'
 *  - inflection.singularize( 'Hats' ); // === 'Hat'
 *  - inflection.inflect( str, count, singular, plural );
 *  - inflection.camelize( 'message_properties' ); // === 'MessageProperties'
 *  - inflection.underscore( 'messageProperties' ); // === 'message_properties'
 *  - inflection.humanize( 'message_properties' ); // === 'Message properties'
 *  - inflection.capitalize( 'message_properties' ); // === 'Message_properties'
 *  - inflection.capitalize( 'message properties', true ); // === 'Message properties'
 *  - inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'
 *  - inflection.titleize( 'message_properties' ); // === 'Message Properties'
 *  - inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
 *  - inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'
 *  - inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'
 *  - inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
 *  - inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'
 *  - inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
 *  ---------------------------------------------------------
 *  change-case.js
 *  ---------------------------------------------------------
 *  [`camel`](#camelCase)  //=> "testString"
 *  [`pascal`](#PascalCase) //=> "TestString"
 *  [`param`](#param-case) //=> "test-string"
 *  [`snake`](#snake_case) //=> "test_string"
 *  [`constant`](#CONSTANT_CASE) //=> "TEST_STRING"
 *  [`title`](#Title Case) //=> "A Simple Test"
 *  [`sentence`](#sentence case) //=> "Test string"
 *  [`dot`](#dot.case) //=> "test.string"
 *  [`header`](#Header-Case) //=> "Test-String"
 *  [`path`](#path/case) //=> "test/string"
 *  [`swap`](#swapcase) // Test String => "tEST sTRING"
 *  [`ucFirst`](#Uppercasefirst) //=> "Test"
 *  [`lcFirst`](#lOWERCASEFIRST) //=> "tEST"
 *  [`upper`](#UPPERCASE)  //=> "TEST STRING"
 *  [`lower`](#lowercase) //=> "test string"
 *  [`isUpper`](#isuppercase)
 *  [`isLower`](#islowercase)
 *  [`no`](#nocase) //=> "test string"
 */

module.exports = {
  helpers: {
    extended: s => s.toUpperCase(),
  },
};
