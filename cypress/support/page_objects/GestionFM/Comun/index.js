const el = require('./elements').ELEMENTS

class GestionFM_Comun {

    navegaraAGestionFM() {
        // NavegarAGestionFM
        cy.get('.menu-item.fm').click()
        cy.url().should('include', '/gestionfm')
        cy.get('.mdl-layout__header-row').should('contain', 'Gestión FM')
    }


}

export default new GestionFM_Comun();