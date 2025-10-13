Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import ListarBonificacion from "../../../support/page_objects/Bonificacion/Listar";

describe('Módulo Bonificacion - Listar', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    it('CERTASEARG-5761 - Buscar Bonificacion', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()


        // Paso 2
        // Verificar que se listan las bonificaciones
        ListarBonificacion.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)
    })


});

