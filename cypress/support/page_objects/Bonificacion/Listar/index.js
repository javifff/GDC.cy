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
        cy.get(el.botonVolver).click({ force: true })
    }

    clickarDescargarCSV() {
        cy.get(el.botonDescargarCSV).should('be.visible').click()
    }

    compruebaDescarga(nombreArchivo) {
        const downloadsFolder = Cypress.config('downloadsFolder')
        //     cy.readFile(`${downloadsFolder}/${nombreArchivo}`, { timeout: 15000 }).should('exist') 
        cy.readFile(`${downloadsFolder}/${nombreArchivo}`, { timeout: 15000 }).then((contenido) => {
            // Dividir el contenido en líneas y tomar solo las primeras 20
            const primerasLineas = contenido.split('\n').slice(0, 20).join('\n');

            // Inyectar las líneas en el DOM para visualizarlas
            cy.document().then((doc) => {


                // Guardar el contenido original del body
                const originalContent = doc.body.innerHTML;

                const pre = doc.createElement('pre');
                pre.textContent = primerasLineas;
                pre.style.whiteSpace = 'pre-wrap';
                pre.style.fontFamily = 'monospace';
                pre.style.fontSize = '14px';
                pre.style.maxHeight = '500px';
                pre.style.overflow = 'auto';
                doc.body.innerHTML = ''; // Limpiar el body si es necesario
                doc.body.appendChild(pre);

                cy.screenshotTimestamped(nombreArchivo);


                cy.then(() => {
                    doc.body.innerHTML = originalContent;
                });

            })


        })
    }


}

export default new Bonificacion_Listar();