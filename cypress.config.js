const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    baseUrl: "http://localhost:8080",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
