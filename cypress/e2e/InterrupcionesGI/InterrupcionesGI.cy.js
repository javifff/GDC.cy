import InterrupcionesGI from "../../support/page_objects/InterrupcionesGI";
import Login from "../../support/page_objects/Login";
import MenuPrincipal from "../../support/page_objects/MenuPrincipal";

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});

// import GestionFM_FE from '../../support/page_objects/GestionFM/FE'
// import GestionFM_Comun from '../../support/page_objects/GestionFM/Comun'




describe('Módulo Interrupciones - GI', () => {


    // beforeEach(() => {
    //     cy.loginAPI();
    // });

    // afterEach(() => {
    //     cy.screenshotTimestamped();
    // });


    it('IJCESGDSAR-5425 - GI. Login', () => {

        const usuario = Cypress.env('test').username
        const password = Cypress.env('test').password

        // Paso 1
        Login.navegarAPaginaLogin();
        cy.screenshotTimestamped(1);

        // Paso 2
        Login.completarCredenciales(usuario + 'xxxx', password);
        cy.screenshotTimestamped(2.1);
        Login.enviarCredenciales();
        Login.verificarMensajeErrorCredencialesErroneas();
        cy.screenshotTimestamped(2.2);

        // Paso 3
        Login.completarCredenciales(usuario, password + 'xxxx');
        cy.screenshotTimestamped(3.1);
        Login.enviarCredenciales();
        Login.verificarMensajeErrorCredencialesErroneas();
        cy.screenshotTimestamped(3.2);

        // Paso 4
        Login.completarCredenciales(usuario + 'xxxx', password + 'xxxx');
        cy.screenshotTimestamped(4.1);
        Login.enviarCredenciales();
        Login.verificarMensajeErrorCredencialesErroneas;
        cy.screenshotTimestamped(4.2);

        // Paso 5
        Login.completarCredenciales(usuario, password);
        cy.screenshotTimestamped(5.1);
        Login.enviarCredenciales();
        Login.verificarLoginCorrecto();
        cy.screenshotTimestamped(5.2);

    })

    xit('IJCESGDSAR-5427 - Filtros. Seleccionar estado Abiertas / Cerradas y periodo sin FM. ', () => {


        MenuPrincipal.navegaraAInterrupcionesGI()

    })

     it.only('IJCESGDSAR-5470 - GI. Cerrar sesión', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarAInterrupcionesGI();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        InterrupcionesGI.pulsarBotonCerrarSesion();
        cy.screenshotTimestamped(2.1)
        InterrupcionesGI.cancelarCerrarSesion();
        cy.screenshotTimestamped(2.2)        


     })
});

