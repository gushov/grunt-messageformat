(function(){ window.i18n || (window.i18n = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.en=function(n){return n===1?"one":"other"}
var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};
window.i18n["greetings"] = {
"hello":function(d){return "this is my hello message"},
"goodbye":function(d){return "farewell"},
"myname":function(d){return "my name is "+v(d,"FIRST_NAME")}}
})();