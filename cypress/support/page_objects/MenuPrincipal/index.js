const el = require('./elements').ELEMENTS

class MenuPrincipal {

    navegarAInterrupcionesGI() {
        // NavegarAInterrupcionesGI
        cy.get(el.linkInterrupcionesGI).click()
        cy.url().should('include', '/gestorInterrupciones')
        cy.get(el.tituloInterrupcionesGI).should('contain', 'Gestor de Interrupciones')
        // Espera a que cargue las fuentes de version
        cy.get(el.version).should('be.visible')
        .and('have.attr', 'font-family', 'Roboto, Arial, sans-serif')
        
    }


    navegarAGestionFM() {
        // NavegarAGestionFM
        cy.get(el.linkGestionFM).click()
        cy.url().should('include', '/gestionfm')
        cy.get(el.tituloGestionFM).should('contain', 'Gestión FM')
    }




}

export default new MenuPrincipal();