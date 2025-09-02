const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000, // 10 segundos para todos los comandos como cy.get()
  e2e: {
    //baseUrl: "posible entorno desarrollo",
    baseUrl: "http://claaaicr3a03:8448/",
    //baseUrl: "posible entorno produccion",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
