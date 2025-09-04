Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora todos los errores uncaught de la app
  return false;
});


describe('Pruebas navegación modulos', () => {

  beforeEach(() => {
    // Login API
    cy.loginAPI();

    //Login UI
    //cy.loginUI();
  });

  afterEach(() => {
    cy.screenshotTimestamped();
  });


  it.only('Navegación al módulo de Interrupciones', () => {
    cy.get('.menu-item.gi').click()
    cy.url().should('include', '/gestorInterrupciones')
    cy.get('#main').should('contain', 'Gestor de Interrupciones')
  })

  it('Navegación al módulo de Fuerza Mayor', () => {
    cy.get('.menu-item.fm').click()
    cy.url().should('include', '/gestionfm')
    cy.get('.mdl-layout__header-row').should('contain', 'Gestión FM')
  })

  it('Navegación al módulo de Tablas ENRE', () => {
    cy.get('.menu-item.te').click()
    cy.url().should('include', '/enre')
    cy.get('.mdl-layout__header-row').should('contain', 'Tablas Enre')
  })

  it('Navegación al módulo de Simulación', () => {
    cy.get('.menu-item.sc').click()
    cy.url().should('include', '/simulacion')
    cy.get('.mdl-layout__header-row').should('contain', 'Simulación')
  })

  it('Navegación al módulo de Bonificaciones', () => {
    cy.get('.menu-item.cb').click()
    cy.url().should('include', '/bonification')
    cy.get('.mdl-layout__header-row').should('contain', 'Bonificación')
  })

})