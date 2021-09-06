const { resolve } = require('path');
const { defineConfig } = require('vite');


module.exports = defineConfig({
  build: {
    base: "/portfolio-site2/",
    publicDir: "./public",
    rollupOptions: {
      input: {
        main: resolve(__dirname, '../portfolio-site2/index.html'),
        nested: resolve(__dirname, '../portfolio-site2/projects.html')
      }
    }
  }
})