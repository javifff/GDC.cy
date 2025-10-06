
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREControles from "../../../support/page_objects/TablasENRE/Controles";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Tablas ENRE - Controles', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

});

