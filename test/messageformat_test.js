/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

var grunt = require('grunt');
var fs = require('fs');
var path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['unit test messageformat'] = {

  'setUp': function(done) {

    var self = this;
    var localeFile = path.join(__dirname,
      'fixtures', 'en', 'i18n.js');

    fs.readFile(localeFile, 'utf8', function (err, js) {

      self.parsedJs = js;
      done();

    });

  },

  'helper should parse messages': function(test) {


    var expected = this.parsedJs;
    var options = {
      inputdir: './test/fixtures/en',
      locale: 'en'
    };


    test.expect(1);

    grunt.helper('messageformat', options, function (err, parsedJs) {

      test.equal(expected, parsedJs);
      test.done();

    });

  }

};
