Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import SimulacionListarSimulaciones from "../../../support/page_objects/Simulacion/Listar/Simulaciones";
import SimulacionListarResultados from "../../../support/page_objects/Simulacion/Listar/Resultados";
import SimulacionListarDetallesClientes from "../../../support/page_objects/Simulacion/Listar/DetallesClientes";


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
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)
    })


    it('CERTASEARG-5708 - Listar Simulaciones Resultados', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        SimulacionListarSimulaciones.clickarResultadosSimulaciones()
        SimulacionListarResultados.verificarResultadosSimulaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        SimulacionListarResultados.clickarBotonVolver()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(3)



    })


    it('CERTASEARG-5710 - Listar Simulaciones Resultados - Descargar CSV', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        SimulacionListarSimulaciones.clickarResultadosSimulaciones()
        SimulacionListarResultados.verificarResultadosSimulaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        cy.eliminaArchivo('Resultado cálculo de creditos.csv')
        SimulacionListarResultados.clickarDescargarCSV()
        SimulacionListarResultados.compruebaDescarga('Resultado cálculo de creditos.csv')


        // Paso 4
        SimulacionListarResultados.clickarBotonVolver()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(3)

    })

  it('CERTASEARG-5712 - Listar Simulaciones Resultados - Detalles por clientes', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarASimulacion()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        SimulacionListarSimulaciones.clickarResultadosSimulaciones()
        SimulacionListarResultados.verificarResultadosSimulaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        SimulacionListarResultados.clickarResultadosVerDetallesClientes();
        SimulacionListarDetallesClientes.verificarResultadosVerDetallesClientes();
        cy.screenshotTimestamped(3)

        // Paso 4
        SimulacionListarDetallesClientes.clickarBotonVolver()
        SimulacionListarResultados.verificarResultadosSimulaciones();
        cy.screenshotTimestamped(4.1)
        SimulacionListarResultados.clickarBotonVolver()
        SimulacionListarSimulaciones.verificarTablaSimulacionesNoVacia()
        cy.screenshotTimestamped(4.2)

    })
   

});

