(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.en = function ( n ) {
  if ( n === 1 ) {
    return "one";
  }
  return "other";
};

window.i18n["greetings"] = {}
window.i18n["greetings"]["hello"] = function(d){
var r = "";
r += "this is my hello message";
return r;
}
window.i18n["greetings"]["goodbye"] = function(d){
var r = "";
r += "farewell";
return r;
}
})();