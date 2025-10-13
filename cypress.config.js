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

      // Ajuste deliberado: Chrome headless recorta unos ~100 px en altura y 100 px en ancho,
      // por eso usamos --window-size=1700,1060 para obtener capturas exactas de 1600x900.
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--window-size=1700,1060");
          launchOptions.args.push("--force-device-scale-factor=1");
          launchOptions.args.push("--hide-scrollbars");
          // Opcional: mejora compatibilidad CI / Windows
          //launchOptions.args.push("--no-sandbox");
        }
        return launchOptions;
      });

      return config;
    },
  },
});

