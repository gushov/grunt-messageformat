var grunt = require('grunt');

exports.messageformat = {
  main: function(test) {
    'use strict';

    test.expect(2);

    var actual = grunt.file.read('tmp/en/i18n.js');
    var expected = grunt.file.read('test/expected/en/i18n.js');
    test.equal(expected, actual, 'should compile messageformat - en');

    actual = grunt.file.read('tmp/de/i18n.js');
    expected = grunt.file.read('test/expected/de/i18n.js');
    test.equal(expected, actual, 'should compile messageformat - de');

    test.done();
  }
};
