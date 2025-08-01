describe('primer set', () => {
    it('primer', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.get('input#input-1').type(Cypress.env('username'), setTimeout(10000))
        cy.get('input#input-2').type(Cypress.env('password'))
        cy.get('paper-button.green.x-scope.paper-button-0').click()

    })

})