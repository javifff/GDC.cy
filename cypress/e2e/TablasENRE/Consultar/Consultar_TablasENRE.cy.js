
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


import TablasENREComun from "../../../support/page_objects/TablasENRE/Comun";
import TablasENREConsultar from "../../../support/page_objects/TablasENRE/Consultar";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Tablas ENRE - Consultar', () => {


     it('CERTASEARG-5682 - Consulta por Cliente inexistente', () => {
    
            // Paso 1
            cy.loginAPI();
            cy.screenshotTimestamped(1.1)
            MenuPrincipal.navegarATablasENRE();
            TablasENREComun.navegarAPestañaConsultar();
            cy.screenshotTimestamped(1.2)
    
            // Paso 2    
            TablasENREConsultar.seleccionaConsultaPorClientes();
            cy.screenshotTimestamped(2);

            // Paso 3
            TablasENREConsultar.rellenaInputNumeroCliente('87878787') // Cliente no existente
            TablasENREConsultar.seleccionTarifaPorPosicion(0); // Selecciona primera tarifa por ser obligatorio
            cy.screenshotTimestamped(3.1, true);
            TablasENREConsultar.clickarBotonBuscarClientes();
            TablasENREConsultar.verificarTablaVaciaClientes();
            cy.screenshotTimestamped(3.2, true);
        })

        it('CERTASEARG-5685 - Consulta por Documento inexistente', () => {
    
            // Paso 1
            cy.loginAPI();
            cy.screenshotTimestamped(1.1)
            MenuPrincipal.navegarATablasENRE();
            TablasENREComun.navegarAPestañaConsultar();
            cy.screenshotTimestamped(1.2)
    
            // Paso 2    
            TablasENREConsultar.seleccionaConsultaPorDocumento();
            cy.screenshotTimestamped(2);

            // Paso 3
            TablasENREConsultar.rellenaInputNumeroDocumento('87878787') // Documento no existente
            cy.screenshotTimestamped(3.1, true);
            TablasENREConsultar.clickarBotonBuscarDocumento();
            TablasENREConsultar.verificarTablaVaciaDocumentos();
            cy.screenshotTimestamped(3.2, true);
        })
        
});

