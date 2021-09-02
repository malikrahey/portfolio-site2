const { resolve } = require('path');
const { defineConfig } = require('vite');


module.exports = defineConfig({
  build: {
    base: "/",
    publicDir: "./",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'projects.html')
      }
    }
  }
})