/// <reference types="cypress" />

const el = require('./elements').ELEMENTS
const elMenu = require('../../MenuPrincipal/elements').ELEMENTS

class Bonificacion_Comun {

    navegarAPestañaNueva() {
        cy.get(el.pestañaNueva).should('be.visible').click();
        cy.url().should('include', '/newBonification')
        cy.get(elMenu.tituloBonificacion).should('contain', 'Nueva Bonificación')
    }
    



}

export default new Bonificacion_Comun();