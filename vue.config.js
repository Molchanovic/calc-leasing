const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/zeroing.scss";
        @import "@/assets/scss/basic.scss";
        `,
      },
    },
  },
});
