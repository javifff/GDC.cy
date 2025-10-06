const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  defaultCommandTimeout: 20000, // 10 segundos para todos los comandos como cy.get()
  e2e: {
    viewportHeight: 720,
    viewportWidth: 1280,
    //baseUrl: "posible entorno desarrollo",
    baseUrl: "http://claaaicr3a03:8448/",
    //baseUrl: "posible entorno produccion",
    setupNodeEvents(on, config) {
        allureWriter(on, config);
        return config;
    },
  },
});
