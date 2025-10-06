Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

import GestionFMIndividual from '../../../support/page_objects/GestionFM/Individual'
import MenuPrincipal from '../../../support/page_objects/MenuPrincipal'
import Login from '../../../support/page_objects/Login'




describe('Módulo GestionFM - Individual', () => {


    beforeEach(() => {
        cy.loginAPI();
    });


})
