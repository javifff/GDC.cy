const el = require('./elements').ELEMENTS

class InterrupcionesGI {




    pulsarBotonLogout() {
        cy.get(el.botonLogout).should('be.visible').click()
        cy.get(el.opcionCerrarSesion).should('be.visible')
    }

    pulsarBotonVolverMenu() {
        cy.get(el.opcionVolverMenu).should('be.visible').click()
        cy.get(el.botonLogout).should('not.exist')
        cy.get(el.tituloPrincipal).should('contain', 'Gestor de Calidad')
    }

    pulsarBotonCerrarSesion() {
        cy.get(el.opcionCerrarSesion).should('be.visible').click()
        cy.get(el.dialogSalirCancelar).should('be.visible')
    }

    cancelarCerrarSesion() {
        cy.get(el.dialogSalirCancelar).should('be.visible').click()
        cy.get(el.dialogSalirCancelar).should('not.be.visible');
    }

    aceptarCerrarSesion() {
        cy.get(el.dialogSalirAceptar).should('be.visible').click()
        cy.get(el.dialogSalirAceptar).should('not.exist')
        cy.get(el.botonLogout).should('not.exist')

    }
}

export default new InterrupcionesGI();