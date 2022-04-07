const path = require('path');
module.exports = {
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.ts', '.tsx', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        'Components': path.resolve(__dirname, './src/components'),
        'Views': path.resolve(__dirname, './src/common')
      }
    }
  }
}
