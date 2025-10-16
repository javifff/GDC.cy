/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class SimulacionListarSimulaciones {

    verificarTablaSimulacionesNoVacia() {
        cy.get(el.tablaSimulaciones).should('be.visible')
        cy.get(el.filaSimulaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }


    clickarResultadosSimulaciones() {
        // Intercepta la request que indica carga completa de la siguiente página
        cy.intercept('GET', '**/credit/details/area/results?**').as('ultimoRequest');

        // Espera a que la tabla esté visible
        cy.get(el.tablaSimulaciones).should('be.visible');

        // Fila y columna fijas (Fila primera y columna 8 - Ver resultado)
        const fila = 0;
        const columna = 8;

        // Asegura que la fila exista y esté visible antes de trabajar con ella
        // Extrae los valores id, tipo y semestre y lo guarda como alias para despues
        // verificar si esos valores están en la cabecera del Ver Resultado

        cy.get(el.filaSimulaciones)
            .should('have.length.greaterThan', fila)
            .eq(fila)
            .should('be.visible')
            .within(() => {
                // Guarda los textos como alias para usarlos luego
                cy.get('td').eq(0).invoke('text').then((t) => cy.wrap(t.trim()).as('id'));
            });

        // Hace clic en Ver Resultados de la primera fila
        cy.get(el.filaSimulaciones)
            .eq(fila)
            .find('td')
            .eq(columna)
            .click();

        // Espera la carga completa de la pagina
        cy.wait('@ultimoRequest', { timeout: 40000 })
            .its('response.statusCode')
            .should('eq', 200);
    }


    clickarBotonVolver() {
        cy.get(el.botonVolver).click({ force: true })
    }


}

export default new SimulacionListarSimulaciones();