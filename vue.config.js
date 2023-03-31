const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/colors.less')]
    }
  },

  productionSourceMap: false,

  css: {
    extract: false
  }
}
