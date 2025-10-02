import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREGenerar from "../../../support/page_objects/TablasENRE/Generar";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


describe('Módulo Tablas ENRE - Generar', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5604 - Buscar y refrescar cada tabla', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarATablasENRE();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        TablasENREComun.navegarAPestañaGenerar();
        TablasENREGenerar.seleccionaPeriodoPorPosicion(1);
        cy.screenshotTimestamped(2.1);
        TablasENREGenerar.clickarTablasMensuales();
        cy.screenshotTimestamped(2.2);
    })


});

