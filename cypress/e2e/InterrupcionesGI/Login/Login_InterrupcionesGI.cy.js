Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora todos los errores uncaught de la app
    return false;
});


import InterrupcionesGILogin from "../../../support/page_objects/InterrupcionesGI/Login";
import Login from "../../../support/page_objects/Login";
import MenuPrincipal from "../../../support/page_objects/MenuPrincipal";


describe('Módulo Interrupciones - Login', () => {


    it('CERTASEARG-5425 - Interrupciones - Login', () => {

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
        Login.verificarMenuPrincipal();
        cy.screenshotTimestamped(5.2);

    })

     it('CERTASEARG-5426 - Interrupciones - Login. Inicio de Sesion Simultáneo. Mismo Usuario', () => {

        const usuario = Cypress.env('test').username
        const password = Cypress.env('test').password

        // Paso 1
        Login.navegarAPaginaLogin();
        cy.screenshotTimestamped(1);

        // Paso 2
        Login.completarCredenciales(usuario, password);
        cy.screenshotTimestamped(2);

        // Paso 3
        Login.enviarCredenciales();
        Login.verificarMenuPrincipal();
        cy.screenshotTimestamped(3);

        // Paso 4
        
        // Se limpia la sesión anterior
        cy.clearCookies();
        cy.clearLocalStorage();

        Login.navegarAPaginaLogin();
        cy.screenshotTimestamped(4);

        // Paso 5
        Login.completarCredenciales(usuario, password);
        cy.screenshotTimestamped(5);

        // Paso 6
        Login.enviarCredenciales();
        Login.verificarMenuPrincipal();
        cy.screenshotTimestamped(6);


    })


    it('CERTASEARG-5469 - Interrupciones - Volver al menú', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarAInterrupcionesGI();

        // Paso 2
        cy.screenshotTimestamped(2.1)
        InterrupcionesGILogin.pulsarBotonLogout();
        cy.screenshotTimestamped(2.2)
        InterrupcionesGILogin.pulsarBotonVolverMenu();
        cy.screenshotTimestamped(2.3) 

     })

     it('CERTASEARG-5470 - Interrupciones - Cerrar sesión', () => {

        // Paso 1
        cy.loginAPI();
        cy.screenshotTimestamped(1.1)
        MenuPrincipal.navegarAInterrupcionesGI();
        cy.screenshotTimestamped(1.2)

        // Paso 2
        cy.screenshotTimestamped(2.1)
        InterrupcionesGILogin.pulsarBotonLogout();
        cy.screenshotTimestamped(2.2)

        // Paso 3
        InterrupcionesGILogin.pulsarBotonCerrarSesion();
        cy.screenshotTimestamped(3.1)  
        InterrupcionesGILogin.cancelarCerrarSesion();     
        cy.screenshotTimestamped(3.2)   

        // Paso 4
        InterrupcionesGILogin.pulsarBotonLogout();
        InterrupcionesGILogin.pulsarBotonCerrarSesion();
        cy.screenshotTimestamped(4.1)
        InterrupcionesGILogin.aceptarCerrarSesion();
        cy.screenshotTimestamped(4.2)

     })
});

