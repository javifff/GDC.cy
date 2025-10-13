/// <reference types="cypress" />

const el = require('./elements').ELEMENTS


class Simulacion_Listar {

    verificarTablaSimulacionesNoVacia() {
        cy.get(el.tablaSimulaciones).should('be.visible')
        cy.get(el.filaTablaSimulaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }

    clickarFilaSimulacionPorPosicion(fila, columna) {
        cy.get(el.tablaSimulaciones).should('be.visible')
        cy.get(el.filaTablaSimulaciones).eq(fila).find('td').eq(columna).click()
    }

    clickarResultados() {
        // Esperar a que termina de cargar el ultimo elemento
        cy.intercept('GET', '**/styles/icons/MaterialIcons-Regular.woff2**').as('ultimoRequest')

        this.clickarFilaSimulacionPorPosicion(0, 8) // Click en fila 0, columna 8 (Resultados)

        cy.wait('@ultimoRequest', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    }

    verificarResultados() {

        // Verifica cabecera esperada
        cy.get(el.cabeceraResultados).should('be.visible').contains('Resultados de la Simulación')

        //Verifica que el elemento con los 4 cuadros está visible y contiene el texto esperado  
        cy.get(el.divTotalesResultados).should('be.visible')
            .should('contain', 'Total Clientes')
            .should('contain', 'Total Interrupciones')
            .should('contain', 'Bonificación Individual')
            .should('contain', 'Bonificación Total');
    }

    clickarBotonVolver() {
        cy.get(el.botonVolver).should('be.visible').click({ force: true })
    }


}

export default new Simulacion_Listar();