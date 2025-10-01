const el = require('./elements').ELEMENTS

class MenuPrincipal {

    navegarAInterrupcionesGI() {

        // Interceptamos el Ultimo elemento en cargar en la pagina
        cy.intercept('GET', '**Roboto-Thin.ttf**').as('ultimoRequest')

        // NavegarAInterrupcionesGI
        cy.get(el.linkInterrupcionesGI).click()

        // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.wait('@ultimoRequest', { timeout: 60000 }).its('response.statusCode').should('eq', 200)

        cy.url().should('include', '/gestorInterrupciones')
        cy.get(el.tituloInterrupcionesGI).should('contain', 'Gestor de Interrupciones')

    }


    navegarAGestionFM() {

        // Interceptamos el Ultimo elemento en cargar en la pagina
        cy.intercept('GET', '**/countFMByFilter2**').as('ultimoRequest')

        // NavegarAGestionFM
        cy.get(el.linkGestionFM).click()
        

         // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.wait('@ultimoRequest', { timeout: 20000 }).its('response.statusCode').should('eq', 200)
        

        cy.url().should('include', '/gestionfm')
        cy.get(el.tituloGestionFM).should('contain', 'Gestión FM')
        
    }

    navegarATablasENRE() {

        // Interceptamos el Ultimo elemento en cargar en la pagina
        cy.intercept('GET', '**/sm-font.ttf**').as('ultimoRequest')
        
        // NavegarATablasENRE
        cy.get(el.linkTablasENRE).click()
        

         // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.wait('@ultimoRequest', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        

        cy.url().should('include', '/enre')
        cy.get(el.tituloTablasENRE).should('contain', 'Tablas Enre')
        
    }

    navegarASimulacion() {

        // Interceptamos el Ultimo elemento en cargar en la pagina
        cy.intercept('GET', '**/processesByFilter?**').as('ultimoRequest')
        
        // NavegarASimulacion
        cy.get(el.linkSimulacion).click()
        

         // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.wait('@ultimoRequest', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        

        cy.url().should('include', '/simulacion')
        cy.get(el.tituloSimulacion).should('contain', 'Simulación')
        
    }

    navegarABonificacion() {

        // Interceptamos el Ultimo elemento en cargar en la pagina
        cy.intercept('GET', '**/processesByFilter?**').as('ultimoRequest')
        
        // NavegarASimulacion
        cy.get(el.linkBonificacion).click()
        

         // En cada módulo hay que ver cual es el ultimo request y esperar por él
        cy.wait('@ultimoRequest', { timeout: 40000 }).its('response.statusCode').should('eq', 200)
        

        cy.url().should('include', '/bonification')
        cy.get(el.tituloBonificacion).should('contain', 'Bonificación')
        
    }


}

export default new MenuPrincipal();