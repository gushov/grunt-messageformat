(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.de = function ( n ) {
  if ( n === 1 ) {
    return "one";
  }
  return "other";
};

window.i18n["greetings"] = {}
window.i18n["greetings"]["hello"] = function(d){
var r = "";
r += "Guten Tag";
return r;
}
window.i18n["greetings"]["goodbye"] = function(d){
var r = "";
r += "Auf Wiedersehen";
return r;
}
})();