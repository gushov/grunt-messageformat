(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.de=function(n){return n===1?"one":"other"}

var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};

window.i18n["greetings"] = {}
window.i18n["greetings"]["hello"] = function(d){return "Guten Tag"}
window.i18n["greetings"]["goodbye"] = function(d){return "Auf Wiedersehen"}
window.i18n["greetings"]["people"] = function(d){return p(d,"PEOPLE",0,"de",{"one":n(d,"PEOPLE")+" Person","other":n(d,"PEOPLE")+" Personen"})}
})();