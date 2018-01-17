// karma.conf.js
const webpack=require('webpack');

var webpackConfig = {
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
      }
    })
  ],
  devtool: '#inline-source-map'
}

module.exports = function(config) {
    config.set({
      basePath: __dirname,
   //   webpack:webpackConfig,
      webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        stats: 'errors-only'
      },
    //  reporters: ['mocha'],
      browsers:['Chrome'],
      frameworks: ['jasmine'],
      files:[
        './index.js'
      ],
      // preprocessors: {
      //   './index.js': ['webpack', 'sourcemap']
      // },
      plugins:[
     //   'karma-mocha-reporter',
       // 'karma-ie-launcher',
        'karma-chrome-launcher',
        'karma-jasmine',
      //  'karma-webpack',
        'karma-sourcemap-loader'
      ]
    });
};
