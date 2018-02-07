// Karma configuration
// Generated on Wed Feb 07 2018 09:23:22 GMT+0800 (中国标准时间)
// 主要测试浏览器
var webpackConfig=require('../../build/webpack.dev');
var webpackConfig2=Object.assign({devtool:'#inline-source-map'},{module:webpackConfig.module,resolve:webpackConfig.resolve});



var batches = [
  // the cool kids
  {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    sl_mac_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10'
    }
  },
  // ie family
  {
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_edge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10'
    }
  },
  // mobile
  {
    sl_ios_safari_9: {
      base: 'SauceLabs',
      browserName: 'iphone',
      version: '10.3'
    },
    sl_android_6_0: {
      base: 'SauceLabs',
      browserName: 'android',
      version: '6.0'
    }
  }
]

module.exports = function(config) {
    config.set({
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: __dirname,
      webpack:webpackConfig2,
      webpackMiddleware: {
        noInfo: true
        //stats: 'errors-only'
      },
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
      // list of files / patterns to load in the browser
      // files: [
      //   {pattern: 'test/*.js', included: false}
      // ],
      files:['./index.js'],
      // list of files / patterns to exclude
    //  exclude: [],
      //在将文件提交给浏览器之前对文件进行预处理
    //可用的预处理：https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        './index.js': ['webpack', 'sourcemap']
      },
   
    // web server port
     // port: 9876,
      // enable / disable colors in the output (reporters and logs)
      //colors: true,
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     // logLevel: config.LOG_INFO,
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
         //测试的结果，使用两个记者
      //可能的值：/“点”、“进步”
      //记者：可用/ / / / npmjs.org http：/ /浏览/关键字的业力的记者
      reporters: ['mocha'],//progress
    // reporters: ['dots', 'saucelabs'],
      // start these browsers
      //可用浏览器发射器：https://npmjs.org/browse/keyword/karma-launcher
      // Chrome （发射器需要karma-chrome-launcher插件）
      // ChromeCanary （发射器需要karma-chrome-launcher插件）
      // PhantomJS （发射器需要karma-phantomjs-launcher插件）
      // Firefox （发射器需要karma-firefox-launcher插件）
      // Opera （发射器需要karma-opera-launcher插件）
      // IE （发射器需要karma-ie-launcher插件）
      // Safari （发射器需要karma-safari-launcher插件）
      browsers: ['PhantomJS'], //phantomjs Chrome
      customLaunchers:{
        IE_no_addons: {
          base:  'IE',
          flags: ['-extoff']
        },
        IE9: {
          base: 'IE',
          'x-ua-compatible': 'IE=EmulateIE9',
          flags: ['-extoff']
        },
        IE8: {
          base: 'IE',
          'x-ua-compatible': 'IE=EmulateIE8',
          flags: ['-extoff']
        },
        sl_ie_8:{
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'windows',
           // version: '8'
          },
          sl_ie_9:{
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'windows',
           // version: '9'
          }
      },
      sauceLabs: {
        testName: 'Vue.js unit tests',
        recordScreenshots: false,
        connectOptions: {
          'no-ssl-bump-domains': 'all' // Ignore SSL error on Android emulator
        },
        build: process.env.CIRCLE_BUILD_NUM || process.env.SAUCE_BUILD_ID || Date.now()
      },
      // Continuous Integration mode
      // 如果为真，捕获浏览器，运行测试和退出。
      singleRun: false,
      plugins:[
      'karma-jasmine',
      'karma-mocha-reporter', // 以mocha 风格打印
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-ie-launcher',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-sauce-launcher']
    })
  }
  