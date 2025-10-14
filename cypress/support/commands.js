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
    cy.get('.main-title > span').should('contain', 'Gestor de Calidad')
    cy.get('#icon.style-scope.paper-icon-button.x-scope.iron-icon-0').should('be.visible') // Espera a que se carguen imagenes
  })

});

Cypress.Commands.add('loginUI', () => {

  cy.visit('/')
  cy.get('input#input-1').type(Cypress.env('test').username)
  cy.get('input#input-2').type(Cypress.env('test').password)
  cy.get('paper-button.green.x-scope.paper-button-0').click()

  cy.get('.main-title > span').should('contain', 'Gestor de Calidad')

});


Cypress.Commands.add('screenshotTimestamped', (n, scrollToTop = false) => {
  const now = new Date();

  // Formato local para el nombre del archivo (YYYY-MM-DD_HH-MM-SS)
  const localTimestamp = now.toLocaleString('sv-SE', {
    timeZone: 'America/Argentina/Buenos_Aires',
  }).replace(' ', '_')        // separa fecha y hora con guión bajo
    .replace(/:/g, '-')        // reemplaza los dos puntos de la hora por guiones
    .replace(',', '');         // elimina la coma si aparece


  const testName = Cypress.currentTest?.title || 'screenshot';
  const fileName = `${testName}_${n}_${localTimestamp}`;


  if (scrollToTop) {
    cy.window().then((win) => {
      // Scroll de la ventana principal
      win.scrollTo(0, 0);

      // También todos los elementos con scroll interno
      const allElements = win.document.querySelectorAll('*');
      allElements.forEach((el) => {
        if (el.scrollTop > 0) {
          el.scrollTop = 0;
        }
        if (el.scrollLeft > 0) {
          el.scrollLeft = 0;
        }
      });
    });
    cy.wait(300);
  }


  cy.document().then((doc) => {
    const infoDiv = doc.createElement('div');

    // Formato 24h para el timestamp visible
    const visibleTimestamp = now.toLocaleString('es-AR', {
      hour12: false,
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    infoDiv.innerHTML = `
      <div style="font-weight: bold;">${fileName}</div>
      <div>Timestamp: ${visibleTimestamp}</div>
    `;
    infoDiv.style.position = 'fixed';
    infoDiv.style.bottom = '10px';
    infoDiv.style.right = '10px';
    infoDiv.style.background = 'rgba(0,0,0,0.7)';
    infoDiv.style.color = 'white';
    infoDiv.style.padding = '8px 12px';
    infoDiv.style.zIndex = '9999';
    infoDiv.style.fontSize = '14px';
    infoDiv.style.borderRadius = '4px';
    infoDiv.style.textAlign = 'left';
    doc.body.appendChild(infoDiv);


  });

  // cy.wait(300);
  cy.screenshot(fileName);


});


Cypress.Commands.add('logWithContext', (functionName, data) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} [${functionName}] -`, data);
});


Cypress.Commands.add('eliminaArchivo', (nombreArchivo) => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const rutaCompleta = `${downloadsFolder}/${nombreArchivo}`;

  cy.task('deleteFile', rutaCompleta).then((resultado) => {
    cy.log(`Archivo: ${resultado.file} - Estado: ${resultado.status}`);
  });
});