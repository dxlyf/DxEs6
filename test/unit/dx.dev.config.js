// karma.conf.js
const webpack=require('webpack');

var webpackConfig = {
  resolve:{
  
      alias: {
          ELEMENT:'element-ui'
      },
      extensions: [".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify("development"),
          globalvar:JSON.stringify("index"),
      }
    })
  ],
  devtool: '#inline-source-map'
}

module.exports = function(config) {
    config.set({
      basePath: __dirname,
      webpack:webpackConfig,
      webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        stats: 'errors-only'
      },
      reporters: ['mocha'],
      browsers:['Chrome'],
      frameworks: ['jasmine'],
      files:[
        './index.js'
      ],
      preprocessors: {
        './index.js': ['webpack', 'sourcemap']
      },
      plugins:[
        'karma-phantomjs-launcher',
       'karma-mocha-reporter', // 以mocha 风格打印输出控制台
       // 'karma-ie-launcher',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-webpack',
        'karma-sourcemap-loader'
      ]
    });
};
