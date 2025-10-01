Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import SimulacionComun from "../../../support/page_objects/Simulacion/Comun";


describe('Módulo Simulacion - Nueva', () => {

    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5741 - Crear nueva Simulacion', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        SimulacionComun.navegarAPestañaNueva();
        cy.screenshotTimestamped(2.1)        

        
    })


});

