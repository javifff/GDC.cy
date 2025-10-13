/// <reference types="cypress" />

const el = require('./elements').ELEMENTS


class Simulacion_Listar {

     verificarTablaSimulacionesNoVacia() {
        cy.get(el.tablaSimulaciones).should('be.visible')
        cy.get(el.filaTablaSimulaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }


}

export default new Simulacion_Listar();