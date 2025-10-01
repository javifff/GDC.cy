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


    // Para Filtros

    mostrarFiltros() {
        cy.get(el.botonMuestraFiltros).should('be.visible').click()
        cy.get(el.tipoDocumentoInicioCombo).should('be.visible')
    }


    // Para prueba CERTASEARG-5451. Marcar todos los filtros y borrar

    rellenarTodosLosFiltros() {

        // Tipo de documento inicio
        cy.get(el.tipoDocumentoInicioBoton).click()
        this.chequearComboCompleto(el.tipoDocumentoInicioChecks);

    }

    chequearComboCompleto(selector) {
        cy.get(selector).within(() => {
            cy.get('paper-checkbox').each($checkbox => {
                if ($checkbox.attr('aria-checked') !== 'true') {
                    cy.wrap($checkbox).click();
                }
            })
        });
    }

    deschequearComboCompleto(selector) {
        cy.get(selector).within(() => {
            cy.get('paper-checkbox').each($checkbox => {
                if ($checkbox.attr('aria-checked') !== 'false') {
                    cy.wrap($checkbox).click();
                }
            })

        });

    //

    }

  

}

export default new InterrupcionesGI();