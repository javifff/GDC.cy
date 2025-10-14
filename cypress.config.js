const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  downloadsFolder: 'cypress/downloads',
  e2e: {
    viewportHeight: 900,
    viewportWidth: 1600,
    baseUrl: "http://claaaicr3a03:8448/",
    setupNodeEvents(on, config) {
      // Integración con Allure
      allureWriter(on, config);

      // Configuración de ventana para Chrome
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--window-size=1700,1060");
          launchOptions.args.push("--force-device-scale-factor=1");
          launchOptions.args.push("--hide-scrollbars");
        }
        return launchOptions;
      });

      // 🧹 Tarea personalizada para eliminar archivos
      on('task', {
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return { status: 'eliminado', file: filePath };
          } else {
            return { status: 'no existe', file: filePath };
          }
        }
      });

      return config;
    },
  },
});
