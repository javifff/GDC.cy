const el = require('./elements').ELEMENTS

class Login {

    navegarAPaginaLogin() {
        cy.visit('/')
        cy.url().should('include', '/login')
    }

    completarCredenciales(usuario, password) {
        cy.visit('/')
        cy.get(el.inputUsuario).type(usuario)
        cy.get(el.inputPassword).type(password)
    }

    enviarCredenciales() {
        cy.get(el.botonIngresar).click()
    }

    verificarMensajeErrorCredencialesErroneas() {
        cy.get(el.mensajeErrorCredencialesErroneas).should('contain', 'Credenciales Inválidas')
        cy.url().should('include', '/login')
    }

    verificarMenuPrincipal() {
        // Carga el menu principal
        cy.get(el.tituloPrincipal).should('contain', 'Gestor de Calidad')
        cy.get(el.iconoSalir).should('be.visible') // Espera a que se carguen imagenes
        cy.url().should('not.include', '/login')
    }

}

export default new Login();