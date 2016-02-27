'use strict';

module.exports = {
  customize: {
    override: {
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
                description: 'black',
              },
              flag: {
                name: 'magenta',
                description: 'black',
              },
              child: {
                name: 'black',
              },
            },
          },
        },
      },
    },
    add: {
      customized: {
        aaa: {
          bbb: {
            ccc: 'CCCC',
            ddd: 'DDDD',
          },
          eee: {
            fff: 'FFFF',
          },
          ggg: 'GGGG',
        },
      },
    },
  },

  enumerate: {
    empty: {
      collected: [],
    },
    'only-toplevel': {
      collected: [
        { key: 'one', value: 'First', },
        { key: 'three', value: ['a', 2], },
        { key: 'two', value: 123, },
      ],
    },
    'has-descendants': {
      collected: [
        { key: 'four.five.april', value: '[4]', },
        { key: 'four.five.null', value: '[null]', },
        { key: 'four.five.september', value: '[9]', },
        { key: 'four.five.seven.august', value: '[8]', },
        { key: 'four.five.seven.july', value: '[7]', },
        { key: 'four.five.six.june', value: '[6]', },
        { key: 'four.five.six.may', value: '[5]', },
        { key: 'one.three.march', value: 3, },
        { key: 'one.two.february', value: 2, },
        { key: 'one.two.january', value: 1, },
      ],
    },
    'specify-end': {
      collected: [
        { key: 'aaa.bbb.ccc', value: '[CCC]' },
        { key: 'aaa.bbb.ddd', value: '[123]' },
        { key: 'aaa.bbb.eee', value: '[1,2,3]' },
        { key: 'aaa.bbb.fff', value: '[function () {}]' },
        { key: 'aaa.bbb.ggg', value: '[' + new Date(2016, 2, 26) + ']' },
        { key: 'aaa.bbb.hhh', value: '[null]' },
      ],
    },
  },
};
