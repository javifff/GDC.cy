/// <reference types="cypress" />

const el = require('./elements').ELEMENTS

class SimulacionListarResultados {


    verificarResultadosSimulaciones() {
        // Recupera los valores guardados con alias y los usa
        cy.get('@id').then((id) => {
            // Verifica que la cabecera muestra los valores esperados
            cy.get(el.cabecera)
                .should('be.visible')
                .should('contain', 'Resultados de la Simulación')
                .should('contain', id.trim())

            // Verifica los tiulos de los 4 cuadros
            cy.get(el.resumen)
                .should('be.visible')
                .should('contain', 'Total Clientes')
                .should('contain', 'Total Interrupciones')
                .should('contain', 'Bonificación Individual')
                .should('contain', 'Bonificación Total');

            // Verifica que los cuadros resumen tienen datos
            cy.get(el.resumenTotalClientes)
                .invoke('text')
                .should('not.be.empty');

            cy.get(el.resumenTotalInterrupciones)
                .invoke('text')
                .should('not.be.empty');

            cy.get(el.resumenBonificacionIndividual)
                .invoke('text')
                .should('not.be.empty');

            cy.get(el.resumenBonificacionTotal)
                .invoke('text')
                .should('not.be.empty');
        });

    }

    clickarBotonVolver() {
        cy.get(el.botonVolver).click({ force: true })
    }

    clickarDescargarCSV() {
        cy.get(el.botonDescargarCSV).should('be.visible').click()
    }

    compruebaDescarga(nombreArchivo) {
        const downloadsFolder = Cypress.config('downloadsFolder')
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


    clickarResultadosVerDetallesClientes() {
        // Intercepta la request que indica carga completa de la siguiente página
        cy.intercept('GET', '**/credit/details/clients/count?**').as('ultimoRequest');

        // Espera a que la tabla esté visible
        cy.get(el.tablaResultados).should('be.visible');

        // Fila y columna fijas (Fila primera y columna 8 - Ver Detalles)
        const fila = 0;
        const columna = 9;

        // Asegura que la fila exista y esté visible antes de trabajar con ella
        // Extrae los valores id, tipo y semestre y lo guarda como alias para despues
        // verificar si esos valores están en la cabecera del Ver Resultado

        cy.get(el.filaResultados)
            .should('have.length.greaterThan', fila)
            .eq(fila)
            .should('be.visible')
            .within(() => {
                // Guarda los textos como alias para usarlos luego
                cy.get('td').eq(1).invoke('text').then((t) => cy.wrap(t.trim()).as('partido'));
                cy.get('td').eq(2).invoke('text').then((t) => cy.wrap(t.trim()).as('localidad'));
                cy.get('td').eq(3).invoke('text').then((t) => cy.wrap(t.trim()).as('tarifa'));
            });

        // Hace clic en Ver Detalles de la primera fila
        cy.get(el.filaResultados)
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

export default new SimulacionListarResultados();