import InterrupcionesGI from "../../../support/page_objects/InterrupcionesGI";
import Login from "../../../support/page_objects/Login";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


describe('Módulo Interrupciones - GI - Filtros', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5451 - Seleccionar Filtro. Ingresar valores - Borrar Filtros', () => {

        // Muchisimo trabajo para identificar todos los elementos de los filtros

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarAInterrupcionesGI();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        InterrupcionesGI.mostrarFiltros()
        InterrupcionesGI.rellenarTodosLosFiltros()
        cy.screenshotTimestamped(2)

    })


});

