/// <reference types="cypress" />

const el = require('./elements').ELEMENTS
const elMenu = require('../../MenuPrincipal/elements').ELEMENTS

class Simulacion_Comun {

    navegarAPestañaNueva() {
        cy.get(el.pestañaNueva).should('be.visible').click();
        cy.url().should('include', '/newSimulation')
        cy.get(elMenu.tituloSimulacion).should('contain', 'Nueva Simulación')
    }
    



}

export default new Simulacion_Comun();