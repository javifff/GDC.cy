/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class SimulacionListarDetallesClientes {


    verificarResultadosVerDetallesClientes() {
        // Recupera los valores guardados con alias y los usa
        cy.get('@partido').then((partido) => {
            cy.get('@localidad').then((localidad) => {
                cy.get('@tarifa').then((tarifa) => {
                    // Verifica que la cabecera muestra los valores esperados
                    cy.get(el.cabecera)
                        .should('be.visible')
                        .should('contain', 'Detalles por clientes');


                    // Verifica el resumen contiene textos y datos esperados
                    cy.get(el.resumen)
                        .should('be.visible')
                        .should('contain', 'Partido')
                        .should('contain', 'Localidad o Comuna')
                        .should('contain', 'Tarifa')

                    cy.shouldContainIgnoreCase(el.resumen, partido);
                    cy.shouldContainIgnoreCase(el.resumen, localidad);
                    cy.shouldContainIgnoreCase(el.resumen, tarifa);

                    // Verifica que la tabla Detalle de clientes contiene los campos esperados
                    cy.get(el.tablaDetallesClientes).should('be.visible')
                        .should('contain', 'Cliente')
                        .should('contain', 'Cant.')
                        .should('contain', 'Interrupciones')
                        .should('contain', 'Bonificación')
                        .should('contain', 'Individual')
                        .should('contain', 'Factor')
                        .should('contain', 'Semestral')
                        .should('contain', 'Global')
                        .should('contain', 'KI')
                        .should('contain', 'Penalizado')


                    // Verifica que la tabla Detalle de clientes contiene al menos un registo
                    cy.get(el.filaDetallesClientes).its('length').should('be.gte', 1)

                });
            });
        });
    }

    clickarBotonVolver() {
        cy.get(el.botonVolver).click({ force: true })
    }



    clickarResultadosVerDetallesInterrupciones() {
        // Intercepta la request que indica carga completa de la siguiente página
        cy.intercept('GET', '**/credit/interruptionsdetaillist?**').as('ultimoRequest');

        // Espera a que la tabla esté visible
        cy.get(el.tablaDetallesClientes).should('be.visible');

        // Fila y columna fijas (Fila primera y columna 6 - Ver Detalles)
        const fila = 0;
        const columna = 6;

        // Asegura que la fila exista y esté visible antes de trabajar con ella
        // Extrae los valores id, tipo y semestre y lo guarda como alias para despues
        // verificar si esos valores están en la cabecera del Ver Resultado

        cy.get(el.filaDetallesClientes)
            .should('have.length.greaterThan', fila)
            .eq(fila)
            .should('be.visible')
            .within(() => {
                // Guarda los textos como alias para usarlos luego
                cy.get('td').eq(0).invoke('text').then((t) => cy.wrap(t.trim()).as('cliente'));
                cy.get('td').eq(2).invoke('text').then((t) => cy.wrap(t.trim()).as('bonIndividual'));
                cy.get('td').eq(3).invoke('text').then((t) => cy.wrap(t.trim()).as('factor'));
                cy.get('td').eq(4).invoke('text').then((t) => cy.wrap(t.trim()).as('bonGlobal'));
            });

        // Hace clic en Ver Detalles de la primera fila
        cy.get(el.filaDetallesClientes)
            .eq(fila)
            .find('td')
            .eq(columna)
            .click();

        // Espera la carga completa de la pagina
        cy.wait('@ultimoRequest', { timeout: 40000 })
            .its('response.statusCode')
            .should('eq', 200);
    }


}

export default new SimulacionListarDetallesClientes();