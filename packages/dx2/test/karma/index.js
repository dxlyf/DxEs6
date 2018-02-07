
var testsContext = require.context("./modules/", true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);