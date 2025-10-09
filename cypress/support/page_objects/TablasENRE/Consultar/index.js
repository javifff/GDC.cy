const el = require('./elements').ELEMENTS

class TablasENRE_Consultar {

    
    seleccionaConsultaPorClientes() {
        cy.get(el.botonConsultarPorClientes).should('be.visible').click();
        cy.get(el.inputNumeroCliente).should('be.visible');
    }

    seleccionaConsultaPorDocumento() {
        cy.get(el.botonConsultarPorDocumento).should('be.visible').click();
        cy.get(el.inputNumeroDocumento).should('be.visible');
    }

    rellenaInputNumeroCliente(cliente) {
        cy.get(el.inputNumeroCliente).should('be.visible')
        cy.get(el.inputNumeroCliente).clear({ force: true })
        cy.get(el.inputNumeroCliente).type(cliente, { force: true })
    }

    rellenaInputNumeroDocumento(documento) {
        cy.get(el.inputNumeroDocumento).should('be.visible')
        cy.get(el.inputNumeroDocumento).clear({ force: true })
        cy.get(el.inputNumeroDocumento).type(documento, { force: true })
    }

    seleccionTarifaPorPosicion(pos) {
        cy.get(el.inputTarifa).should('be.visible').click()
        cy.get(el.listaTarifas).should('be.visible').eq(pos).click()
    }

    clickarBotonBuscarClientes() {
        cy.get(el.botonBuscarCliente).should('be.visible').click()
        cy.get(el.tablaClientes).should('be.visible')
    }

    clickarBotonBuscarDocumento() {
        cy.get(el.botonBuscarDocumento).should('be.visible').click()
        cy.get(el.tablaDocumentos).should('be.visible')
    }

    verificarTablaVaciaClientes() {
        // Mensaje de tabla vacia
        cy.get(el.tablaClientes).should('be.visible').contains('No se consiguieron datos.')
    }

    verificarTablaVaciaDocumentos() {
        // Mensaje de tabla vacia
        cy.get(el.tablaDocumentos).should('be.visible').contains('No se consiguieron datos.')
    }

}

export default new TablasENRE_Consultar();