Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import BonificacionComun from "../../../support/page_objects/Bonificacion/Comun";


describe('Módulo Simulacion - Nueva', () => {

    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5790 - NO COMPLETA - Crear nueva Bonificacion - Tipo Pre-calculo', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        BonificacionComun.navegarAPestañaNueva();
        cy.screenshotTimestamped(2.1)        

        
    })


});

