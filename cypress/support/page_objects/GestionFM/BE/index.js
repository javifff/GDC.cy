const el = require('./elements').ELEMENTS

class GestionFM_BE {

    getfindFMByFilter({
        all = false,
        size = 15,
        page = 0,
        sort = 'creation_time',
        direction = 'desc',
        interruptionId = '',
        dateFrom = '',
        dateTo = '',
        projectCode = '',
        selectedCausal = '',
        buildingCode = '',
        documentNumber = ''
    }) {
        const url = Cypress.config('baseUrl')
        const baseUrl = `${url}/findFMByFilter2`;
        const queryParams = new URLSearchParams({
            all,
            size,
            page,
            sort,
            direction,
            interruptionId,
            dateFrom,
            dateTo,
            projectCode,
            selectedCausal,
            buildingCode,
            documentNumber
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        cy.logWithContext('getfindFMByFilter', fullUrl);
        // Ver posibilidad de escribir en un archivo de log
        return cy.request(fullUrl);
    }


    getCountFMByFilter({
        interruptionId = '',
        dateFrom = '',
        dateTo = '',
        projectCode = '',
        selectedCausal = '',
        buildingCode = '',
        documentNumber = ''
    }) {
        const url = Cypress.config('baseUrl')
        const baseUrl = `${url}/countFMByFilter2`;
        const queryParams = new URLSearchParams({
            interruptionId,
            dateFrom,
            dateTo,
            projectCode,
            selectedCausal,
            buildingCode,
            documentNumber
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        cy.logWithContext('getCountFMByFilter', fullUrl);
        // Ver posibilidad de escribir en un archivo de log
        return cy.request(fullUrl)
    }


    requestConFiltros(params, numRegistrosEsperados) {
        // Con cy.task a la BBDD vemos cuantos registros debe devolver con esos filtros
        // y luego comprobamos que la API devuelve lo mismo


        this.getfindFMByFilter(params).then((response) => {
            cy.logWithContext('getfindFMByFilter Response', response);
            expect(response.status).to.eq(200)
            expect(response.headers['content-type']).to.include('application/json')
            expect(response.body).to.be.an('array')
            const numRegistrosPrimeraPagina = Math.min(numRegistrosEsperados, 15);
            expect(response.body).to.have.length(numRegistrosPrimeraPagina)
            // Se puede añadir verificacion de alguns campos más, IDs devueltos, etc
        })

        this.getCountFMByFilter(params).then((response) => {
            cy.logWithContext('Response getCountFMByFilter', response);
            expect(response.status).to.eq(200);
            expect(response.body).to.be.eq(numRegistrosEsperados);
        })


    }


    getfindFMByFilterSinOperacion({
        all = false,
        size = 15,
        page = 0,
        sort = 'creation_time',
        direction = 'desc',
        interruptionId = '',
        dateFrom = '',
        dateTo = '',
        projectCode = '',
        selectedCausal = '',
        buildingCode = '',
        documentNumber = '',
        withoutOperation = ''
    }) {
        const url = Cypress.config('baseUrl')
        const baseUrl = `${url}/findFMByFilter2`;
        const queryParams = new URLSearchParams({
            all,
            size,
            page,
            sort,
            direction,
            interruptionId,
            dateFrom,
            dateTo,
            projectCode,
            selectedCausal,
            buildingCode,
            documentNumber,
            withoutOperation
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        cy.logWithContext('getfindFMByFilterSinOperacion', fullUrl);
        // Ver posibilidad de escribir en un archivo de log
        return cy.request(fullUrl);
    }


    getCountFMByFilterSinOperacion({
        interruptionId = '',
        dateFrom = '',
        dateTo = '',
        projectCode = '',
        selectedCausal = '',
        buildingCode = '',
        documentNumber = '',
        withoutOperation = ''
    }) {
        const url = Cypress.config('baseUrl')
        const baseUrl = `${url}/countFMByFilter2`;
        const queryParams = new URLSearchParams({
            interruptionId,
            dateFrom,
            dateTo,
            projectCode,
            selectedCausal,
            buildingCode,
            documentNumber,
            withoutOperation
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        cy.logWithContext('getCountFMByFilterSinOperacion', fullUrl);
        // Ver posibilidad de escribir en un archivo de log
        return cy.request(fullUrl)
    }


    requestConFiltrosSinOperacion(params, numRegistrosEsperados) {
        // Con cy.task a la BBDD vemos cuantos registros debe devolver con esos filtros
        // y luego comprobamos que la API devuelve lo mismo

        this.getfindFMByFilterSinOperacion(params).then((response) => {
            cy.logWithContext('getfindFMByFilterSinOperacion Response', response);
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.be.an('array');
            const numRegistrosPrimeraPagina = Math.min(numRegistrosEsperados, 15);
            expect(response.body).to.have.length(numRegistrosPrimeraPagina)
            // Se puede añadir verificacion de alguns campos más, IDs devueltos, etc
        })

        this.getCountFMByFilterSinOperacion(params).then((response) => {
            cy.logWithContext('Response getCountFMByFilterSinOperacion', response);
            expect(response.status).to.eq(200);
            expect(response.body).to.be.eq(numRegistrosEsperados);
        })


    }

}

export default new GestionFM_BE();