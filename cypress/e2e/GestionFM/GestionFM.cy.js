Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import GestionFM_FE from '../../support/page_objects/GestionFM/FE'
import MenuPrincipal from '../../support/page_objects/MenuPrincipal'




describe('Módulo GestionFM', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    afterEach(() => {
        cy.screenshotTimestamped();
    });

    it('IJCESGDSAR-5511 - Visualzación OK en grilla resultados', () => {

        const numReg = 60

        MenuPrincipal.navegaraAGestionFM()

        //Intercepta los datos del filtro y el count de registros
        GestionFM_FE.respuestaMockeada(numReg)

        // Comprueba si algunos campos del id 260917 se presentan bien en la grilla
        cy.get('#260917').should('exist')
        cy.get('#260917 > .documento').should('have.text', 'D-2025-07-0100476')
        cy.get('#260917 > .fecha-alta').should('have.text', '25-07-2025 11:02:49')

        // Comprueba que el contador de paginas es correcto dependiendo el numReg
        const numPaginas = Math.ceil(numReg / 15)
        cy.get('button#final-page').eq(0).should('have.text', `${numPaginas}`)


    })

    it('IJCESGDSAR-5511 - Filtros seleccionados forman un API Request correcto', () => {

        const params = {
            interruptionId: '12345',
            dateFrom: '01-01-2025 00:00:00',
            dateTo: '31-01-2025 23:59:59',
            projectCode: 'P-001',
            selectedCausal: '1',
            buildingCode: 'B-001',
            documentNumber: 'D-001'
        }

        MenuPrincipal.navegaraAGestionFM()
        GestionFM_FE.mostrarFiltros()
        GestionFM_FE.rellenaCamposFiltros(params)

        // Intercepta los requests y comprueba que los query params son los esperados 
        cy.intercept('GET', '/findFMByFilter2?all=false&size=15&page=*', (req) => {
            // Comprueba que los query params del request son los esperados
            expect(req.query).to.include({
                interruptionId: params.interruptionId,
                dateFrom: params.dateFrom,
                dateTo: params.dateTo,
                projectCode: params.projectCode,
                selectedCausal: params.selectedCausal,
                buildingCode: params.buildingCode,
                documentNumber: params.documentNumber
                //documentNumber: '1234'
            })
        }).as('getFMData')

        cy.intercept('GET', '/countFMByFilter2?&*', (req) => {
            // Comprueba que los query params del request son los esperados
            expect(req.query).to.include({
                interruptionId: params.interruptionId,
                dateFrom: params.dateFrom,
                dateTo: params.dateTo,
                projectCode: params.projectCode,
                selectedCausal: params.selectedCausal,
                buildingCode: params.buildingCode,
                documentNumber: params.documentNumber
                //documentNumber: '1234'
            })
        }).as('getFMCount') 

        GestionFM_FE.pulsaBuscar()

        cy.wait(['@getFMData', '@getFMCount'])


    })


});

