Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


import GestionFM_BE from '../../support/page_objects/GestionFM/BE/index.js'



describe('Módulo GestionFM API', () => {


    beforeEach(() => {
        cy.loginAPI();
    });

   

    it('IJCESGDSAR-5511 - Filtro con Fecha Inicio', () => {

        const params = {
            interruptionId: '',
            dateFrom: '01-07-2025 12:33:00',
            dateTo: '',
            projectCode: '',
            selectedCausal: '',
            buildingCode: '',
            documentNumber: ''
         };

        const numRegistrosEsperados = 3; // Valor que debe venir de la BBDD
        
        GestionFM_BE.requestConFiltros(params, numRegistrosEsperados);

    });

    it('IJCESGDSAR-5511 - Seleccionado check "Sin operación"', () => {

        const params = {
            interruptionId: '',
            dateFrom: '',
            dateTo: '',
            projectCode: '',
            selectedCausal: '',
            buildingCode: '',
            documentNumber: '',
            withoutOperation: 'on'
        };

        const numRegistrosEsperados = 17923; // Valor que debe venir de la BBDD

        GestionFM_BE.requestConFiltrosSinOperacion(params, numRegistrosEsperados);

    });

});

