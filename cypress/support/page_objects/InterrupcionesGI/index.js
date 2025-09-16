const el = require('./elements').ELEMENTS

class InterrupcionesGI {




    pulsarBotonCerrarSesion() {
        cy.get(el.botonLogout).should('be.visible').click()
        cy.get(el.opcionCerrarSesion).should('be.visible').click()
    }

    cancelarCerrarSesion() {
        cy.get(el.dialogSalirCancelar).should('be.visible').click()
    }

    aceptarCerrarSesion() {
        cy.get(el.dialogSalirAceptar).should('be.visible').click()

    }
}

export default new InterrupcionesGI();