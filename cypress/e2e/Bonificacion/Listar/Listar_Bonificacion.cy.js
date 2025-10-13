Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import ListarBonificacion from "../../../support/page_objects/Bonificacion/Listar";

describe('Módulo Bonificacion - Listar', () => {


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


       it('CERTASEARG-5764 - Listar Bonificaciones Resultados', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()
        ListarBonificacion.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        ListarBonificacion.clickarResultados()
        ListarBonificacion.verificarResultados()
        cy.screenshotTimestamped(2)

        // Paso 3
        ListarBonificacion.clickarBotonVolver()
        ListarBonificacion.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(3)



    })

});

