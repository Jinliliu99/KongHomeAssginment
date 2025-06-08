/// <reference types="cypress">
import workspacePage from '../pages/workspacePage'

describe("Service and Route Creation and Deletion",()=>{

    beforeEach(() => {
        cy.visit('/');
        cy.url().should("include","/workspaces");
        cy.get('.workspace-overview-title').should('contain', 'Workspaces');
        cy.viewport(1280, 720)
    })


    it("Verify that Service and Route can be created and deleted",()=>{
        let serviceName = "example_service"
        let serviceUrl = "https://httpbin.konghq.com"
        let routeName = "mocking"
        let routePath = "/mock"
        
        workspacePage.navigateToWorkspace('default');
        workspacePage.createService(serviceName, serviceUrl);
        workspacePage.createRoute(routeName, routePath, serviceName);
        workspacePage.deleteRoute(routeName);
        workspacePage.deleteService(serviceName);
    })
})

