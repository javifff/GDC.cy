const el = require('./elements').ELEMENTS

class GestionFM_Gestion {

    respuestaMockeada(numReg) {
        //Intercepta los datos del filtro y el count de registros
        cy.intercept('GET', '/findFMByFilter2?all=false&size=15&page=*',
            { fixture: `GestionFM_${numReg}reg.json` }).as('getFMData')
        cy.intercept('GET', '/countFMByFilter2?&*', `${numReg}`).as('getFMCount')
        cy.get('#gestion-fm-link').click()
        cy.wait(['@getFMData', '@getFMCount'])
    }

    mostrarFiltros() {
        // Hay que esperar a que termine de cargar la pagina
        // Termina cuando desaparece el loading-helper
        // Muestra un Loading... que bloquea la interaccion con los elementos

        cy.get('#loading-helper').should('exist', { timeout: 10000 })
        cy.get('#loading-helper').should('not.visible', { timeout: 10000 })
            // .should('have.attr', 'style')
            // .and('include', 'display: none')
            .then(() => {
                cy.get('#filters-container').then(($el) => {
                    const isHidden = $el.attr('style')?.includes('display: none');
                    if (isHidden) {
                        cy.get('#filters-container-toggle').click();
                        cy.get('#filters-container').should('not.have.attr', 'style', 'display: none;');
                    }
                });
            });

    }

    rellenaCamposFiltros(params) {

        cy.get(el.interruptionIdInput).clear().type(params.interruptionId)
        //GestionFM_FE.seleccionarFechaHoraEnCalendario('2023-01-01', '00:00')
        //cy.get(el.dateFromInput).should('have.value', '01/01/2023 00:00')
        //GestionFM_FE.seleccionarFechaHoraEnCalendario('2023-01-31', '23:59')
        //cy.get(el.dateToInput).should('have.value', '31/01/2023 23:59')
        cy.get(el.dateFromInput).clear().type(params.dateFrom)
        cy.get(el.dateToInput).clear().type(params.dateTo)
        cy.get(el.projectCodeInput).clear({ force: true }).type(params.projectCode,{ force: true })
        cy.get(el.selectedCausalInput).click()
        cy.get(el.listaCausalInput).find('li').eq(params.selectedCausal).click()
        cy.get(el.buildingCodeInput).clear().type(params.buildingCode)
        cy.get(el.documentNumberInput).clear({ force: true }).type(params.documentNumber,{ force: true })

    }

    pulsaBuscar() {
        cy.get(el.buscarButton).click()
    }

    pulsaLimpiar() {
        cy.get(el.limpiarButton).click()
    }

    verificarCamposVacios() {
         cy.get(el.interruptionIdInput).should('have.value','')
        //GestionFM_FE.seleccionarFechaHoraEnCalendario('2023-01-01', '00:00')
        //cy.get(el.dateFromInput).should('have.value', '01/01/2023 00:00')
        //GestionFM_FE.seleccionarFechaHoraEnCalendario('2023-01-31', '23:59')
        //cy.get(el.dateToInput).should('have.value', '31/01/2023 23:59')
       
        // cy.get(el.dateFromInput).clear().type(params.dateFrom)
        // cy.get(el.dateToInput).clear().type(params.dateTo)
        // cy.get(el.projectCodeInput).clear({ force: true }).type(params.projectCode,{ force: true })
        // cy.get(el.selectedCausalInput).click()
        // cy.get(el.listaCausalInput).find('li').eq(params.selectedCausal).click()
        // cy.get(el.buildingCodeInput).clear().type(params.buildingCode)
        // cy.get(el.documentNumberInput).clear({ force: true }).type(params.documentNumber,{ force: true })


    }


    seleccionarFechaHoraEnCalendario(fecha, hora) {

    }

    pulsarBotonMenu() {
        cy.get(el.botonMenu).should('be.visible').click()
        cy.get(el.botonMenu).should('not.exist')
    }

}

export default new GestionFM_Gestion();