
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREConsultar from "../../../support/page_objects/TablasENRE/Consultar";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Tablas ENRE - Consultar', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

});

