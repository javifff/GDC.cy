Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import ListarSimulacion from "../../../support/page_objects/Simulacion/Listar";

describe('Módulo Simulacion - Listar', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5705 - Buscar Simulacion', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        // Verificar que se listan las simlaciones
        ListarSimulacion.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)
    })


});

