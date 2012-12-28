/*jshint curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, sub:true, undef:true, boss:true,
  strict:false, eqnull:true, browser:true, node:true */

var path = require('path');
var fs = require('fs');
var vm = require('vm');
var glob = require('glob');
var _ = require('underscore');
var async = require('async');
var MessageFormat = require('messageformat');
var localeScriptString;

function readLocaleFile(locale, cb) {

  var localeFile = path.join(__dirname, '..',
    'node_modules', 'messageformat', 'locale',
    locale + '.js');

  fs.readFile(localeFile, 'utf8', cb);
}

function setupMessageFormat(localeScriptStr, cb) {

  var script = vm.createScript(localeScriptStr);
  localeScriptString = localeScriptStr;

  // needed for runInThisContext
  global.MessageFormat = MessageFormat;
  script.runInThisContext();
  cb();

}

function globInputdir(include, inputdir, cb) {

  glob(include, { cwd: inputdir }, function (err, files) {

    files = _.map(files, function(file){
      // normalize the file name
      return file.replace(inputdir, '').replace(/^\//, '');
    });

    cb(err, files);

  });

}

function compiler(locale, namespace, nm, obj){

  var mf = new MessageFormat(locale);
  var compiledMessageFormat = [namespace + '["' + nm + '"] = {}'];

  _(obj).forEach(function (value, key) {

    var str = mf.precompile(mf.parse(value));
    compiledMessageFormat.push(namespace + '["' + nm + '"]["' + key + '"] = ' + str);

  });

  return compiledMessageFormat;

}

function parseFiles(inputdir, locale, namespace, files, cb) {

  async.map(files, function (file, next) {

    var filePath = path.join(inputdir, file);
    fs.readFile(filePath, 'utf8', function (err, text) {

      // windows users should have the same key.
      var nm = path.join(file).split('.')[0].replace(/\\/g, '/');
      next(err, compiler(locale, namespace, nm, JSON.parse(text)));

    });

  }, cb);  

}

function wrapCompiledMessages(namespace, compiledMessages, cb) {

  var fileData = [
    '(function(){ ' + namespace + ' || (' + namespace + ' = {}) ',
    'var MessageFormat = { locale: {} };',
    localeScriptString
  ].concat(compiledMessages).concat(['})();']);

  cb(null, _.flatten(fileData).join('\n'));

}

function compile(options, logger, cb) {

  var inputdir = options.inputdir;
  var namespace = options.namespace;
  var locale = options.locale;
  var include = options.include;

  async.waterfall([
    async.apply(readLocaleFile, locale),
    setupMessageFormat,
    async.apply(globInputdir, include, inputdir),
    async.apply(parseFiles, inputdir, locale, namespace),
    async.apply(wrapCompiledMessages, namespace)
  ], cb);

}

module.exports = {
  compile: compile
};