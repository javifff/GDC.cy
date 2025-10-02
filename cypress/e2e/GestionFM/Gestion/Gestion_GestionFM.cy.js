Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import GestionFMGestion from '../../../support/page_objects/GestionFM/Gestion'
import MenuPrincipal from '../../../support/page_objects/MenuPrincipal'
import Login from '../../../support/page_objects/Login'




describe('Módulo GestionFM - Gestion', () => {


    beforeEach(() => {
        cy.loginAPI();
    });


    it('CERTASEARG-5512 - FM. Limpiar Filtros', () => {

        const params = {
            interruptionId: '12345',
            dateFrom: '01-01-2025 00:00:00',
            dateTo: '31-01-2025 23:59:59',
            projectCode: 'P-001',
            selectedCausal: '1',
            buildingCode: 'B-001',
            documentNumber: 'D-001'
        }

        // Paso 1
        cy.screenshotTimestamped(1)
        MenuPrincipal.navegarAGestionFM()

        // Paso 2
        cy.screenshotTimestamped(2.1)
        GestionFMGestion.mostrarFiltros()
        cy.screenshotTimestamped(2.2)

        // Paso 3 
        GestionFMGestion.rellenaCamposFiltros(params)
        cy.screenshotTimestamped(3, true)

        // Paso 4 
        GestionFMGestion.pulsaLimpiar()
        GestionFMGestion.verificarCamposVacios()
        cy.screenshotTimestamped(4, true)




    })


    it.skip('CERTASEARG-5557 - FM. Volver al menu', () => {

        // Paso 1
        cy.screenshotTimestamped(1)
        MenuPrincipal.navegarAGestionFM()

        // Paso 2
        cy.screenshotTimestamped(2)
        GestionFMGestion.pulsarBotonMenu()


        // Paso 3
        Login.verificarMenuPrincipal()
        cy.screenshotTimestamped(3)


    })

})
