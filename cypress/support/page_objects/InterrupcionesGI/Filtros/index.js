const el = require('./elements').ELEMENTS

class InterrupcionesGI_Filtros {


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

export default new InterrupcionesGI_Filtros();