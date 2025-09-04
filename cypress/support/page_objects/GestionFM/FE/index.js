const el = require('./elements').ELEMENTS

class GestionFM_FE {

    respuestaMockeada(numReg) {
        //Intercepta los datos del filtro y el count de registros
        cy.intercept('GET', '/findFMByFilter2?all=false&size=15&page=*',
            { fixture: `GestionFM_${numReg}reg.json` }).as('getFMData')
        cy.intercept('GET', '/countFMByFilter2?&*', `${numReg}`).as('getFMCount')
        cy.get('#gestion-fm-link').click()
        cy.wait(['@getFMData', '@getFMCount'])
    }
}

export default new GestionFM_FE();