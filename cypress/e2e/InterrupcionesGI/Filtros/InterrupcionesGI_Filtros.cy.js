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

    xit('IJCESGDSAR-5427 - Filtros. Seleccionar estado Abiertas / Cerradas y periodo sin FM. ', () => {

        cy.loginAPI();
        MenuPrincipal.navegarAInterrupcionesGI()

    })


});

