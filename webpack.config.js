const webpack = require('webpack');
const path = require('path');

const babelLoader = {
  test: /\.jsx?$/,
  exclude: [
    path.resolve(__dirname, 'node_modules')
  ],
  include: __dirname,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: [
      // ES5
      //'transform-es5-property-mutators',  // http://babeljs.io/docs/plugins/transform-es5-property-mutators/

      // Stage-0
      // https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0
      // 'transform-do-expressions', // http://babeljs.io/docs/plugins/transform-do-expressions/
      // 'transform-function-bind',  // http://babeljs.io/docs/plugins/transform-function-bind/

      // Stage-1
      // https://github.com/babel/babel/tree/master/packages/babel-preset-stage-1
      // 'transform-class-constructor-call',  // DEPRECATED: http://babeljs.io/docs/plugins/transform-class-constructor-call/
      // 'transform-export-extensions',  // http://babeljs.io/docs/plugins/transform-export-extensions/

      // Stage-2
      // https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2
      // 'transform-decorators',
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',

      // Stage-3
      // https://github.com/babel/babel/tree/master/packages/babel-preset-stage-3
      'syntax-trailing-function-commas',
      'transform-async-to-generator',

      //ES2016
      //https://github.com/babel/babel/blob/master/packages/babel-preset-es2016/index.js
      'transform-exponentiation-operator',

      // ES2015
      // https://github.com/babel/babel/blob/master/packages/babel-preset-es2015/src/index.js
      ['transform-es2015-template-literals', {'loose': true}],
      'transform-es2015-literals',
      'transform-es2015-function-name',
      'transform-es2015-arrow-functions',
      'transform-es2015-block-scoped-functions',
      ['transform-es2015-classes', {'loose': true}],
      'transform-es2015-object-super',
      'transform-es2015-shorthand-properties',
      'transform-es2015-duplicate-keys',
      ['transform-es2015-computed-properties', {'loose': true}],
      ['transform-es2015-for-of', {'loose': true}],
      'transform-es2015-sticky-regex',
      'transform-es2015-unicode-regex',
      'check-es2015-constants',
      ['transform-es2015-spread', {'loose': true}],
      'transform-es2015-parameters',
      ['transform-es2015-destructuring', {'loose': true}],
      'transform-es2015-block-scoping',
      'transform-es2015-typeof-symbol',
      // ['transform-es2015-modules-commonjs', {'loose': true}], // Let Webpack parse ES6 modules
      ['transform-regenerator', {async: false, asyncGenerators: false}],

      // React
      // https://github.com/babel/babel/blob/master/packages/babel-preset-react/index.js
      'transform-react-jsx',
      // 'transform-flow-strip-types',
      // 'syntax-flow',
      'syntax-jsx',
      'transform-react-display-name'
    ]
  }
};

const config = {
  entry: {
    main: [
      'babel-polyfill',
      'whatwg-fetch',
      path.resolve(__dirname, 'client/app/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[chunkhash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      babelLoader
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};

if ( process.env.NODE_ENV !== 'production' ) {

  config.devtool = 'eval';
  // config.devtool = 'cheap-module-eval-source-map';
  // config.devtool = 'eval-source-map';

  // WebPack Hot Middleware client & HMR plugins
  config.entry.main.unshift('webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());

  // Avoid having to parse a manifest in dev mode
  config.output.filename = 'bundle.js';

  // React Babel react-transform plugin for Hot-Module Replacement
  babelLoader.query.plugins.push(
    ['react-transform', {
      transforms: [
        {
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        },
        {
          transform: 'react-transform-catch-errors',
          imports: ['react', 'redbox-react']
        }
      ]
    }]
  );

} else {

  babelLoader.query.plugins.push(
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-react-remove-prop-types'
  );

  // Put loaders in minification mode
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }));

  // minify
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        screw_ie8: true,
        except: []
      },
      comments: false,
      compress: {
        screw_ie8: true,
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        cascade: true,
        warnings: false,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: null,
        drop_console: true,
        keep_fargs: false,
        keep_fnames: false
      }
    })
  );

}

module.exports = config;
