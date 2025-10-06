Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREReportes from "../../../support/page_objects/TablasENRE/Reportes";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Tablas ENRE - Reportes', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

});

