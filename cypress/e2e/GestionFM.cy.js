Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import GestionFM_FE from '../support/page_objects/GestionFM/FE/index.js'
import GestionFM_Comun from '../support/page_objects/GestionFM/Comun/index.js'
import GestionFM_BE from '../support/page_objects/GestionFM/BE/index.js'



describe('Módulo GestionFM', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

    afterEach(() => {
        cy.screenshotTimestamped();
    });

    it('IJCESGDSAR-5511 - Prueba FE, visualzación OK en grilla resultados', () => {

        const numReg = 60

        GestionFM_Comun.navegaraAGestionFM()

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

    it('IJCESGDSAR-5511 - Prueba FE, Filtros seleccionados forman un API Request correcto', () => {

        GestionFM_Comun.navegaraAGestionFM()

        // Selecciona filtros incluyendo el selector del calendario
        // y comprueba que el Request coincide con los filtros seleccionados

    })


    it('IJCESGDSAR-5511 - Prueba BE, verificación datos respuesta API', () => {

        const params = {
            interruptionId: '',
            dateFrom: '01-07-2025 12:33:00',
            dateTo: '',
            projectCode: '',
            selectedCausal: '',
            buildingCode: '',
            documentNumber: ''
        };

        // Con cy.task a la BBDD vemos cuantos registros debe devolver con esos filtros
        // y luego comprobamos que la API devuelve lo mismo

        const numRegistrosEsperados = 3; // Valor ficticio, debe venir de la BBDD

        GestionFM_BE.getfindFMByFilter(params).then((response) => {
            console.log(response)
            expect(response.status).to.eq(200)
            expect(response.headers['content-type']).to.include('application/json')
            // Verifica que el body sea un array con x elementos
            expect(response.body).to.be.an('array')
            expect(response.body).to.have.length(numRegistrosEsperados)


        })

        GestionFM_BE.getCountFMByFilter(params).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);
            expect(response.body).to.be.eq(numRegistrosEsperados);
        })


    });
});

