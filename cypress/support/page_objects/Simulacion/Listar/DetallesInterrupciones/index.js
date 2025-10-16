/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class SimulacionListarDetallesInterrupciones {

    verificarResultadosVerDetallesInterrupciones() {
        // Recupera los valores guardados con alias y los usa
        cy.get('@cliente').then((cliente) => {
            cy.get('@bonIndividual').then((bonIndividual) => {
                cy.get('@factor').then((factor) => {
                    cy.get('@bonGlobal').then((bonGlobal) => {
                        // Verifica que la cabecera muestra los valores esperados
                        cy.get(el.cabecera)
                            .should('be.visible')
                            .should('contain', 'Detalles por interrupciones');


                        // Verifica el resumen contiene textos y datos esperados
                        cy.get(el.resumen)
                            .should('be.visible')
                            .should('contain', 'Cliente')
                            .should('contain', 'Energía')
                            .should('contain', 'Bonificación')
                            .should('contain', 'Factor')
                            .should('contain', 'Tarifa')

                        cy.shouldContainIgnoreCase(el.resumen, cliente);
                        cy.shouldContainIgnoreCase(el.resumen, bonIndividual);
                        cy.shouldContainIgnoreCase(el.resumen, factor);
                        cy.shouldContainIgnoreCase(el.resumen, bonGlobal);

                        // Verifica que la tabla Detalle de clientes contiene los campos esperados
                        cy.get(el.tablaDetallesInterrupciones).should('be.visible')
                            .should('contain', 'Frecuencia')
                            .should('contain', 'Interrupción')
                            .should('contain', 'Reposición')
                            .should('contain', 'Fecha')
                            .should('contain', 'Inicio')
                            .should('contain', 'Fin')
                            .should('contain', 'Tensión')
                            .should('contain', 'KI')
                            .should('contain', 'Penalizado')
                            .should('contain', 'Bonificación')
                            .should('contain', 'Tiempo')
                            .should('contain', 'Factor')


                        // Verifica que la tabla Detalle de interrupciones contiene al menos un registo
                        cy.get(el.filaDetallesInterrupciones).its('length').should('be.gte', 1)

                    });
                });
            });
        })
    }

    clickarBotonVolver() {
        cy.get(el.botonVolver).click({ force: true })
    }


}

export default new SimulacionListarDetallesInterrupciones();