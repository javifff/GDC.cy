// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAPI', () => {
    const url = Cypress.config('baseUrl')
    const u = Cypress.env('test').username
    const p = Cypress.env('test').password

    cy.request({
        method: 'POST',
        url: `${url}/login`, // o el endpoint real de login
        form: true, // si es application/x-www-form-urlencoded
        body: `username=${u}&password=${p}`
    }).then((resp) => {
        // Cypress guarda automáticamente las cookies de la respuesta
        expect(resp.status).to.eq(200);
        cy.visit('/')
        // No es la página de Login, por lo tanto se autenticó correctamente
        cy.get('body').should('not.contain', 'Bienvenido')

    })
});

Cypress.Commands.add('loginUI', () => {

    cy.visit('/')
    cy.get('input#input-1').type(Cypress.env('test').username)
    cy.get('input#input-2').type(Cypress.env('test').password)
    cy.get('paper-button.green.x-scope.paper-button-0').click()

    cy.get('.main-title > span').should('contain', 'Gestor de Calidad')

});

Cypress.Commands.add('screenshotWithTestNameAndTimestamp', () => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');

  const testName = Cypress.currentTest.title || 'screenshot';

  cy.document().then((doc) => {
    const timestampDiv = doc.createElement('div');
    timestampDiv.innerText = `Captura tomada: ${now.toLocaleString('es-AR')}`;
    timestampDiv.style.position = 'fixed';
    timestampDiv.style.bottom = '10px';
    timestampDiv.style.right = '10px';
    timestampDiv.style.background = 'rgba(0,0,0,0.7)';
    timestampDiv.style.color = 'white';
    timestampDiv.style.padding = '5px 10px';
    timestampDiv.style.zIndex = '9999';
    timestampDiv.style.fontSize = '14px';
    doc.body.appendChild(timestampDiv);
  });

  cy.wait(500);
  cy.screenshot(`${testName}_${timestamp}`);
});


