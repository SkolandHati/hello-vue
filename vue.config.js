const path = require('path');

module.exports = {
  configureWebpack: {
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    devServer: {
      proxy: {
        '/api': {
          target: "http://localhost:3000",
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        }
      }
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
