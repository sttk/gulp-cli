'use strict';


var collected = [];
function collector1(key , value) {
  collected.push({ key: key, value: value });
}
function collector2(key, value) {
  collected.push({ key: key, value: '[' + value + ']' });
}

var testcases = {
  customize: [
    {
      name: 'override',
      customized: {
        labels: {
          tasks: {
            tree: {
              title: {
                label: 'Tasks for ',
              },
            },
          },
        },
        colors: {
          tasks: {
            tree: {
              title: {
                label: 'nocolor',
                gulpfile: 'magenta',
              },
              branch: 'white',
              task: {
                name: 'cyan',
                description: 'white',
              },
              flag: {
                name: 'magenta',
                description: 'white',
              },
              child: {
                name: 'white',
              },
            },
          },
        },
      },
      file: 'fixtures/customizer/customize-override.txt',
    },
    {
      name: 'add',
      customized: {
        aaa: {
          bbb: {
            ccc: 'CCCC',
          },
        },
      },
      file: 'fixtures/customizer/customize-add.txt',
    },
  ],

  enumerate: [
    {
      name: 'empty',
      customized: {},
      enumerated: {},
      collected: collected,
    },
    {
      name: 'only-toplevel',
      customized: {
        one: 'First',
        two: 123,
        three: ['a', 2],
      },
      enumerated: {
        one: collector1,
        two: collector1,
        three: collector1,
      },
      collected: collected,
    },
    {
      name: 'has-descendants',
      customized: {
        one: {
          two: {
            january: 1,
            february: 2,
          },
          three: {
            march: 3,
          },
        },
        four: {
          five: {
            april: 4,
            six: {
              may: 5,
              june: 6,
            },
            seven: {
              july: 7,
              august: 8,
            },
            september: 9,
            null: null,
          },
          eight: {
            nine: {
              october: 10,
              november: 11,
              december: 12,
            },
          },
        },
      },
      enumerated: {
        one: collector1,
        'four.five': collector2,
      },
      collected: collected,
    },
    {
      name: 'specify-end',
      customized: {
        aaa: {
          bbb: {
            ccc: 'CCC',
            ddd: 123,
            eee: [1,2,3],
            fff: function() {},
            ggg: new Date(2016, 2, 26),
            hhh: null,
          },
        },
      },
      enumerated: {
        'aaa.bbb.ccc': collector2,
        'aaa.bbb.ddd': collector2,
        'aaa.bbb.eee': collector2,
        'aaa.bbb.fff': collector2,
        'aaa.bbb.ggg': collector2,
        'aaa.bbb.hhh': collector2,
      },
      collected: collected,
    },
  ],
};

module.exports = testcases;
