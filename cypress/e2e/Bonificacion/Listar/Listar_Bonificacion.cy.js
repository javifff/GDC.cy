Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";
import BonificacionListarBonificaciones from "../../../support/page_objects/Bonificacion/Listar/Bonificaciones";
import BonificacionListarResultados from "../../../support/page_objects/Bonificacion/Listar/Resultados";
import BonificacionListarDetallesClientes from "../../../support/page_objects/Bonificacion/Listar/DetallesClientes";


describe('Módulo Bonificacion - Listar', () => {


    it('CERTASEARG-5761 - Buscar Bonificacion', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()


        // Paso 2
        // Verificar que se listan las bonificaciones
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)
    })


    it('CERTASEARG-5764 - Listar Bonificaciones Resultados', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        BonificacionListarBonificaciones.clickarResultadosBonificaciones()
        BonificacionListarResultados.verificarResultadosBonificaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        BonificacionListarResultados.clickarBotonVolver()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(3)

    })

    it('CERTASEARG-5766 - Listar Bonificaciones Resultados - Descargar CSV', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        BonificacionListarBonificaciones.clickarResultadosBonificaciones()
        BonificacionListarResultados.verificarResultadosBonificaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        cy.eliminaArchivo('Resultado cálculo de creditos.csv')
        BonificacionListarResultados.clickarDescargarCSV()
        BonificacionListarResultados.compruebaDescarga('Resultado cálculo de creditos.csv')



        // Paso 4
        BonificacionListarResultados.clickarBotonVolver()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(3)

    })

  it('CERTASEARG-5768 - Listar Bonificaciones Resultados - Detalles por clientes', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarABonificacion()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(1.2)


        // Paso 2
        BonificacionListarBonificaciones.clickarResultadosBonificaciones()
        BonificacionListarResultados.verificarResultadosBonificaciones()
        cy.screenshotTimestamped(2)

        // Paso 3
        BonificacionListarResultados.clickarResultadosVerDetallesClientes();
        BonificacionListarDetallesClientes.verificarResultadosVerDetallesClientes();
        cy.screenshotTimestamped(3)

        // Paso 4
        BonificacionListarDetallesClientes.clickarBotonVolver()
        BonificacionListarResultados.verificarResultadosBonificaciones();
        cy.screenshotTimestamped(4.1)
        BonificacionListarResultados.clickarBotonVolver()
        BonificacionListarBonificaciones.verificarTablaBonificacionesNoVacia()
        cy.screenshotTimestamped(4.2)

    })
   

});

