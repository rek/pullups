module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    console.log('config', config.external = (ext) => {
      if (ext.includes('lodash')) {
        return true
      }

      if (ext.includes('slayer')) {
        return true
      }

      return false;
    })
    return config; // always return a config.
  },
};