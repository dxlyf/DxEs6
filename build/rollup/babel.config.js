module.exports = function (api) {
    api.cache(true)
    const presets = [require("@babel/preset-env")];
    const plugins = [require('@babel/plugin-transform-arrow-functions')];
  
    return {
      presets,
      plugins
    };
  }