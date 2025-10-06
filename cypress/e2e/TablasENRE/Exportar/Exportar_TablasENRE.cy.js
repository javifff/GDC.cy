Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREExportar from "../../../support/page_objects/TablasENRE/Exportar";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Tablas ENRE - Exportar', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

});

