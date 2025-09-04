const el = require('./elements').ELEMENTS

class GestionFM_BE {


   
  getfindFMByFilter({
    all = false,
    size = 15,
    page = 0,
    sort = 'creation_time',
    direction = 'desc',
    interruptionId = '',
    dateFrom = '',
    dateTo = '',
    projectCode = '',
    selectedCausal = '',
    buildingCode = '',
    documentNumber = ''
  }) {
    const url = Cypress.config('baseUrl')
    const baseUrl = `${url}/findFMByFilter2`;
    const queryParams = new URLSearchParams({
      all,
      size,
      page,
      sort,
      direction,
      interruptionId,
      dateFrom,
      dateTo,
      projectCode,
      selectedCausal,
      buildingCode,
      documentNumber
    });

    const fullUrl = `${baseUrl}?${queryParams.toString()}`;
    console.log('Request timestamp:', new Date().toISOString());
    console.log('Request URL:', fullUrl);
    // Ver posibilidad de escribir en un archivo de log
    return cy.request(fullUrl);
  }


    getCountFMByFilter({
        interruptionId = '',
        dateFrom = '',
        dateTo = '',
        projectCode = '',
        selectedCausal = '',
        buildingCode = '',
        documentNumber = ''
    }) {
        const url = Cypress.config('baseUrl')
        const baseUrl = `${url}/countFMByFilter2`;
        const queryParams = new URLSearchParams({
            interruptionId,
            dateFrom,
            dateTo,
            projectCode,
            selectedCausal,
            buildingCode,
            documentNumber
        });

        const fullUrl = `${baseUrl}?${queryParams.toString()}`;
        console.log('Request timestamp:', new Date().toISOString());
        console.log(fullUrl);
        // Ver posibilidad de escribir en un archivo de log
        return cy.request(fullUrl)
    }

}

export default new GestionFM_BE();