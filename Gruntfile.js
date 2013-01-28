'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    messageformat: {
      en: {
        locale: 'en',
        inputdir: 'test/fixtures/en',
        output: 'tmp/en/i18n.js'
      },
      de: {
        locale: 'de',
        inputdir: 'test/fixtures/de',
        output: 'tmp/de/i18n.js'
      }
    },

    // Unit tests.
    nodeunit: {
      all: ['test/**/*_test.js']
    },

    watch: {
      files: '<config:jshint.all>',
      tasks: 'default'
    },

    jshint: {
      all: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        asi: true,
        expr: true,
        strict: false,
        eqnull: true,
        node: true,
        browser: true
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'messageformat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'jshint', 'test' ]);

};
