/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class Bonificacion_Listar {

    verificarTablaBonificacionesNoVacia() {
        cy.get(el.tablaBonificaciones).should('be.visible')
        cy.get(el.filaTablaBonificaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }


}

export default new Bonificacion_Listar();