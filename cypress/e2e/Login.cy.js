Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora todos los errores uncaught de la app
  return false;
});


  afterEach(() => {
    cy.screenshotTimestamped();
  });

describe('Pruebas de Login', () => {

  it('Login exitoso', () => {
    cy.visit('/')
    cy.get('input#input-1').type(Cypress.env('test').username)
    cy.get('input#input-2').type(Cypress.env('test').password)
    cy.get('paper-button.green.x-scope.paper-button-0').click()

    cy.get('.main-title > span').should('contain', 'Gestor de Calidad')

  })

  it('Login usando API', () => {
    cy.loginAPI();

  });
});