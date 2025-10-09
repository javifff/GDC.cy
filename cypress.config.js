const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  e2e: {
    // viewportHeight: 720, 
    // // viewportWidth: 1280,
    viewportHeight: 900,
    viewportWidth: 1600,
    baseUrl: "http://claaaicr3a03:8448/",
    setupNodeEvents(on, config) {
      // Mantiene tu integración actual con Allure
      allureWriter(on, config);

      // 🔹 Asegura que Chrome (headed o headless) use 1920x1080 reales
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--window-size=1600,900");
          launchOptions.args.push("--force-device-scale-factor=1");
          launchOptions.args.push("--hide-scrollbars");
          // Opcional: mejora compatibilidad CI / Windows
          launchOptions.args.push("--no-sandbox");
        }
        return launchOptions;
      });

      return config;
    },
  },
});

