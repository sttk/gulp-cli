'use strict';

copyProps({
  TIMESTAMP: function() {
    return '[<span style="color: #999">11:22:33</span>] ';
  },
  gray: function(v) {
    return '<span style="color: #999">' + v + '</span>';
  },
  magenta: function(v) {
    return '<span style="color: magenta">' + v + '</span>';
  },
  cyan: function(v) {
    return '<span style="color: cyan">' + v + '</span>';
  },
  red: function(v) {
    return '<span style="color: red">' + v + '</span>';
  },
  blue: function(v) {
    return '<span style="color: #39f;">' + v + '</span>';
  },
  yellow: function(v) {
    return '<span style="color: yellow">' + v + '</span>';
  },
  bold: function(v) {
    return '<span style="font-weight: bold">' + v + '</span>';
  },
  code: function(v) {
    return '<code>' + v + '</code>';
  },
}, logTheme);


var main = document.getElementsByTagName('main')[0];
copyProps(logMsgs, null, function(src) {
  var logItem = logDictionary[src.keyChain] || {};
  var desc = format(escape(logItem.desc));
  var params = createParameters(logItem);
  var example = createExample(src.value, logItem);

  main.innerHTML += format(
    '<section id="{1:key path}">' +
    '<h2 class="keypath">.{1:key path}</h2>' +
    '<div class="description">{2:desc}</div>' +
    '<div class="parameters">{3:params}</div>' +
    '<div class="template">' +
    '<h3 class="template-title">Template:</h3>' +
    '<div class="template-body"><code>\'{4:template}\'</code></div>' +
    '</div>' +
    '<div class="example">' +
    '<h3 class="example-title">Example:</h3>' +
    '<div class="example-body"><samp><pre>{5:example}</pre></samp></div>' +
    '</div>' +
    '</section>',
    src.keyChain, desc, params, escapeTemplate(src.value), example);
});

function createParameters(logItem) {
  if (!logItem.params || !logItem.params.length) {
    return '';
  }

  return '<h3 class="parameter-title">Parameters:</h3>' +
    '<ol class="parameter-list">' +
    logItem.params.map(function(param) {
      return format('<li class="parameter-item">{1}</li>', escape(param.desc));
    }).join('') +
    '</ol>';
}

function createExample(template, logItem) {
  return format(escape(template), (logItem.params || []).map(getExampleParam));
}

function getExampleParam(param) {
  return escape(param.example);
}

function format(template) {
  var args;
  if (Array.isArray(arguments[1])) {
    args = [logTheme, template].concat(arguments[1]);
  } else {
    args = [logTheme].concat(Array.prototype.slice.call(arguments));
  }
  return themingLog.format.apply(null, args);
}

function escape(s) {
  return (s || '').replace(/[<>&\n]/g, function(c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '\n': '<br/>',
    }[c];
  });
}

function escapeTemplate(s) {
  return (s || '').replace(/[<>&' \n]/g, function(c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '\'': '\\\'',
      ' ': '&nbsp;',
      '\n': '\\n',
    }[c];
  });
}
