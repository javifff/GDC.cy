const el = require('./elements').ELEMENTS

class MenuPrincipal {

    navegarAInterrupcionesGI() {
        // NavegarAInterrupcionesGI
        cy.get(el.linkInterrupcionesGI).click()

        // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.intercept('GET', '**Roboto-Thin.ttf**').as('ultimoRequest')
        cy.wait('@ultimoRequest', { timeout: 30000 }).its('response.statusCode').should('eq', 200)
        //

        cy.url().should('include', '/gestorInterrupciones')
        cy.get(el.tituloInterrupcionesGI).should('contain', 'Gestor de Interrupciones')

    }


    navegarAGestionFM() {
        // NavegarAGestionFM
        cy.get(el.linkGestionFM).click()
        

         // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.intercept('GET', '**/countFMByFilter2**').as('ultimoRequest')
        cy.wait('@ultimoRequest', { timeout: 20000 }).its('response.statusCode').should('eq', 200)
        //

        cy.url().should('include', '/gestionfm')
        cy.get(el.tituloGestionFM).should('contain', 'Gestión FM')
        
    }




}

export default new MenuPrincipal();