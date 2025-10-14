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


    it('CERTASEARG-5708 - Listar Simulaciones Resultados', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion()
        ListarSimulacion.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        ListarSimulacion.clickarResultados()
        ListarSimulacion.verificarResultados()
        cy.screenshotTimestamped(2)

        // Paso 3
        ListarSimulacion.clickarBotonVolver()
        ListarSimulacion.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(3)



    })


    it('CERTASEARG-5710 - Listar Simulaciones Resultados - Descargar CSV', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion()
        ListarSimulacion.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        ListarSimulacion.clickarResultados()
        ListarSimulacion.verificarResultados()
        cy.screenshotTimestamped(2)

        // Paso 3
        cy.eliminaArchivo('Resultado cálculo de creditos.csv')
        ListarSimulacion.clickarDescargarCSV()
        ListarSimulacion.compruebaDescarga('Resultado cálculo de creditos.csv')


        // Paso 4
        ListarSimulacion.clickarBotonVolver()
        ListarSimulacion.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(3)



    })


});

