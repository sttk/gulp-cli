'use strict';

copyProps({
  NOW: function() {
    return '11:22:33';
  },
  bgblack: function(v) {
    return '<span style="background-color: black;">' + v + '</span>';
  },
  bgblue: function(v) {
    return '<span style="background-color: #03a;">' + v + '</span>';
  },
  bgcyan: function(v) {
    return '<span style="background-color: #0cc;">' + v + '</span>';
  },
  bggreen: function(v) {
    return '<span style="background-color: #0c0;">' + v + '</span>';
  },
  bgmagenta: function(v) {
    return '<span style="background-color: #c0c;">' + v + '</span>';
  },
  bgred: function(v) {
    return '<span style="background-color: #c00;">' + v + '</span>';
  },
  bgwhite: function(v) {
    return '<span style="background-color: white;">' + v + '</span>';
  },
  bgyellow: function(v) {
    return '<span style="background-color: #cc0;">' + v + '</span>';
  },
  black: function(v) {
    return '<span style="color: black;">' + v + '</span>';
  },
  blue: function(v) {
    return '<span style="color: #44c;">' + v + '</span>';
  },
  bold: function(v) {
    return '<span style="font-weight: bold">' + v + '</span>';
  },
  cyan: function(v) {
    return '<span style="color: #0cc">' + v + '</span>';
  },
  dim: function(v) {
    return '<span style="color: #ccc;">' + v + '</span>';
  },
  gray: function(v) {
    return '<span style="color: #aaa">' + v + '</span>';
  },
  green: function(v) {
    return '<span style="color: #0c0;">' + v + '</span>';
  },
  grey: function(v) {
    return '<span style="color: #aaa">' + v + '</span>';
  },
  hidden: function(v) {
    return '<span style="color: transparent;">' + v + '</span>';
  },
  inverse: function(v) {
    return '<span style="color: #333; background-color: white;">' + v + '</span>';
  },
  italic: function(v) {
    return '<span style="font-style: italic;">' + v + '</span>';
  },
  magenta: function(v) {
    return '<span style="color: #c0c;">' + v + '</span>';
  },
  red: function(v) {
    return '<span style="color: red">' + v + '</span>';
  },
  reset: function(v) {
    return '<span style="color: white; background-color: #333;">' + v + '</span>';
  },
  strikethrough: function(v) {
    return '<span style="text-decoration: line-through;">' + v + '</span>';
  },
  underline: function(v) {
    return '<span style="text-decoration: underline;">' + v + '</span>';
  },
  white: function(v) {
    return '<span style="color: white;">' + v + '</span>';
  },
  yellow: function(v) {
    return '<span style="color: #cc0;">' + v + '</span>';
  },
}, theme);

function writeTheme() {
  var main = document.getElementsByTagName('main')[0];

  copyProps(theme, null, function(src) {
    var name = src.keyChain;
    var item = themeDic[name] || {};
    var desc = format(escape(item.desc));
    var template = src.value;
    var usage = item.usage || '{' + name + ': {1}}';
    var example = createExample(usage, item);

    if (typeof template === 'string') {
      template = escapeTemplate(template);
    }
    usage = escapeTemplate(usage);

    var html =  '' +
      '<section id="{1:key path}">' +
      '<h2 class="keypath">.{1:key path}</h2>' +
      '<div class="description">{2:desc}</div>';

    if (typeof template === 'string') {
      html +=
        '<div class="template">' +
        '<h3 class="template-title">Template:</h3>' +
        '<div class="template-body jscode"><code><pre>\'{3:template}\'</pre></code></div>' +
        '</div>';
    } else if (template == null) {
      html +=
        '<div class="template">' +
        '<h3 class="template-title">Template:</h3>' +
        '<i style="margin-left:0.5rem">Undefined</i>' +
        '</div>';
    }

    html +=
      '<div class="usage">' +
      '<h3 class="usage-title">Usage:</h3>' +
      '<div class="Usage-body jscode"><samp><pre>\'{4:usage}\'</pre></samp></div>' +
      '</div>' +
      '<div class="example">' +
      '<h3 class="example-title">Example:</h3>' +
      '<div class="example-body shell"><samp><pre>{5:example}</pre></samp></div>' +
      '</div>' +
      '</section>';

    main.innerHTML += format(html, name, desc, template, usage, example);
  });
}

function writeMsgs() {
  var main = document.getElementsByTagName('main')[0];

  copyProps(msgs, null, function(src) {
    var name = src.keyChain;
    var item = msgDic[name] || {};
    var desc = format(escape(item.desc));
    var params = createParameters(item);
    var template = src.value;
    var example = createExample(template, item);

    main.innerHTML += format(
      '<section id="{1:key path}">' +
      '<h2 class="keypath">.{1:key path}</h2>' +
      '<div class="description">{2:desc}</div>' +
      '<div class="parameters">{3:params}</div>' +
      '<div class="template">' +
      '<h3 class="template-title">Template:</h3>' +
      '<div class="template-body jscode"><code><pre>\'{4:template}\'</pre></code></div>' +
      '</div>' +
      '<div class="example">' +
      '<h3 class="example-title">Example:</h3>' +
      '<div class="example-body shell"><samp><pre>{5:example}</pre></samp></div>' +
      '</div>' +
      '</section>',
      name, desc, params, escapeTemplate(template), example);
  });
}

function createParameters(item) {
  if (!item.params || !item.params.length) {
    return '';
  }

  return '<h3 class="parameter-title">Parameters:</h3>' +
    '<ol class="parameter-list">' +
    item.params.map(function(param) {
      return format('<li class="parameter-item">{1}</li>', escape(param.desc));
    }).join('') +
    '</ol>';
}

function createExample(template, item) {
  if (typeof template === 'string') {
    template = escape(template);
  }
  return format(template, (item.params || []).map(getExampleParam));
}

function getExampleParam(param) {
  return escape(param.example);
}

function format(template) {
  var args;
  if (Array.isArray(arguments[1])) {
    args = [theme, template].concat(arguments[1]);
  } else {
    args = [theme].concat(Array.prototype.slice.call(arguments));
  }
  return themingLog.format.apply(null, args);
}

function escape(s) {
  return (s || '').replace(/[<>&"']/g, function(c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      '\'': '&apos;',
    }[c];
  });
}

function escapeTemplate(s) {
  return (s || '').replace(/[<>&\\'\n]/g, function(c) {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '\\': '\\\\',
      '\'': '\\&apos;',
      '\n': '\\n',
    }[c];
  });
}
