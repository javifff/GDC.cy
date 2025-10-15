/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class BonificacionListarBonificaciones {

    verificarTablaBonificacionesNoVacia() {
        cy.get(el.tablaBonificaciones).should('be.visible')
        cy.get(el.filaBonificaciones).its('length').should('be.gte', 1) // Verifica que haya al menos una fila en la tabla
    }


    clickarResultadosBonificaciones() {
        // Intercepta la request que indica carga completa de la siguiente página
        cy.intercept('GET', '**/credit/details/area/results/bonif/totals?**').as('ultimoRequest');

        // Espera a que la tabla esté visible
        cy.get(el.tablaBonificaciones).should('be.visible');

        // Fila y columna fijas (Fila primera y columna 8 - Ver resultado)
        const fila = 0;
        const columna = 8;

        // Asegura que la fila exista y esté visible antes de trabajar con ella
        // Extrae los valores id, tipo y semestre y lo guarda como alias para despues
        // verificar si esos valores están en la cabecera del Ver Resultado

        cy.get(el.filaBonificaciones)
            .should('have.length.greaterThan', fila)
            .eq(fila)
            .should('be.visible')
            .within(() => {
                // Guarda los textos como alias para usarlos luego
                cy.get('td').eq(0).invoke('text').then((t) => cy.wrap(t.trim()).as('id'));
                cy.get('td').eq(1).invoke('text').then((t) => cy.wrap(t.trim()).as('tipo'));
                cy.get('td').eq(4).invoke('text').then((t) => cy.wrap(t.trim()).as('semestre'));
            });

        // Hace clic en Ver Resultados de la primera fila
        cy.get(el.filaBonificaciones)
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

export default new BonificacionListarBonificaciones();