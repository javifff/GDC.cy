/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class Bonificacion_Listar {

    verificarTablaBonificacionesNoVacia() {
        cy.get(el.tablaBonificaciones).should('be.visible')
        cy.get(el.filaTablaBonificaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }

    clickarFilaBonificacionPorPosicion(fila, columna) {
        cy.get(el.tablaBonificaciones).should('be.visible')
        cy.get(el.filaTablaBonificaciones).eq(fila).find('td').eq(columna).click()
    }

    clickarResultados() {
        // Esperar a que termina de cargar el ultimo elemento
        cy.intercept('GET', '**/credit/details/area/results/bonif/totals?**').as('ultimoRequest')

        this.clickarFilaBonificacionPorPosicion(0, 8) // Click en fila 0, columna 8 (Resultados)

        cy.wait('@ultimoRequest', { timeout: 40000 }).its('response.statusCode').should('eq', 200)

    }

    verificarResultados() {

        // Verifica cabecera esperada
        cy.get(el.cabeceraResultados).should('be.visible').contains('Resultados de la Bonificación')

        //Verifica que el elemento con los 4 cuadros está visible y contiene el texto esperado  
        cy.get(el.divTotalesResultados).should('be.visible')
            .should('contain', 'Total Clientes')
            .should('contain', 'Total Interrupciones')
            .should('contain', 'Bonificación Individual')
            .should('contain', 'Bonificación Total');
    }

    clickarBotonVolver() {
        cy.get(el.botonVolver).should('be.visible').click({force: true})
    }



}

export default new Bonificacion_Listar();