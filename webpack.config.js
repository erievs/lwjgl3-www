const path = require('path');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

// Development
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');

// Production
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const { argv } = require('yargs');
const config = require('./config.json');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEV = !PRODUCTION;
const HMR = argv.nohmr === undefined;

const env = {
  'process.env.NODE_ENV': DEV ? JSON.stringify('development') : JSON.stringify('production'),
  HOSTNAME: JSON.stringify(config.hostname),
  ANALYTICS_TRACKING_ID: JSON.stringify(config.analytics_tracking_id),
  NOHMR: String(HMR === false),
  ASYNC_ROUTES: String(argv.async !== undefined),
};

const buildConfiguration = () => {
  const config = {
    target: 'web',
    node: {
      console: false,
      global: true,
      process: true,
      __filename: false,
      __dirname: false,
      Buffer: false,
      setImmediate: false,
    },
    performance: {
      hints: false,
    },
    entry: {
      main: [path.resolve(__dirname, 'client/main.js')],
    },
    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: DEV ? '[name].js' : '[name].[chunkhash].js',
      publicPath: '/js/',
    },
    resolve: {
      modules: [path.join(__dirname, 'client'), 'node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        // Load our custom version of react-icon-base
        'react-icon-base$': path.resolve(__dirname, 'client/components/Icon.jsx'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [path.resolve(__dirname, 'client'), path.resolve(__dirname, 'node_modules/react-icons')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.scss?$/,
          use: [
            'style-loader/useable',
            {
              loader: 'css-loader',
              options: {
                // This breaks HMR (CSS Modules change name because their hash changes)
                modules: false,
                localIdentName: '[local]_[hash:base64:7]',
                // This breaks background-image and other relative paths
                // Monitor this: https://github.com/webpack/style-loader/pull/124
                // sourceMap: DEV,
                sourceMap: false,
                import: false,
                url: false,
                // CSSNano Options
                minimize: {
                  // safe: true,
                  colormin: false,
                  calc: false,
                  zindex: false,
                  discardComments: {
                    removeAll: true,
                  },
                },
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false,
                sourceComments: false,
                outputStyle: 'expanded',
                precision: 6,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new DefinePlugin(env),
      new LoaderOptionsPlugin({
        minimize: PRODUCTION,
        debug: false,
      }),
    ],
    // recordsPath: path.resolve(__dirname, `./recordsPath.json`),
    stats: {
      assets: true,
      cached: false,
      children: false,
      chunks: true,
      chunkModules: true,
      chunkOrigins: false,
      errors: false,
      errorDetails: false,
      hash: false,
      modules: false,
      publicPath: true,
      reasons: false,
      source: false,
      timings: false,
      version: false,
      warnings: false,
    },
  };

  if (DEV) {
    config.module.rules[0].use.unshift('cache-loader');

    // WebPack Hot Middleware client & HMR plugins
    if (HMR) {
      config.entry.main.unshift(
        require.resolve('webpack-hot-middleware/client'),
        require.resolve('react-hot-loader/patch')
      );
      config.plugins.push(new HotModuleReplacementPlugin());
    }
    config.plugins.push(
      new NamedModulesPlugin(),
      new NoEmitOnErrorsPlugin(),
      new DllReferencePlugin({
        context: __dirname,
        manifest: require('./public/js/vendor-manifest.json'),
      })
    );
  } else {
    config.entry.main.unshift(require.resolve('babel-polyfill'));
    config.plugins.push(
      new IgnorePlugin(/(redux-logger|react-hot-loader)/),
      new ModuleConcatenationPlugin(),
      // https://webpack.js.org/guides/caching/#deterministic-hashes
      new HashedModuleIdsPlugin(),
      new WebpackMd5Hash(),
      new ChunkManifestPlugin({
        filename: 'chunks.json',
        manifestVariable: 'webpackManifest',
      }),
      new UglifyJsPlugin({
        sourceMap: false,
        mangle: {
          screw_ie8: true,
          except: [],
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
          keep_fnames: false,
        },
      })
    );
  }

  return config;
};

module.exports = buildConfiguration();
