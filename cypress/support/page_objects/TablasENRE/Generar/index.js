const el = require('./elements').ELEMENTS

class TablasENRE_Generar {

    
    

    clickarTablasMensuales() {
        cy.get(el.tablasMensuales).should('be.visible').click()
        cy.get(el.grillaMensual).should('be.visible')

    }

    clickarTablasSemestrales() {
        cy.get(el.tablasSemestral).should('be.visible').click()
        cy.get(el.grillaSemestral).should('be.visible')
    }

    clickarTablasFuerzaMayor() {
        cy.get(el.tablasFuerzaMayor).should('be.visible').click()
        cy.get(el.grillaFuerzaMayor).should('be.visible')
    }

    clickarTablasOther() {
        cy.get(el.tablasOther).should('be.visible').click()
        cy.get(el.grillaOther).should('be.visible')
    }

    seleccionaPeriodoPorPosicion(periodo) {
        cy.get(el.seleccionPeriodo).should('be.visible').click()
        cy.get(el.listaPeriodos).should('be.visible').eq(periodo).click()

    }

    seleccionaPeriodoPorNombre(periodo) {
        // cy.get(el.seleccionPeriodo).should('be.visible').click()
        // cy.get(el.listaPeriodos).should('be.visible').eq(periodo).click()

    }
}

export default new TablasENRE_Generar();