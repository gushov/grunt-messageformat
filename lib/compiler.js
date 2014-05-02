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

  var mfPath = require.resolve('messageformat');
  var localeFile = path.join(path.dirname(mfPath),
    'locale', locale + '.js');

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
  var compiledMessageFormat = [namespace + '["' + nm + '"] = {'];

  var iterationCount = 0;
  var objectSize = _.keys(obj).length-1;

  _(obj).forEach(function (value, key) {

    var str = mf.precompile(mf.parse(value));
    var condChar = (iterationCount < objectSize ? ',' : '}');

    compiledMessageFormat.push('"' + key + '":' + str + condChar);

    iterationCount++;
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

  var mfFunctions = 'var\n' +
    'c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},\n' + 
    'n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},\n' +
    'v=function(d,k){c(d);return d[k]},\n' +
    'p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},\n' +
    's=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};';

  localeScriptString = localeScriptString.replace('\n', '');

  var fileData = [
    '(function(){ ' + namespace + ' || (' + namespace + ' = {}) ',
    'var MessageFormat = { locale: {} };',
    localeScriptString,
    mfFunctions,
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