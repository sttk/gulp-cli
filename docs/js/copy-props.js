!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.copyProps=t()}}(function(){return function t(r,e,n){function o(f,a){if(!e[f]){if(!r[f]){var c="function"==typeof require&&require;if(!a&&c)return c(f,!0);if(i)return i(f,!0);var u=new Error("Cannot find module '"+f+"'");throw u.code="MODULE_NOT_FOUND",u}var p=e[f]={exports:{}};r[f][0].call(p.exports,function(t){var e=r[f][1][t];return o(e||t)},p,p.exports,t,r,e,n)}return e[f].exports}for(var i="function"==typeof require&&require,f=0;f<n.length;f++)o(n[f]);return o}({1:[function(t,r,e){"use strict";function n(t,r,e){if(!d(t)){var n=e.fromto[r];if(n){delete e.fromto[r],Array.isArray(n)||(n=[n]);for(var o={keyChain:r,value:t,key:e.name,depth:e.depth,parent:e.parent},i=0,f=n.length;i<f;i++)p(e.dest,n[i],function(t,r,f){var a={keyChain:n[i],value:t[r],key:r,depth:f,parent:t};return e.convert(o,a)})}}}function o(t,r,e){if(d(t)){for(var n in t)return;return void p(e.dest,r,i)}var o={keyChain:r,value:t,key:e.name,depth:e.depth,parent:e.parent};p(e.dest,r,function(t,n,i){var f={keyChain:r,value:t[n],key:n,depth:i,parent:t};return e.convert(o,f)})}function i(){return{}}function f(t){return t.value}function a(t){var r={};for(var e in t){var n=t[e];"string"==typeof n&&(r[e]=n)}return r}function c(t){for(var r={},e=0,n=t.length;e<n;e++){var o=t[e];"string"==typeof o&&(r[o]=o)}return r}function u(t){var r={};for(var e in t){var n=t[e];r[n]||(r[n]=[]),r[n].push(e)}return r}function p(t,r,e){s(t,r.split("."),1,e)}function s(t,r,e,n){var o=r.shift();if(!r.length){var i=n(t,o,e);return void(void 0!==i&&(t[o]=i))}d(t[o])||(t[o]={}),s(t[o],r,e+1,n)}function l(t,r){for(var e in r){var n=r[e];Array.isArray(n)||(n=[n]);for(var o=0,i=n.length;o<i;o++)p(t,n[o],y)}}function y(){}function v(t){return"[object Object]"===Object.prototype.toString.call(t)}var b=t("each-props"),d=t("is-plain-object");r.exports=function(t,r,e,i,p){if(v(t)||(t={}),v(r)||(r={}),d(e)?e=a(e):Array.isArray(e)?e=c(e):"boolean"==typeof e?(p=e,i=f,e=null):"function"==typeof e?(p=i,i=e,e=null):e=null,"function"!=typeof i&&("boolean"==typeof i?(p=i,i=f):i=f),"boolean"!=typeof p&&(p=!1),p){var s=t;t=r,r=s,e&&(e=u(e))}var y={dest:r,fromto:e,convert:i};return e?(b(t,n,y),l(r,e)):b(t,o,y),r}},{"each-props":2,"is-plain-object":3}],2:[function(t,r,e){"use strict";function n(t,r,e,o,a){var c=Object.keys(t);if("function"==typeof a.sort){var u=a.sort(c);Array.isArray(u)&&(c=u)}o+=1;for(var p=0,s=c.length;p<s;p++){var l=c[p],y=r+"."+l,v=t[l],b=f({},a);b.name=l,b.index=p,b.count=s,b.depth=o,b.parent=t;!e(v,y.slice(1),b)&&i(v)&&n(v,y,e,o,a)}}function o(t){return"[object Object]"===Object.prototype.toString.call(t)}var i=t("is-plain-object"),f=t("object-assign");r.exports=function(t,r,e){o(t)&&"function"==typeof r&&(i(e)||(e={}),n(t,"",r,0,e))}},{"is-plain-object":3,"object-assign":5}],3:[function(t,r,e){"use strict";function n(t){return!0===o(t)&&"[object Object]"===Object.prototype.toString.call(t)}var o=t("isobject");r.exports=function(t){var r,e;return!1!==n(t)&&("function"==typeof(r=t.constructor)&&(e=r.prototype,!1!==n(e)&&!1!==e.hasOwnProperty("isPrototypeOf")))}},{isobject:4}],4:[function(t,r,e){"use strict";r.exports=function(t){return null!=t&&"object"==typeof t&&!Array.isArray(t)}},{}],5:[function(t,r,e){"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;r.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var r={},e=0;e<10;e++)r["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(r).map(function(t){return r[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,r){for(var e,a,c=n(t),u=1;u<arguments.length;u++){e=Object(arguments[u]);for(var p in e)i.call(e,p)&&(c[p]=e[p]);if(o){a=o(e);for(var s=0;s<a.length;s++)f.call(e,a[s])&&(c[a[s]]=e[a[s]])}}return c}},{}]},{},[1])(1)});