const path = require('path');
const VuePlugin = require('@vitejs/plugin-vue');

module.exports = {
  root: './src',

  plugins: [VuePlugin()],

  resolve: {
    alias: {
      _assets: path.resolve(__dirname, 'src/assets'),
      _components: path.resolve(__dirname, 'src/components'),
      _lib: path.resolve(__dirname, 'src/lib'),
      _pages: path.resolve(__dirname, 'src/pages'),
      _styles: path.resolve(__dirname, 'src/styles'),
    },
  },
};
