/// <reference types="cypress" />

const el = require('./elements').ELEMENTS
const elGenerar = require('../Generar/elements').ELEMENTS
const elConsultar = require('../Consultar/elements').ELEMENTS

class TablasENRE_Comun {

    navegarAPestañaGenerar() {
        cy.get(el.pestañaGenerar).should('be.visible').click();
        cy.get(elGenerar.seleccionPeriodo).should('be.visible');
    }
    
    navegarAPestañaConsultar() {
        cy.get(el.pestañaConsultar).should('be.visible').click();
        cy.get(elConsultar.botonConsultarPorClientes).should('be.visible');
    }
    


}

export default new TablasENRE_Comun();