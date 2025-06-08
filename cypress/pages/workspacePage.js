class workspacePage {

    elem = {
        toastMessageClose: () => cy.get('[data-testid="toaster-close-icon"]'),
        toastMessage: () => cy.get('.toaster-message')
    }

    createService(serviceName, serviceUrl) {
        cy.get('[data-testid="sidebar-item-gateway-services"]').click();
        cy.intercept('Post', '**/default/services').as('createService');

        cy.get('[data-testid="empty-state-action"]')
            .click()
            .then(() => {
                cy.get('[data-testid="gateway-service-name-input"]').type(serviceName);
                cy.get('[data-testid="gateway-service-url-input"]').type(serviceUrl);
            }).then(() => {
                cy.get('[data-testid="service-create-form-submit"]').click();
            });
        cy.wait('@createService').its('response.statusCode').should('eq', 201);
        this.elem.toastMessage()
          .should('have.text', 'Gateway Service "' +serviceName+ '" successfully created!');
        this.elem.toastMessageClose().click();
    
    }

    createRoute(routeName, routePath, serviceName) {
        cy.get('[data-testid="sidebar-item-routes"]').click();
        cy.intercept('Post', '**/default/routes').as('createroute');
        cy.get('[data-testid="empty-state-action"]')
           .click()
           .then(() => {
               cy.get('[data-testid="route-form-name"]').type(routeName);
               cy.get('[data-testid="route-form-service-id"]').click();
               cy.get('.route-form-service-dropdown-item > .select-item-label').contains(serviceName).click();
               cy.get('[data-testid="route-form-paths-input-1"]').type(routePath);
           }).then(() => {
               cy.get('[data-testid="route-create-form-submit"]').click();
           });
        cy.wait('@createroute').its('response.statusCode').should('eq', 201);
        this.elem.toastMessage()
         .should('have.text', 'Route "' +routeName+ '" successfully created!');
        this.elem.toastMessageClose().click();
    }

    deleteService(serviceName) {
        cy.get('[data-testid="sidebar-item-gateway-services"]').click();
        cy.intercept('DELETE', '**/default/services/**').as('deleteService')

        cy.get('[data-testid='+serviceName+']')
        .find('[data-testid="actions"]')
        .click()
        .find('[data-testid="action-entity-delete"]').click()
        .then(() => {
                cy.get('[data-testid="confirmation-input"]').type(serviceName);
                cy.get('[data-testid="modal-action-button"]').click();
            });
        cy.wait('@deleteService').its('response.statusCode').should('eq', 204);
        this.elem.toastMessage()
          .should('have.text', 'Gateway Service "' +serviceName+ '" successfully deleted!');
        this.elem.toastMessageClose().click();
    }

    deleteRoute(routeName) {
        cy.get('[data-testid="sidebar-item-routes"]').click();
        cy.intercept('DELETE', '**/default/routes/**').as('deleteRoute')

        cy.get('[data-testid='+routeName+']')
          .find('[data-testid="actions"]')
          .click()
          .find('[data-testid="action-entity-delete"]').click()
          .then(() => {
                  cy.get('[data-testid="confirmation-input"]').type(routeName);
                  cy.get('[data-testid="modal-action-button"]').click();
              });
        cy.wait('@deleteRoute').its('response.statusCode').should('eq', 204);
        this.elem.toastMessage()
          .should('have.text', 'Route "' +routeName+ '" successfully deleted!');
        this.elem.toastMessageClose().click();
        }

    navigateToWorkspace(spaceName) {
        cy.get('.workspace-name').should('contain', spaceName)
            .click()
        .then(() => {
            cy.url().should('include', spaceName)
        
        })

}
}

module.exports = new workspacePage();