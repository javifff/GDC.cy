Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import GestionFM_FE from '../support/page_objects/GestionFM/FE/index.js'
import GestionFM_Comun from '../support/page_objects/GestionFM/Comun/index.js'




describe('Módulo GestionFM', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    afterEach(() => {
        cy.screenshotTimestamped();
    });

    xit('IJCESGDSAR-5511 - Visualzación OK en grilla resultados', () => {

        const numReg = 60

        GestionFM_Comun.navegaraAGestionFM()

        //Intercepta los datos del filtro y el count de registros
        GestionFM_FE.respuestaMockeada(numReg)

        // Comprueba si algunos campos del id 260917 se presentan bien en la grilla
        cy.get('#260917').should('exist')
        cy.get('#260917 > .documento').should('have.text', 'D-2025-07-0100476')
        cy.get('#260917 > .fecha-alta').should('have.text', '25-07-2025 11:02:49')

        // Comprueba que el contador de paginas es correcto dependiendo el numReg
        const numPaginas = Math.ceil(numReg / 15)
        cy.get('button#final-page').eq(0).should('have.text', `${numPaginas}`)


    })

    xit('IJCESGDSAR-5511 - Filtros seleccionados forman un API Request correcto', () => {

        GestionFM_Comun.navegaraAGestionFM()

        // Selecciona filtros incluyendo el selector del calendario
        // y comprueba que el Request coincide con los filtros seleccionados

    })


});

