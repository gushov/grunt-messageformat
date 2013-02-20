/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, node:true */

/*
 * grunt-messageformat
 * https://github.com/gushov/grunt-messageformat
 *
 * Copyright (c) 2012 August Hovland
 * Licensed under the MIT license.
 */

var _ = require('underscore');
var compiler = require('../lib/compiler');

module.exports = function(grunt) {

  grunt.registerMultiTask('messageformat', 'messageformat compiler for grunt', function () {

    var done = this.async();

    var defaults = {
      namespace: 'window.i18n',
      include: '**/*.json'
    };

    var data = _.extend({}, defaults, this.data);
    var options = this.options(data);

    grunt.verbose.writeflags(options, 'Options');

    compiler.compile(options, grunt.log, function (err, js) {
      if (err) {
        grunt.log.error(err);
        done(false);
      } else {
        grunt.log.writeln('Writing ' + data.inputdir + ' to ' + data.output);
        grunt.file.write(data.output, js);
        done(true);
      }
    });

  });
};
